export default function CheckoutSuccessLoading() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[70vh]">
      <div className="relative mb-10 flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 scale-150 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="relative z-10 h-24 w-24 rounded-full skeleton" />
      </div>

      <div className="space-y-4 max-w-md w-full">
        <div className="mx-auto h-10 w-52 skeleton rounded-lg" />
        <div className="mx-auto h-5 w-full max-w-sm skeleton rounded" />
        <div className="mx-auto h-5 w-4/5 max-w-xs skeleton rounded" />
        <div className="pt-8 flex justify-center">
          <div className="h-11 w-56 skeleton rounded-md" />
        </div>
      </div>

      <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-4 skeleton rounded-sm" />
          ))}
        </div>
        <div className="h-4 w-40 skeleton rounded" />
      </div>
    </main>
  );
}
