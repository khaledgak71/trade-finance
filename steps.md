# Making the App Publicly Accessible with GoDaddy

After containerizing the app, you need two things: a server to run the container and a domain pointing to it. GoDaddy covers both.

---

## Part 1 — Get a Domain on GoDaddy

1. Go to godaddy.com and search for your domain name
2. Purchase it (`.com` recommended)
3. After purchase, go to **My Products** → find your domain → click **DNS**
   - You will add records here in a later step once you have a server IP

---

## Part 2 — Get a Server

### Option A: GoDaddy VPS (keep everything in one place)

1. Go to godaddy.com → **Hosting** → **VPS Hosting**
2. Choose a Linux VPS — minimum **2 GB RAM** plan for Next.js builds
3. Select **Ubuntu 22.04** as the OS
4. Complete purchase and note your server's **public IP address**
5. SSH into the server:
```bash
ssh root@YOUR_SERVER_IP
```

### Option B: Any other VPS (DigitalOcean, Hetzner, etc.) with GoDaddy domain only
Same steps below apply — just use GoDaddy only for DNS in Part 3.

---

## Part 3 — Point Your GoDaddy Domain to the Server

1. Go to godaddy.com → **My Products** → your domain → **DNS**
2. Find the existing `A` record for `@` (root domain) → click the pencil icon to edit
3. Set **Value** to your server's public IP address → Save
4. Add another `A` record:
   - **Name:** `www`
   - **Value:** same server public IP
   - **TTL:** 600 (10 minutes)
5. Wait for DNS to propagate — usually 5–30 minutes, up to 24h

To check propagation:
```bash
nslookup yourdomain.com
```

---

## Part 4 — Set Up Docker on the Server

SSH into your server and run:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

---

## Part 5 — Deploy the App

### Copy the project to the server
```bash
# From your local machine
scp -r /home/khaledgak/Projects/trade-finance-platform root@YOUR_SERVER_IP:/app
```
Or clone from Git if the repo is on GitHub:
```bash
git clone your-repo-url /app/trade-finance-platform
```

### Create the `.env` file on the server
```bash
nano /app/trade-finance-platform/.env
```
Add:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Build and start the container
```bash
cd /app/trade-finance-platform
docker compose up --build -d
```

Verify it's running on port 3000:
```bash
curl http://localhost:3000
```

---

## Part 6 — Install Nginx as a Reverse Proxy

```bash
sudo apt update && sudo apt install nginx -y
```

Create the site config:
```bash
sudo nano /etc/nginx/sites-available/trade-finance
```

Paste:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it:
```bash
sudo ln -s /etc/nginx/sites-available/trade-finance /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Part 7 — Add HTTPS (Free SSL via Let's Encrypt)

GoDaddy sells SSL certificates but Let's Encrypt is free and automatic.

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts — Certbot will:
- Verify domain ownership via HTTP
- Install the certificate
- Update the Nginx config to redirect HTTP → HTTPS
- Auto-renew every 90 days

Your site is now live at `https://yourdomain.com`.

---

## Part 8 — Update Supabase for Production

1. Go to your Supabase project → **Authentication** → **URL Configuration**
2. Set **Site URL** to `https://yourdomain.com`
3. Add `https://yourdomain.com/**` to **Redirect URLs**

Without this, login redirects will break in production.

---

## Summary

| Step | Where |
|---|---|
| Buy domain | GoDaddy |
| Set DNS A record | GoDaddy DNS dashboard |
| Run container | Your server (GoDaddy VPS or other) |
| Reverse proxy | Nginx on the server |
| SSL certificate | Let's Encrypt (free, auto-renews) |
| Auth config | Supabase dashboard |
