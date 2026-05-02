export default function BookDetailLoading() {
  return (
    <main
      className="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16"
      style={{ maxWidth: "var(--container-max)" }}
    >
      <div className="h-4 w-40 skeleton rounded mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-xl overflow-hidden skeleton" />

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="h-11 md:h-14 w-full max-w-lg skeleton rounded-lg" />
            <div className="h-7 w-2/3 skeleton rounded-lg" />
            <div className="h-9 w-28 skeleton rounded-lg" />
          </div>

          <div className="p-6 rounded-2xl border space-y-6 bg-muted/10">
            <div className="h-12 w-full skeleton rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4 skeleton rounded" />
              <div className="h-4 skeleton rounded" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-6 w-40 skeleton rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full skeleton rounded" />
              <div className="h-4 w-full skeleton rounded" />
              <div className="h-4 w-4/5 skeleton rounded" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
