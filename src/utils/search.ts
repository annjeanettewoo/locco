import { foodPlaces } from "@/data/mockData";
import type { FoodPlace } from "@/types";

export function searchPlaces(query: string, places: FoodPlace[] = foodPlaces) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return places;

  return places.filter((place) => {
    const haystack = [
      place.name,
      place.address,
      place.categories.join(" "),
      place.moodTags.join(" "),
      place.notes
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
