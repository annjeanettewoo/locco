"use client";

import Link from "next/link";
import type { MergedPlace } from "@/types";
import { formatDistance } from "@/utils/distance";
import { appleMapsLink, googleMapsLink } from "@/utils/places";
import { FriendAvatarStack } from "@/components/FriendAvatarStack";
import { TagChip } from "@/components/TagChip";

type Props = {
  place: MergedPlace | null;
  distanceMeters?: number;
  onClose: () => void;
  onSave: () => void;
};

export function PlaceBottomSheet({ place, distanceMeters, onClose, onSave }: Props) {
  if (!place) return null;
  const distance = formatDistance(distanceMeters);

  return (
    <section className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[68dvh] max-w-xl overflow-y-auto rounded-t-lg bg-white p-5 shadow-soft ring-1 ring-stone-200 bottom-sheet-scroll sm:bottom-4 sm:rounded-lg">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-tomato">
            {place.categories[0]} · {place.priceRange}
            {distance ? ` · ${distance}` : ""}
          </p>
          <h2 className="mt-1 text-2xl font-black text-ink">{place.name}</h2>
          <p className="mt-1 text-sm leading-5 text-stone-600">{place.address}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-stone-100 px-3 py-2 text-sm font-black text-stone-600"
          aria-label="Close place details"
        >
          X
        </button>
      </div>

      <div className="flex items-center gap-3">
        <FriendAvatarStack listIds={place.selectedListIds} />
        <p className="text-sm font-semibold text-stone-600">
          Saved by {place.savedBySelected.join(", ")}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-stone-700">{place.notes}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[...place.categories, ...place.moodTags].map((tag) => (
          <TagChip key={tag} label={tag} />
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {place.comments.map((comment) => (
          <p key={`${comment.author}-${comment.text}`} className="text-sm text-stone-600">
            <span className="font-bold text-ink">{comment.author}:</span> {comment.text}
          </p>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          className="rounded-full bg-tomato px-4 py-2 text-sm font-bold text-white"
        >
          Save
        </button>
        <a
          href={googleMapsLink(place)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white"
        >
          Open in Google Maps
        </a>
        <a
          href={appleMapsLink(place)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink ring-1 ring-stone-200"
        >
          Open in Apple Maps
        </a>
        <Link
          href={`/app/place/${place.id}`}
          className="rounded-full bg-stone-100 px-4 py-2 text-sm font-bold text-stone-700"
        >
          Details
        </Link>
      </div>

      {place.sources.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {place.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-tomato underline"
            >
              {source.type} source
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
