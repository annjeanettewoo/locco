"use client";

import type { FoodList } from "@/types";

type Props = {
  lists: FoodList[];
  selectedListIds: string[];
  onToggle: (listId: string) => void;
};

export function ListToggleBar({ lists, selectedListIds, onToggle }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {lists.map((list) => {
        const selected = selectedListIds.includes(list.id);
        return (
          <button
            key={list.id}
            type="button"
            onClick={() => onToggle(list.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold shadow-sm transition ${
              selected ? "border-ink bg-ink text-white" : "border-stone-200 bg-white text-stone-700"
            }`}
            aria-pressed={selected}
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black text-white"
              style={{ backgroundColor: list.color }}
            >
              {list.avatar}
            </span>
            {list.name}
          </button>
        );
      })}
    </div>
  );
}
