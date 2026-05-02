"use client";

import { useState, useMemo } from "react";

import { SITE } from "@/constants";
import { BookGrid } from "@/components/features/BookGrid";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
}

interface SearchFilterProps {
  books: Book[];
}

export function SearchFilter({ books }: SearchFilterProps) {
  const [query, setQuery] = useState("");

  const filteredBooks = useMemo(() => {
    if (!query.trim()) return books;
    const normalised = query.toLowerCase().trim();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(normalised) ||
        book.author.toLowerCase().includes(normalised),
    );
  }, [books, query]);

  return (
    <div>
      {/* Search input — rendered inline on the page for now.
          Will be lifted to header via context/callback in a follow-up. */}
      <div className="mb-6 sm:mb-8">
        <div className="relative max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder={SITE.SEARCH_PLACEHOLDER}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search books by title or author"
          />
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <BookGrid books={filteredBooks} />
      ) : (
        <div className="text-center" style={{ padding: "var(--space-3xl) 0" }}>
          <p className="text-muted-foreground italic">{SITE.EMPTY_STATE}</p>
        </div>
      )}
    </div>
  );
}
