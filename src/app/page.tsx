import { SITE } from "@/constants";
import { HomeContent } from "@/components/features/HomeContent";
import { BookService } from "@/lib/services/book.service";
import { BookListProvider } from "@/context/BookListContext";

export default async function Home() {
  const books = await BookService.list();

  return books.length > 0 ? (
    <BookListProvider initialBooks={books}>
      <HomeContent />
    </BookListProvider>
  ) : (
    <main
      className="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8"
      style={{
        maxWidth: "var(--container-max)",
        paddingTop: "var(--space-xl)",
        paddingBottom: "var(--space-3xl)",
      }}
    >
      <div className="text-center" style={{ padding: "var(--space-3xl) 0" }}>
        <p className="text-muted-foreground italic">{SITE.NO_BOOKS}</p>
      </div>
    </main>
  );
}
