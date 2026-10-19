# Minnie's sites

One Next.js app serving two websites, chosen by domain (`src/proxy.ts`):

- **thoroughlymodernminnie.co.uk** – wedding celebrant → `src/app/wedding`
- **schoolresilienceworkshop.com** – RCC Workshops → `src/app/rcc`

Words and pictures live in `src/lib/content/{wedding,rcc}.ts` as defaults; Minnie's edits are saved per key in
Supabase (`content` table) and override them. Pages are prerendered; saving an edit clears that site's cache tag.

## Local preview

```
npm install
npm run dev
```

Open http://wedding.localhost:3000 and http://rcc.localhost:3000 (`*.localhost` resolves to your machine).

## Environment

`.env.local` (not committed):

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY` – optional; without it form submissions are saved but not emailed
- `SITE_HOSTS` – optional extra hostnames for staging, e.g. `wedding=wedding-minnie.netlify.app,rcc=rcc-minnie.netlify.app`

Database changes are in `supabase/migrations` (`npx supabase db push --linked`).
