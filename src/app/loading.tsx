import { BookGridSkeleton } from "@/components/features/BookCardSkeleton";

export default function Loading() {
  return (
    <main
      className="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8"
      style={{
        maxWidth: "var(--container-max)",
        paddingTop: "var(--space-xl)",
        paddingBottom: "var(--space-3xl)",
      }}
    >
      {/* Heading skeleton */}
      <div className="mb-8 sm:mb-10 space-y-3">
        <div className="h-10 w-48 skeleton" />
        <div className="h-5 w-72 skeleton" />
      </div>

      {/* Search bar skeleton */}
      <div className="mb-6 sm:mb-8">
        <div className="h-10 max-w-md skeleton" />
      </div>

      {/* Grid skeleton */}
      <BookGridSkeleton count={8} />
    </main>
  );
}
