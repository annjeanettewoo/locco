import { createServerSupabaseAuthClient } from "@/lib/supabase/authServer";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

export type CurrentProfile = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "id" | "display_name" | "avatar_initials"
>;

export type CurrentProfileResult = {
  authConfigured: boolean;
  hasSession: boolean;
  profile: CurrentProfile | null;
  created: boolean;
  reason:
    | "profile_ready"
    | "missing_env"
    | "no_session"
    | "auth_error"
    | "profile_read_failed"
    | "profile_create_failed";
};

function noProfileResult(
  reason: Exclude<CurrentProfileResult["reason"], "profile_ready">,
  authConfigured: boolean,
  hasSession: boolean
): CurrentProfileResult {
  return {
    authConfigured,
    hasSession,
    profile: null,
    created: false,
    reason
  };
}

function usernameForUserId(userId: string) {
  return `user_${userId.replaceAll("-", "").slice(0, 24)}`;
}

export async function getOrCreateCurrentProfile(): Promise<CurrentProfileResult> {
  if (!hasSupabasePublicEnv()) {
    return noProfileResult("missing_env", false, false);
  }

  const supabase = await createServerSupabaseAuthClient();
  if (!supabase) {
    return noProfileResult("missing_env", false, false);
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return noProfileResult("auth_error", true, false);
  }

  const user = userData.user;
  if (!user) {
    return noProfileResult("no_session", true, false);
  }

  const { data: existingProfile, error: readError } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_initials")
    .eq("id", user.id)
    .maybeSingle();

  if (readError) {
    return noProfileResult("profile_read_failed", true, true);
  }

  if (existingProfile) {
    return {
      authConfigured: true,
      hasSession: true,
      profile: existingProfile,
      created: false,
      reason: "profile_ready"
    };
  }

  const profileInsert: Database["public"]["Tables"]["profiles"]["Insert"] = {
    id: user.id,
    username: usernameForUserId(user.id),
    display_name: "Locco user",
    avatar_initials: "LU",
    is_demo: false
  };

  const { data: createdProfile, error: createError } = await supabase
    .from("profiles")
    .insert(profileInsert as never)
    .select("id, display_name, avatar_initials")
    .single<CurrentProfile>();

  if (createError) {
    return noProfileResult("profile_create_failed", true, true);
  }

  return {
    authConfigured: true,
    hasSession: true,
    profile: createdProfile,
    created: true,
    reason: "profile_ready"
  };
}

export async function getCurrentProfile() {
  return (await getOrCreateCurrentProfile()).profile;
}
