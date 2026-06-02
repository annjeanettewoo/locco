"use client";

import { useState } from "react";
import type { MergedPlace, RecommendationResult } from "@/types";
import { formatDistance } from "@/utils/distance";

type Props = {
  selectedListIds: string[];
  onResults: (results: RecommendationResult[]) => void;
  onSelectPlace: (place: MergedPlace) => void;
};

export function ChatRecommendationPanel({ selectedListIds, onResults, onSelectPlace }: Props) {
  const [query, setQuery] = useState("I'm going to Orchard MRT and I feel like dessert");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, selectedListIds })
      });
      const payload = (await response.json()) as {
        interpretedLocation?: string;
        interpretedTags?: string[];
        results?: RecommendationResult[];
        error?: string;
      };
      if (!response.ok) throw new Error(payload.error ?? "Recommendation failed.");
      const nextResults = payload.results ?? [];
      setResults(nextResults);
      onResults(nextResults);
      setSummary(
        `Looking near ${payload.interpretedLocation ?? "Singapore"}${
          payload.interpretedTags?.length ? ` for ${payload.interpretedTags.join(", ")}` : ""
        }.`
      );
    } catch (recommendError) {
      setError(recommendError instanceof Error ? recommendError.message : "Recommendation failed.");
      setResults([]);
      onResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-stone-200">
      <p className="mb-2 text-xs font-bold text-stone-500">
        Try: Dessert from Isabella&apos;s list near Orchard
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 rounded-full border border-stone-200 px-4 py-2 text-sm outline-none focus:border-tomato"
          placeholder="Cafe near Tanjong Pagar"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-tomato px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {isLoading ? "..." : "Ask"}
        </button>
      </form>
      {summary ? <p className="mt-2 text-xs font-semibold text-stone-500">{summary}</p> : null}
      {error ? <p className="mt-2 text-xs font-semibold text-red-600">{error}</p> : null}

      {results.length ? (
        <div className="mt-3 grid gap-2">
          {results.map((result) => (
            <button
              key={result.id}
              type="button"
              onClick={() => onSelectPlace(result)}
              className="rounded-lg bg-cream px-3 py-2 text-left hover:bg-orange-50"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-ink">{result.name}</p>
                  <p className="text-xs text-stone-500">
                    {formatDistance(result.distanceMeters)} - score {result.score}
                  </p>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-tomato">
                  {result.categories[0]}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
