import { FoodMapApp } from "@/components/FoodMapApp";

export default async function MapPage({
  searchParams
}: {
  searchParams: Promise<{ lists?: string }>;
}) {
  const params = await searchParams;
  const initialSelectedListIds = params.lists?.split(",").filter(Boolean);

  return <FoodMapApp initialSelectedListIds={initialSelectedListIds} />;
}
