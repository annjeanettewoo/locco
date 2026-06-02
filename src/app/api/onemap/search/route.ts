import { NextRequest, NextResponse } from "next/server";
import { searchKnownLocations, searchOneMap } from "@/utils/location";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim();
  if (!query) {
    return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
  }

  try {
    const known = searchKnownLocations(query);
    const liveResults = await searchOneMap(query);
    const merged = [...known, ...liveResults].slice(0, 8);
    return NextResponse.json({ results: merged });
  } catch (error) {
    const fallback = searchKnownLocations(query);
    if (fallback.length > 0) {
      return NextResponse.json({
        results: fallback,
        warning: "Using local fallback results because OneMap was unavailable."
      });
    }

    return NextResponse.json(
      {
        error: "Unable to search OneMap right now.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 502 }
    );
  }
}

// If OneMap requires authenticated calls in the future, generate and cache the token here
// using ONEMAP_EMAIL and ONEMAP_PASSWORD. Never send those values to the frontend.
