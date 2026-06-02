"use client";

import { useState } from "react";
import type { OneMapResult } from "@/types";

type Props = {
  onSelect: (location: OneMapResult) => void;
};

export function SearchLocationBox({ onSelect }: Props) {
  const [query, setQuery] = useState("Orchard MRT");
  const [results, setResults] = useState<OneMapResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/onemap/search?query=${encodeURIComponent(query)}`);
      const payload = (await response.json()) as { results?: OneMapResult[]; error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Search failed.");
      setResults(payload.results ?? []);
      setConfirmed(null);
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "Search failed.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-full bg-white/95 p-1.5 shadow-soft ring-1 ring-stone-200 backdrop-blur">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Orchard MRT, Bugis, postal code..."
          className="min-w-0 flex-1 rounded-full border border-transparent bg-transparent px-3 py-2 text-sm font-semibold outline-none focus:border-tomato"
        />
        <button
          type="submit"
          className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Find"}
        </button>
      </form>
      {error ? <p className="px-3 pb-2 text-xs font-semibold text-red-600">{error}</p> : null}
      {confirmed ? <p className="px-3 pb-2 text-xs font-bold text-tomato">Reference set to {confirmed}</p> : null}
      {results.length ? (
        <div className="mx-1 mb-1 grid max-h-56 gap-2 overflow-y-auto rounded-lg bg-white p-2">
          {results.slice(0, 4).map((result) => (
            <button
              key={`${result.name}-${result.latitude}-${result.longitude}`}
              type="button"
              onClick={() => {
                onSelect(result);
                setConfirmed(result.name);
                setResults([]);
              }}
              className="rounded-lg bg-cream px-3 py-2 text-left text-sm hover:bg-orange-50"
            >
              <span className="block font-bold text-ink">{result.name}</span>
              <span className="block text-xs text-stone-500">{result.address}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
