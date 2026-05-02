"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Book } from "@/types";

interface BookListContextType {
  books: Book[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
}

const BookListContext = createContext<BookListContextType | undefined>(
  undefined,
);

interface BookListProviderProps {
  children: ReactNode;
  initialBooks: Book[];
}

export function BookListProvider({
  children,
  initialBooks,
}: BookListProviderProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch books when debounced query changes
  useEffect(() => {
    // We already have initialBooks loaded, so if the query is empty, we could just rely on initialBooks
    // But to be safe and consistent with the API, we can fetch it, or just use initialBooks.
    // Let's optimize: if debouncedQuery is empty, we can just reset to initialBooks to save an API call.
    if (!debouncedQuery.trim()) {
      setBooks(initialBooks);
      return;
    }

    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/books?query=${encodeURIComponent(debouncedQuery)}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching filtered books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedQuery, initialBooks]);

  return (
    <BookListContext.Provider
      value={{ books, searchQuery, setSearchQuery, isLoading }}
    >
      {children}
    </BookListContext.Provider>
  );
}

export function useBookList() {
  const context = useContext(BookListContext);
  if (context === undefined) {
    throw new Error("useBookList must be used within a BookListProvider");
  }
  return context;
}
