"use client";

import type { FoodList, FoodPlace } from "@/types";

type Props = {
  lists: FoodList[];
  places: FoodPlace[];
  selectedListIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onToggle: (listId: string) => void;
};

export function ListDrawer({ lists, places, selectedListIds, isOpen, onClose, onToggle }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/20" onClick={onClose}>
      <section
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[72dvh] max-w-xl overflow-y-auto rounded-t-lg bg-white p-4 shadow-soft sm:bottom-4 sm:rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-tomato">Trusted lists</p>
            <h2 className="text-xl font-black text-ink">Choose what appears</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-stone-100 px-3 py-2 text-sm font-black text-stone-600"
            aria-label="Close list drawer"
          >
            X
          </button>
        </div>

        <div className="grid gap-2">
          {lists.map((list) => {
            const selected = selectedListIds.includes(list.id);
            const count = places.filter((place) => place.listIds.includes(list.id)).length;

            return (
              <button
                key={list.id}
                type="button"
                onClick={() => onToggle(list.id)}
                className="flex w-full items-center gap-3 rounded-lg border border-stone-200 bg-white p-3 text-left transition hover:bg-cream"
                aria-pressed={selected}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
                  style={{ backgroundColor: list.color }}
                >
                  {list.avatar}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-black text-ink">{list.name}</span>
                  <span className="block text-xs font-semibold text-stone-500">
                    {list.ownerName} · {count} places
                  </span>
                </span>
                <span
                  className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
                    selected ? "bg-tomato" : "bg-stone-200"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      selected ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
