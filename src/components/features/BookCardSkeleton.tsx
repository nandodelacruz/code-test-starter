import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function BookCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-[2/3] skeleton" />
      </CardHeader>
      <CardContent className="flex-1 p-4 sm:p-5 space-y-2">
        <div className="h-5 w-3/4 skeleton" />
        <div className="h-4 w-1/2 skeleton" />
        <div className="h-6 w-1/3 skeleton mt-2" />
      </CardContent>
      <CardFooter className="p-4 sm:p-5 pt-0">
        <div className="h-10 w-full skeleton" />
      </CardFooter>
    </Card>
  );
}

export function BookGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      style={{ gap: "var(--space-lg)" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}
