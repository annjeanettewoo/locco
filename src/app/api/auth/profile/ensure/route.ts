import { NextResponse } from "next/server";
import { getOrCreateCurrentProfile } from "@/lib/auth/profile";

export const dynamic = "force-dynamic";

export async function POST() {
  const result = await getOrCreateCurrentProfile();

  return NextResponse.json({
    authConfigured: result.authConfigured,
    hasSession: result.hasSession,
    hasProfile: Boolean(result.profile),
    profileCreated: result.created,
    profileReady: result.reason === "profile_ready"
  });
}
