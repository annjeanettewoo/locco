import { getCategoryEmoji } from "@/utils/places";

export function PlaceMarker({ category, isHighlighted }: { category?: string; isHighlighted?: boolean }) {
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-base shadow-soft ${
        isHighlighted ? "bg-tomato" : "bg-ink"
      }`}
    >
      {getCategoryEmoji(category)}
    </span>
  );
}
