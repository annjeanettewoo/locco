import { cache } from "react";
import type { User } from "@supabase/supabase-js";
import {
  DEMO_LIST_ID,
  DEMO_USER_DISPLAY_NAME,
  DEMO_USER_ID
} from "@/lib/demoIdentity";
import { createServerSupabaseAuthClient } from "@/lib/supabase/authServer";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

type ProfileRow = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "id" | "display_name" | "avatar_initials"
>;

export type DemoIdentity = {
  userId: string;
  displayName: string;
  listId: string;
};

export type CurrentIdentityReason =
  | "authenticated"
  | "missing_env"
  | "no_session"
  | "auth_error"
  | "profile_missing"
  | "profile_read_failed";

export type CurrentIdentity = {
  authConfigured: boolean;
  isSignedIn: boolean;
  user: User | null;
  profile: ProfileRow | null;
  demo: DemoIdentity;
  source: "authenticated" | "demo";
  reason: CurrentIdentityReason;
};

export const demoIdentity: DemoIdentity = {
  userId: DEMO_USER_ID,
  displayName: DEMO_USER_DISPLAY_NAME,
  listId: DEMO_LIST_ID
};

export function isSupabaseAuthConfigured() {
  return hasSupabasePublicEnv();
}

function demoFallback(authConfigured: boolean, reason: CurrentIdentityReason): CurrentIdentity {
  return {
    authConfigured,
    isSignedIn: false,
    user: null,
    profile: null,
    demo: demoIdentity,
    source: "demo",
    reason
  };
}

export const getCurrentIdentity = cache(async function getCurrentIdentity(): Promise<CurrentIdentity> {
  if (!isSupabaseAuthConfigured()) {
    return demoFallback(false, "missing_env");
  }

  const supabase = await createServerSupabaseAuthClient();
  if (!supabase) {
    return demoFallback(false, "missing_env");
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return demoFallback(true, "auth_error");
  }

  const user = userData.user;
  if (!user) {
    return demoFallback(true, "no_session");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_initials")
    .eq("id", user.id)
    .maybeSingle();

  return {
    authConfigured: true,
    isSignedIn: true,
    user,
    profile: profile ?? null,
    demo: demoIdentity,
    source: "authenticated",
    reason: profileError ? "profile_read_failed" : profile ? "authenticated" : "profile_missing"
  };
});

export async function getCurrentAuthUser() {
  return (await getCurrentIdentity()).user;
}

export async function getCurrentProfile() {
  return (await getCurrentIdentity()).profile;
}
