import React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import { BookListProvider, useBookList } from "../BookListContext";

// Dummy component to test the context
function TestComponent() {
  const { books, searchQuery, setSearchQuery, isLoading } = useBookList();

  return (
    <div>
      <div data-testid="loading">{isLoading ? "true" : "false"}</div>
      <div data-testid="search">{searchQuery}</div>
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div data-testid="books-count">{books.length}</div>
      <ul>
        {books.map((b) => (
          <li key={b.id} data-testid="book-item">
            {b.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

const mockBooks = [
  { id: 1, title: "Initial Book 1", author: "Author 1", price: 10, cover: "" },
  { id: 2, title: "Initial Book 2", author: "Author 2", price: 20, cover: "" },
];

describe("BookListContext", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("should initialize with initialBooks and empty search query", () => {
    render(
      <BookListProvider initialBooks={mockBooks}>
        <TestComponent />
      </BookListProvider>,
    );

    expect(screen.getByTestId("books-count")).toHaveTextContent("2");
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    expect(screen.getByTestId("search")).toHaveTextContent("");

    const items = screen.getAllByTestId("book-item");
    expect(items[0]).toHaveTextContent("Initial Book 1");
  });

  it("should debounce search query and fetch from API", async () => {
    const apiBooks = [
      { id: 3, title: "API Book", author: "Author 3", price: 30, cover: "" },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(apiBooks),
    });

    render(
      <BookListProvider initialBooks={mockBooks}>
        <TestComponent />
      </BookListProvider>,
    );

    const input = screen.getByTestId("search-input");

    // Type a query
    act(() => {
      fireEvent.change(input, { target: { value: "API" } });
    });

    expect(screen.getByTestId("search")).toHaveTextContent("API");
    // API shouldn't be called yet (debounce is 300ms)
    expect(global.fetch).not.toHaveBeenCalled();

    // Fast-forward time to trigger debounce
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Loading should be true temporarily and then false
    expect(global.fetch).toHaveBeenCalledWith("/api/books?query=API");

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("books-count")).toHaveTextContent("1");
    expect(screen.getAllByTestId("book-item")[0]).toHaveTextContent("API Book");
  });

  it("should revert to initialBooks when query is cleared", async () => {
    const apiBooks = [
      { id: 3, title: "API Book", author: "Author 3", price: 30, cover: "" },
    ];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(apiBooks),
    });

    render(
      <BookListProvider initialBooks={mockBooks}>
        <TestComponent />
      </BookListProvider>,
    );

    const input = screen.getByTestId("search-input");

    act(() => {
      fireEvent.change(input, { target: { value: "A" } });
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByTestId("books-count")).toHaveTextContent("1");
    });

    // Now clear the query
    act(() => {
      fireEvent.change(input, { target: { value: "" } });
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Should revert without calling API again
    expect(global.fetch).toHaveBeenCalledTimes(1); // from the previous fetch

    await waitFor(() => {
      expect(screen.getByTestId("books-count")).toHaveTextContent("2");
    });
  });

  it("should throw error if useBookList is used outside provider", () => {
    // Silence console.error for expected thrown error
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useBookList must be used within a BookListProvider",
    );

    spy.mockRestore();
  });
});
