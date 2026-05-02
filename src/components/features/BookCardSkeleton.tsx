import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function BookCardSkeleton() {
  return (
    <Card className="flex flex-col rounded-xl border bg-card p-4 shadow-sm">
      <CardHeader className="p-0 mb-4">
        <div className="aspect-[3/4] w-full rounded-xl skeleton" />
      </CardHeader>
      <CardContent className="flex-1 p-0 space-y-2">
        <div className="h-5 w-3/4 skeleton" />
        <div className="h-4 w-1/2 skeleton" />
        <div className="h-6 w-1/3 skeleton mt-2" />
      </CardContent>
      <CardFooter className="mt-auto p-0 pt-2">
        <div className="h-10 w-full skeleton" />
      </CardFooter>
    </Card>
  );
}

export function BookGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      style={{ gap: "var(--space-xl)" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}
