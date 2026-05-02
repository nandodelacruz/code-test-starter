"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Loader2 } from "lucide-react";

import { SITE, LABELS } from "@/constants";
import { Header } from "@/components/layout/Header";
import { BookGrid } from "@/components/features/BookGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBookList } from "@/context/BookListContext";
import { useCart } from "@/context/CartContext";

export function HomeContent() {
  const {
    books: filteredBooks,
    searchQuery: query,
    setSearchQuery: setQuery,
    isLoading,
  } = useBookList();
  const { totalItems, openCart } = useCart();
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
        {/* Top bar for Cart */}
        <div className="flex justify-end mb-8 sm:mb-12">
          <Button
            id="home-cart-button"
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-muted/50"
            aria-label={`${LABELS.CART} (${totalItems} ${totalItems === 1 ? "item" : "items"})`}
            onClick={openCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-none"
                aria-hidden="true"
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Button>
        </div>

        {/* Page heading + inline controls — observed for header reveal */}
        <div
          ref={headingRef}
          className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20"
        >
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {SITE.NAME}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
            {SITE.TAGLINE}
          </p>

          {/* Inline search bar */}
          <div className="mt-8 relative w-full max-w-2xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder={SITE.SEARCH_PLACEHOLDER}
              className="pl-12 h-14 text-lg rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 border-muted-foreground/20 focus-visible:ring-primary/20"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search books by title or author"
            />
          </div>
        </div>

        {/* Book grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredBooks.length > 0 ? (
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
