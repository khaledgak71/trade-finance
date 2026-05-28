# Deployment Steps (Hostinger VPS + Nginx)

These are the exact steps followed to deploy the trade finance platform to a live server.

---

## Part 1 — Provision the Server

1. Go to **hostinger.com** → **VPS Hosting**
2. Choose the **KVM 2** plan (2 GB RAM minimum for Next.js builds)
3. Select **Ubuntu 24.04** as the OS (24.04 works fine with Docker)
4. Complete purchase
5. Go to **hPanel → VPS → Manage** and note the **public IP address**

---

## Part 2 — Set Up SSH Access

Hostinger disables password auth by default, so add your SSH public key via hPanel.

### Generate an SSH key locally (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your@email.com" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
```

### Add the key to Hostinger
1. Go to **hPanel → VPS → Manage → SSH Keys**
2. Click **Add SSH Key**
3. Paste the output of `cat ~/.ssh/id_ed25519.pub`
4. Save

### Add GitHub to known_hosts and test connection
```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
ssh -i ~/.ssh/id_ed25519 -o StrictHostKeyChecking=no root@YOUR_SERVER_IP "echo connected"
```

---

## Part 3 — Install Docker on the Server

```bash
ssh root@YOUR_SERVER_IP "curl -fsSL https://get.docker.com | sh"
```

Docker was already pre-installed on the Hostinger image; this script updates it to the latest version.

---

## Part 4 — Clone the Repo and Create the Env File

```bash
ssh root@YOUR_SERVER_IP "git clone https://github.com/khaledgak71/trade-finance.git /app/trade-finance"
```

Create the `.env` file on the server:
```bash
ssh root@YOUR_SERVER_IP "cat > /app/trade-finance/.env << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
EOF"
```

> If you don't have Supabase credentials yet, leave the placeholder values. The app has a mock client that activates automatically — the app will run but auth features won't work until real credentials are added.

---

## Part 5 — Build and Start the Container

```bash
ssh root@YOUR_SERVER_IP "
cd /app/trade-finance && \
export \$(grep -v '^#' .env | xargs) && \
docker compose up --build -d
"
```

Verify the container is running:
```bash
ssh root@YOUR_SERVER_IP "docker ps && curl -s -o /dev/null -w '%{http_code}' http://localhost:3001"
```

Should return `200`.

> Note: `docker-compose.yml` maps host port `3001` → container port `3000`.

---

## Part 6 — Install Nginx and Configure Reverse Proxy

```bash
ssh root@YOUR_SERVER_IP "apt-get install -y nginx certbot python3-certbot-nginx"
```

Create the Nginx site config:
```bash
ssh root@YOUR_SERVER_IP "cat > /etc/nginx/sites-available/trade-finance << 'EOF'
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF"
```

Enable the site and reload Nginx:
```bash
ssh root@YOUR_SERVER_IP "
ln -sf /etc/nginx/sites-available/trade-finance /etc/nginx/sites-enabled/trade-finance && \
rm -f /etc/nginx/sites-enabled/default && \
nginx -t && systemctl reload nginx
"
```

App is now accessible at `http://YOUR_SERVER_IP`.

---

## Part 7 — Add a Domain (GoDaddy or any registrar)

1. Log in to your domain registrar
2. Go to **DNS Management** for your domain
3. Edit the `@` A record → set value to your server IP
4. Add a `www` A record → same server IP
5. Wait for DNS to propagate (5 min – 24h)

Check propagation:
```bash
nslookup yourdomain.com
```

Update the Nginx config to use your domain:
```bash
ssh root@YOUR_SERVER_IP "sed -i 's/YOUR_DOMAIN_OR_IP/yourdomain.com www.yourdomain.com/' /etc/nginx/sites-available/trade-finance && systemctl reload nginx"
```

---

## Part 8 — Add HTTPS via Let's Encrypt

```bash
ssh root@YOUR_SERVER_IP "certbot --nginx -d yourdomain.com -d www.yourdomain.com"
```

Certbot will verify domain ownership, install the certificate, and auto-configure Nginx to redirect HTTP → HTTPS. Certificates auto-renew every 90 days.

App is now live at `https://yourdomain.com`.

---

## Part 9 — Connect Supabase (when ready)

1. Go to **supabase.com → your project → Settings → API** and copy the URL, anon key, and service role key
2. Update the env file on the server:
```bash
ssh root@YOUR_SERVER_IP "nano /app/trade-finance/.env"
```
3. Rebuild the container (required because `NEXT_PUBLIC_*` vars are baked in at build time):
```bash
ssh root@YOUR_SERVER_IP "cd /app/trade-finance && export \$(grep -v '^#' .env | xargs) && docker compose up --build -d"
```
4. Go to **Supabase → Authentication → URL Configuration**:
   - Set **Site URL** to `https://yourdomain.com`
   - Add `https://yourdomain.com/**` to **Redirect URLs**

---

## Summary

| Step | Tool |
|---|---|
| Server | Hostinger KVM VPS (Ubuntu 24.04) |
| SSH access | ed25519 key added via hPanel |
| Docker | Pre-installed, updated via get.docker.com |
| App source | Cloned from GitHub |
| Container | `docker compose up --build -d` |
| Reverse proxy | Nginx → port 3001 |
| SSL | Let's Encrypt via Certbot (free, auto-renews) |
| Domain DNS | A record pointing to server IP |
| Auth | Supabase (add credentials when ready) |
