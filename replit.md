# ZAIAH | Regeneración Urbana Estructurada

Sitio web institucional para ZAIAH / ZH, empresa privada de regeneración urbana que identifica, adquiere y regenera activos inmobiliarios estratégicos en ciudades emergentes.

## Run & Operate

- `pnpm --filter @workspace/zaiah run dev` — run the ZAIAH website (assigned port via $PORT)
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Required env: `PORT`, `BASE_PATH` — provided automatically by Replit workflow config

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, wouter (routing)
- UI: shadcn/ui components, framer-motion (animations), lucide-react
- Forms: react-hook-form + zod validation
- API: Express 5 (shared api-server, not used by ZAIAH frontend)
- DB: PostgreSQL + Drizzle ORM (not used by ZAIAH frontend — no backend needed)

## Where things live

- `artifacts/zaiah/` — ZAIAH institutional website (preview path: `/`)
  - `src/pages/` — Home, QuienesSomos, Portafolio, Contacto, not-found
  - `src/components/` — Header, Footer, WhatsAppButton + shadcn UI components
  - `src/index.css` — ZAIAH brand theme (Manrope font, color palette)
  - `index.html` — SEO meta tags in Spanish
- `artifacts/api-server/` — shared Express API server (preview path: `/api`)
- `lib/api-spec/openapi.yaml` — OpenAPI spec source of truth
- `lib/db/src/schema/` — Drizzle DB schema (currently empty)

## Architecture decisions

- **Presentation-first, no backend**: ZAIAH site is fully frontend — no API calls, no DB. Forms use client-side validation only with a success toast.
- **Color palette via CSS custom properties**: All ZAIAH brand colors (#00246B, #CAAA57, #EFEEED, #D5D3CE) applied through CSS vars in HSL format and also as direct Tailwind inline styles where full control is needed.
- **Scroll-triggered animations**: Custom `useInView` hook with IntersectionObserver for lightweight, dependency-free entrance animations — no framer-motion dependency required for basic reveals.
- **Sticky header with transparency**: Header starts transparent (white text) over dark hero, switches to white/blur background on scroll.
- **Images from Unsplash CDN**: Architectural/urban photos pulled from Unsplash with grayscale filter that clears on hover for a polished effect.

## Product

- **Inicio**: Full-viewport hero with city backdrop, manifesto typography section, 3-card model (ZH-01/02/03), vision section (1,000 activos), brand units (ZAIAH Flipping / ZAIAH Propiedades), CTA.
- **Quiénes Somos**: Institutional text, differentiator editorial section, founders with photo cards, team grid, 4 brand pillars.
- **Portafolio**: Hero with editorial layout, 3 alternating project cards (Edison 58, Zona ZH Salud, Próxima Zona ZH), context quote section.
- **Contacto**: Split layout — contact info + WhatsApp CTA on left, validated form (react-hook-form + zod) on right.
- Floating WhatsApp button on all pages.

## User preferences

- Language: Spanish throughout the UI
- Brand palette: ZAIAH Blue #00246B, Metallic Gold #CAAA57, Stone White #EFEEED, Concrete Gray #D5D3CE, Deep Black #000000
- Typography: Manrope (300–800 weight) — loaded from Google Fonts
- Tone: institutional, boutique, silently dominant — no emojis, no generic patterns

## Gotchas

- Google Fonts `@import url(...)` MUST be the first line of `index.css` — PostCSS fails silently otherwise.
- CSS custom properties use space-separated HSL values, not `hsl()` wrapper: `--primary: 220 100% 21%`.
- The ZAIAH site uses inline hex colors in many places (e.g. `style={{ backgroundColor: "#00246B" }}`) for sections where Tailwind's CSS variable resolution is unreliable.
- No backend integration — contact form only runs client-side validation and shows a toast on submit.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See the `react-vite` skill for frontend conventions and design subagent delegation
