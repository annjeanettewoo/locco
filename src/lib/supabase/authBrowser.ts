"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
  hasSupabasePublicEnv
} from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

export function hasSupabaseBrowserAuthEnv() {
  return hasSupabasePublicEnv();
}

export function createBrowserSupabaseAuthClient(): SupabaseClient<Database> | null {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabasePublishableKey();

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
