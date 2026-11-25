import Skeleton from "../ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-square w-full" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-4/5 rounded-sm" />
        <Skeleton className="h-4 w-2/5 rounded-sm" />
        <Skeleton className="h-4 w-1/4 rounded-sm" />
        <Skeleton className="h-4 w-1/5 rounded-sm" />
      </div>
    </div>
  );
}
