import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
  hasSupabasePublicEnv
} from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

export function hasSupabaseServerAuthEnv() {
  return hasSupabasePublicEnv();
}

export async function createServerSupabaseAuthClient(): Promise<SupabaseClient<Database> | null> {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabasePublishableKey();

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components can read auth cookies but cannot always write refreshed cookies.
        }
      }
    }
  });
}
