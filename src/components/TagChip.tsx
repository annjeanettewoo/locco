import { getCategoryClass } from "@/utils/places";

export function TagChip({ label }: { label: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getCategoryClass(label)}`}>
      {label}
    </span>
  );
}
