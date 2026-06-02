import { NextRequest, NextResponse } from "next/server";
import { recommendPlaces } from "@/utils/recommendations";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    query?: string;
    selectedListIds?: string[];
  };

  if (!body.query?.trim()) {
    return NextResponse.json({ error: "Missing query." }, { status: 400 });
  }

  const selectedListIds = body.selectedListIds?.length ? body.selectedListIds : ["list_my"];
  const result = await recommendPlaces(body.query, selectedListIds);

  return NextResponse.json(result);
}
