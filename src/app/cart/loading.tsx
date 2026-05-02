export default function CartRedirectLoading() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 min-h-[40vh]">
      <div className="h-10 w-10 rounded-full border-2 border-muted border-t-primary animate-spin mb-6" />
      <div className="h-5 w-48 skeleton rounded-md mb-2" />
      <div className="h-4 w-36 skeleton rounded opacity-70" />
    </main>
  );
}
