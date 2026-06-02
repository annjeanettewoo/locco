import { foodLists } from "@/data/mockData";

export function FriendAvatarStack({ listIds }: { listIds: string[] }) {
  const lists = listIds.map((id) => foodLists.find((list) => list.id === id)).filter(Boolean);

  return (
    <div className="flex -space-x-2">
      {lists.map((list) => (
        <div
          key={list!.id}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-black text-white"
          style={{ backgroundColor: list!.color }}
          title={list!.name}
        >
          {list!.avatar}
        </div>
      ))}
    </div>
  );
}
