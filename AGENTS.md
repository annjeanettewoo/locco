# AGENTS.md

## Project

Dora Food Map is a Singapore social food map MVP. Build around the product promise: food near where the user is going, filtered by people whose taste they trust.

## Working Rules

- Keep the app runnable without Supabase credentials.
- Use mock data first, then add Supabase persistence behind clear boundaries.
- Do not use paid Google Maps APIs.
- Do not scrape Google Maps, TikTok, or Instagram.
- Keep OneMap calls server-side.
- Prefer small typed utilities over giant components.
- Use Tailwind and the existing light, friendly design direction.
- Keep mobile map interactions comfortable: bottom sheets, chips, and compact panels.

## Useful Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

On Windows PowerShell, `npm.cmd` may be needed instead of `npm`.

## Key Files

- `src/components/FoodMapApp.tsx` coordinates state for selected lists, visible places, recommendations, and local adds.
- `src/components/MapView.tsx` owns MapLibre setup and clustering.
- `src/utils/recommendations.ts` owns rule-based parsing and scoring.
- `src/data/mockData.ts` owns local mock lists and places.
- `supabase/schema.sql` documents the planned database.

## Future Integration Notes

- Supabase insert TODOs are intentionally left near local-only save paths.
- Keep recommendation output shape stable so a future LLM parser can replace only query interpretation.
- Add RLS before exposing real user data.
