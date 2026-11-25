import Skeleton from "../ui/Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div aria-busy="true">
      <Skeleton className="mb-6 h-4 w-64 rounded-sm" />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 rounded-sm" />
          <Skeleton className="h-9 w-4/5 rounded-sm" />
          <Skeleton className="h-6 w-24 rounded-sm" />
          <Skeleton className="h-5 w-40 rounded-sm" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-full rounded-sm" />
            <Skeleton className="h-4 w-full rounded-sm" />
            <Skeleton className="h-4 w-3/4 rounded-sm" />
          </div>
          <Skeleton className="mt-6 h-14 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
