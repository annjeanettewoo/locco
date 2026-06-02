"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMapPage = pathname === "/app/map";

  return (
    <div className="min-h-dvh bg-cream">
      <header
        className={`sticky top-0 z-50 border-b border-stone-200 bg-cream/90 px-4 backdrop-blur ${
          isMapPage ? "py-2" : "py-3"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/app/map" className={`${isMapPage ? "text-base" : "text-lg"} font-black text-ink`}>
            Locco
          </Link>
          <div className="rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-600 shadow-sm">
            Mock auth
          </div>
        </div>
      </header>
      {children}
      {isMapPage ? null : <BottomNav />}
    </div>
  );
}
