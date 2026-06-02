# Dora Food Map

Dora is a Singapore-focused social food map MVP. The core idea is: show me food near where I am going, but only from people whose taste I trust.

## What It Does

- Shows a MapLibre map centered on Singapore.
- Lets users select and deselect trusted food lists.
- Displays only places from the currently selected lists.
- Clusters nearby map pins and splits them as the map zooms in.
- Opens a mobile-friendly place bottom sheet when a pin is selected.
- Supports mock add-place flow with local state.
- Searches OneMap from a server route with local Singapore fallbacks.
- Provides a rule-based recommendation chat for prompts like "dessert near Orchard MRT".

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MapLibre GL JS
- OneMap Singapore search API route
- Supabase-ready schema, currently using local mock data

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

Main app page:

```text
http://localhost:3000/app/map
```

List detail pages:

```text
http://localhost:3000/app/lists/list_annj
```

Open the map with one list selected:

```text
http://localhost:3000/app/map?lists=list_annj
```

On Windows PowerShell, if `npm` is blocked by script policy, use:

```powershell
npm.cmd run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` when you are ready to add real integrations.

```text
ONEMAP_EMAIL=
ONEMAP_PASSWORD=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

The MVP does not require these values to run. OneMap search currently uses the public search endpoint and falls back to local known Singapore locations if the live call fails.

## Important Files

- `src/app/app/map/page.tsx` - main map route
- `src/components/FoodMapApp.tsx` - main app state and map page composition
- `src/components/MapView.tsx` - MapLibre map, clustering, pin selection
- `src/components/ListDrawer.tsx` - compact mobile list selector drawer
- `src/components/SelectedListChips.tsx` - small selected-list chips on the map
- `src/components/ChatRecommendationPanel.tsx` - recommendation chat UI
- `src/utils/recommendations.ts` - rule-based parsing and scoring
- `src/data/mockData.ts` - mock lists and Singapore food places
- `src/app/app/lists/[id]/page.tsx` - list detail route
- `src/app/api/onemap/search/route.ts` - server-side OneMap search route
- `src/app/api/recommend/route.ts` - recommendation API route
- `supabase/schema.sql` - planned database structure

## Current MVP Limitations

- Authentication is mocked.
- Places saved through the add modal only live in browser state until refresh.
- Recommendation logic is deterministic keyword matching, not an LLM yet.
- Map tiles use OpenStreetMap raster tiles for a simple no-key MVP.
- OneMap credential/token caching is documented but not required for the current search endpoint.
- No real TikTok or Instagram scraping is implemented.

## Next Steps

- Connect Supabase auth.
- Persist list saves, comments, and sources.
- Add friend invitations and list privacy.
- Replace the rule-based recommender with an LLM-assisted parser while keeping the current scoring function.
- Add PWA service worker and production icons.
- Deploy to Vercel.
