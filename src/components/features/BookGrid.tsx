import { BookCard } from "@/components/features/BookCard";

import { Book } from "@/types";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <div
      role="list"
      aria-label="Book collection"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      style={{ gap: "var(--space-xl)" }}
    >
      {books.map((book, index) => (
        <div key={book.id} role="listitem">
          <BookCard {...book} priority={index < 4} />
        </div>
      ))}
    </div>
  );
}
