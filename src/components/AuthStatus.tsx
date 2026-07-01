"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createBrowserSupabaseAuthClient } from "@/lib/supabase/authBrowser";

export function AuthStatus() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isProfileReady, setIsProfileReady] = useState(false);
  const supabase = useMemo(() => createBrowserSupabaseAuthClient(), []);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return;
      setIsSignedIn(Boolean(data.user));
      setIsLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(Boolean(session?.user));
      setIsLoading(false);
      router.refresh();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  useEffect(() => {
    if (!isSignedIn) {
      setIsProfileReady(false);
      return;
    }

    let isMounted = true;

    fetch("/api/auth/profile/ensure", { method: "POST" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { profileReady?: boolean } | null) => {
        if (!isMounted) return;
        setIsProfileReady(Boolean(data?.profileReady));
      })
      .catch(() => {
        if (!isMounted) return;
        setIsProfileReady(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isSignedIn]);

  async function handleSignOut() {
    if (!supabase) return;

    setIsSigningOut(true);
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setIsSignedIn(false);
      router.refresh();
    }
    setIsSigningOut(false);
  }

  if (isLoading) {
    return (
      <div className="rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-600 shadow-sm">
        Checking auth
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-600 shadow-sm">
        <span>{isProfileReady ? "Profile ready" : "Signed in"}</span>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="rounded-full bg-stone-100 px-2 py-1 text-ink disabled:opacity-60"
        >
          {isSigningOut ? "Signing out" : "Sign out"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-600 shadow-sm">
      <span>Mock auth</span>
      <Link href="/login" className="rounded-full bg-ink px-2 py-1 text-white">
        Sign in
      </Link>
    </div>
  );
}
