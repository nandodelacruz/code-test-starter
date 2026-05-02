"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

import { SITE, ROUTES, LABELS } from "@/constants";
import { Header } from "@/components/layout/Header";
import { BookGrid } from "@/components/features/BookGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
}

interface HomeContentProps {
  books: Book[];
}

export function HomeContent({ books }: HomeContentProps) {
  const [query, setQuery] = useState("");
  const [showHeader, setShowHeader] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);

  // Observe the page heading — when it scrolls out of view, show the sticky header
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHeader(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <>
      <Header searchQuery={query} onSearch={setQuery} visible={showHeader} />

      <main
        className="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8"
        style={{
          maxWidth: "var(--container-max)",
          paddingTop: "var(--space-xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        {/* Page heading + inline controls — observed for header reveal */}
        <div ref={headingRef} className="mb-8 sm:mb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                {SITE.NAME}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {SITE.TAGLINE}
              </p>
            </div>
            <Link href={ROUTES.CART} className="shrink-0 mt-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label={`${LABELS.CART} (0 items)`}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Inline search bar */}
          <div className="mt-5 relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder={SITE.SEARCH_PLACEHOLDER}
              className="pl-9 h-10 text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search books by title or author"
            />
          </div>
        </div>

        {/* Book grid */}
        {filteredBooks.length > 0 ? (
          <BookGrid books={filteredBooks} />
        ) : (
          <div
            className="text-center"
            style={{ padding: "var(--space-3xl) 0" }}
          >
            <p className="text-muted-foreground italic">{SITE.EMPTY_STATE}</p>
          </div>
        )}
      </main>
    </>
  );
}
