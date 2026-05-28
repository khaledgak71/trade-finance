# Docker Containerization Plan

## Steps

### 1. Update `next.config.mjs`
Add `output: 'standalone'` to the Next.js config. This produces a self-contained build in `.next/standalone` with only the files needed to run the app, keeping the final image small.

### 2. Create `.dockerignore`
Exclude unnecessary files from the build context:
- `node_modules/`
- `.next/`
- `.env.local`
- `.git/`

This keeps the build fast and prevents secrets from leaking into the image.

### 3. Create `Dockerfile`
Multi-stage build with three stages:

**Stage 1 — deps**
Install only production `node_modules` using `npm ci --omit=dev`.

**Stage 2 — builder**
Install all dependencies, then run `next build`.
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are declared as `ARG` and set as `ENV` here because Next.js bakes `NEXT_PUBLIC_*` variables into the bundle at build time.

**Stage 3 — runner**
- Base image: `node:20-alpine`
- Copy only the `standalone` output and `public/` folder from the builder
- Set `NODE_ENV=production`
- Expose port `3000`
- Run: `node server.js`

`SUPABASE_SERVICE_ROLE_KEY` is NOT in the image — it is injected at runtime only.

### 4. Create `docker-compose.yml`
- Builds the image using the Dockerfile
- Passes `NEXT_PUBLIC_*` vars as build args (reads from `.env.local` or shell env)
- Passes `SUPABASE_SERVICE_ROLE_KEY` as a runtime environment variable
- Maps port `3000:3000`

---

## How to Run

### Build and start
```bash
docker compose up --build
```

### Pass secrets (choose one approach)

**Option A — using `.env.local` values directly:**
```bash
export NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
export NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
docker compose up --build
```

**Option B — create a `.env` file for compose:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
Then just run:
```bash
docker compose up --build
```

### Access the app
Open [http://localhost:3000](http://localhost:3000)

### Stop
```bash
docker compose down
```

---

## Notes
- `NEXT_PUBLIC_*` vars are baked into the bundle at build time — if they change, you must rebuild the image.
- `SUPABASE_SERVICE_ROLE_KEY` is only injected at runtime and never written into the image layers.
- The `.env.local` file should never be copied into the image (covered by `.dockerignore`).
