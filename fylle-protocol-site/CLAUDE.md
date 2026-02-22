# .fylle Protocol — Website

## Project Overview
This is the official website for the **.fylle** open protocol — the portable format for AI agents.
Two pages: a marketing landing page (`/`) and an interactive agent builder dashboard (`/builder`).

## Tech Stack
- **Framework**: Vite + React 18
- **Routing**: React Router v6
- **Styling**: CSS-in-JS (inline styles) + global CSS for landing page
- **Fonts**: JetBrains Mono + Instrument Sans (Google Fonts)
- **Deploy target**: Vercel (static SPA)
- **No backend** — purely client-side

## Project Structure
```
fylle-protocol-site/
├── CLAUDE.md                    # ← You are here
├── package.json
├── vite.config.js
├── vercel.json                  # SPA rewrite rules
├── index.html                   # Vite entrypoint
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx                 # App mount + router
│   ├── App.jsx                  # Route definitions
│   ├── global.css               # Reset + shared vars + landing styles
│   ├── pages/
│   │   ├── Landing.jsx          # Marketing landing page (/)
│   │   └── Builder.jsx          # Agent builder dashboard (/builder)
│   └── components/
│       └── BuilderSteps.jsx     # Step components for the builder form
```

## Design System
- **Background**: `#0a0a0b` (near black)
- **Cards**: `#16161a`
- **Elevated**: `#111113`
- **Border**: `#222228`
- **Text**: `#e8e8ed`
- **Text muted**: `#8888a0`
- **Text dim**: `#55556a`
- **Accent**: `#c8ff00` (lime green)
- **Purple**: `#a78bfa`
- **Blue**: `#60a5fa`
- **Cyan**: `#22d3ee`
- **Mono font**: JetBrains Mono
- **Sans font**: Instrument Sans

## Key Links
- GitHub repo: https://github.com/DavideScanta/fylle-format
- Fylle platform: https://fylle.ai
- Twitter: https://x.com/fylle_ai

## Pages

### `/` — Landing Page
Marketing page for the .fylle protocol. Sections:
1. Hero — ".fylle" as the big headline
2. Terminal preview — shows `fylle pack`, `fylle push`, `fylle pull`
3. Format — file structure + principles grid
4. Stack position — layer diagram + comparison table
5. Who benefits — adopters grid (indie devs, companies, frameworks, marketplaces)
6. Why Fylle — protocol vs platform
7. CTA — GitHub + platform links

### `/builder` — Agent Builder Dashboard
Interactive form to create .fylle agent packages. 8 steps:
1. Identity — name, version, description, role, author, category, tags
2. Model — model selection, capabilities, temperature, max tokens
3. Prompt — system prompt editor (agent.md)
4. I/O — inputs/outputs declaration
5. Tools — required/optional tools with MCP protocol
6. Guardrails — autonomy level, limits, rules
7. Memory — toggle, persistence, schema fields
8. Export — YAML preview, copy, download manifest.yaml + agent.md

## Commands
```bash
npm install          # Install dependencies
npm run dev          # Dev server on localhost:5173
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
```

## Deployment (Vercel)
```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel              # First deploy (follow prompts)
vercel --prod       # Production deploy

# Option 2: GitHub integration
# 1. Push to GitHub
# 2. Import project on vercel.com
# 3. Framework preset: Vite
# 4. Auto-deploys on push
```

## Notes
- The landing page uses dangerouslySetInnerHTML for the full HTML — this is intentional to preserve the exact design.
- The builder is pure React with inline styles matching the design system.
- vercel.json has a rewrite rule for SPA client-side routing.
- All external links open in new tabs.
