"use client";

import type { FoodList } from "@/types";

type Props = {
  lists: FoodList[];
  selectedListIds: string[];
  onToggle: (listId: string) => void;
};

export function SelectedListChips({ lists, selectedListIds, onToggle }: Props) {
  const selectedLists = lists.filter((list) => selectedListIds.includes(list.id));

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {selectedLists.map((list) => (
        <button
          key={list.id}
          type="button"
          onClick={() => onToggle(list.id)}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-black text-ink shadow-sm ring-1 ring-stone-200 backdrop-blur"
          title={`Hide ${list.name}`}
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: list.color }}
            aria-hidden
          />
          {list.ownerName}
        </button>
      ))}
    </div>
  );
}
