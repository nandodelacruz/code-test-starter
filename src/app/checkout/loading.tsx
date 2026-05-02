export default function CheckoutLoading() {
  return (
    <main
      className="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16"
      style={{ maxWidth: "var(--container-max)" }}
    >
      <div className="h-4 w-44 skeleton rounded mb-10" />

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex-[2] space-y-10">
          <section className="space-y-6">
            <div className="h-9 w-48 skeleton rounded-lg" />

            <div className="space-y-4">
              <div className="h-7 w-56 skeleton rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-16 skeleton rounded-md" />
                <div className="h-16 skeleton rounded-md" />
              </div>
              <div className="h-16 skeleton rounded-md" />
              <div className="h-16 skeleton rounded-md" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="h-16 skeleton rounded-md" />
                <div className="h-16 skeleton rounded-md" />
                <div className="h-16 skeleton rounded-md col-span-2 md:col-span-1" />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="h-7 w-52 skeleton rounded-lg" />
              <div className="h-24 rounded-xl border skeleton" />
            </div>

            <div className="h-14 w-full skeleton rounded-lg mt-4" />
          </section>
        </div>

        <aside className="flex-1 lg:max-w-sm">
          <div className="rounded-2xl border bg-muted/30 p-6 space-y-6 lg:sticky lg:top-24">
            <div className="h-7 w-40 skeleton rounded-lg" />
            <ul className="space-y-4">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex gap-3">
                  <div className="h-16 w-12 flex-shrink-0 skeleton rounded-md" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-4 w-full skeleton rounded" />
                    <div className="h-3 w-16 skeleton rounded" />
                  </div>
                  <div className="h-4 w-14 skeleton rounded mt-1" />
                </li>
              ))}
            </ul>
            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between gap-4">
                <div className="h-4 w-32 skeleton rounded" />
                <div className="h-4 w-16 skeleton rounded" />
              </div>
              <div className="flex justify-between gap-4">
                <div className="h-4 w-24 skeleton rounded" />
                <div className="h-4 w-12 skeleton rounded" />
              </div>
              <div className="flex justify-between gap-4 pt-2 border-t border-muted-foreground/10">
                <div className="h-7 w-16 skeleton rounded" />
                <div className="h-7 w-20 skeleton rounded" />
              </div>
            </div>
            <div className="p-4 rounded-xl flex gap-3">
              <div className="h-10 w-10 skeleton rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-full skeleton rounded" />
                <div className="h-3 w-11/12 skeleton rounded" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
