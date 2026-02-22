# .fylle Protocol — Official Website

The marketing site + agent builder for the [.fylle protocol](https://github.com/DavideScanta/fylle-format).

**Live pages:**
- `/` — Landing page (protocol overview, positioning, use cases)
- `/builder` — Interactive agent builder (create .fylle packages visually)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → opens http://localhost:5173

# 3. Build for production
npm run build
# → output in dist/
```

## Deploy to Vercel (Recommended)

### Option A: Vercel CLI (fastest)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy (first time — follow the prompts)
vercel

# Deploy to production
vercel --prod
```

Vercel auto-detects Vite. The `vercel.json` handles SPA routing.

### Option B: GitHub Integration (auto-deploy on push)

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USER/fylle-protocol-site.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)

3. Import the repo

4. Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Click Deploy → done. Every push to `main` auto-deploys.

### Option C: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build & deploy
npm run build
netlify deploy --dir=dist --prod
```

Add a `_redirects` file in `public/`:
```
/*    /index.html   200
```

### Option D: GitHub Pages

```bash
npm run build

# Install gh-pages
npm i -D gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run deploy
```

Note: set `base` in `vite.config.js` to your repo name:
```js
export default defineConfig({
  base: '/fylle-protocol-site/',
  plugins: [react()],
})
```

## Custom Domain

After deploying to Vercel:

1. Go to project Settings → Domains
2. Add your domain (e.g., `protocol.fylle.ai`)
3. Update DNS:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`
4. SSL is automatic

## Project Structure

```
fylle-protocol-site/
├── CLAUDE.md                    # Claude Code project instructions
├── README.md                    # This file
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite config
├── vercel.json                  # SPA routing for Vercel
├── .gitignore
├── index.html                   # Vite entrypoint
├── public/
│   └── favicon.svg              # .f favicon
└── src/
    ├── main.jsx                 # React mount + BrowserRouter
    ├── App.jsx                  # Route definitions
    ├── global.css               # Design system + landing styles
    ├── pages/
    │   ├── Landing.jsx          # / — marketing page
    │   └── Builder.jsx          # /builder — agent builder
    └── components/
        └── BuilderSteps.jsx     # Multi-step form logic
```

## Tech Stack

- **Vite** — build tool
- **React 18** — UI
- **React Router v6** — client-side routing
- **No CSS framework** — custom design system (dark theme, `#c8ff00` accent)
- **Google Fonts** — JetBrains Mono + Instrument Sans

## Links

- [.fylle Format Spec](https://github.com/DavideScanta/fylle-format)
- [Fylle Platform](https://fylle.ai)
- [Twitter](https://x.com/fylle_ai)

---

Built by [Fylle](https://fylle.ai) — AI-powered marketing automation.
