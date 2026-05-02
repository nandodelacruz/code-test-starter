import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HomeContent } from "../HomeContent";
import { useBookList } from "@/context/BookListContext";

// Mock the context hook
jest.mock("@/context/BookListContext", () => ({
  useBookList: jest.fn(),
}));

// Mock the CartContext hook
jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(() => ({
    totalItems: 0,
    openCart: jest.fn(),
    closeCart: jest.fn(),
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    items: [],
    totalPrice: 0,
    isHydrated: true,
    isOpen: false,
  })),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock next/image — forward only serialisable DOM props (Next 16 may pass non-DOM props)
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const alt = typeof props.alt === "string" ? props.alt : "";
    const src =
      typeof props.src === "string"
        ? props.src
        : props.src &&
            typeof props.src === "object" &&
            "src" in props.src &&
            typeof (props.src as { src: unknown }).src === "string"
          ? (props.src as { src: string }).src
          : "";
    const width = typeof props.width === "number" ? props.width : undefined;
    const height = typeof props.height === "number" ? props.height : undefined;
    const className =
      typeof props.className === "string" ? props.className : undefined;
    const sizes = typeof props.sizes === "string" ? props.sizes : undefined;
    const priority = Boolean(props.priority);
    return (
      // eslint-disable-next-line @next/next/no-img-element -- test double for next/image
      <img
        alt={alt}
        src={src}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        data-priority={priority ? "true" : undefined}
      />
    );
  },
}));

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe("HomeContent", () => {
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render books and search input from context", () => {
    (useBookList as jest.Mock).mockReturnValue({
      books: [
        {
          id: 1,
          title: "Mock Book 1",
          author: "Author 1",
          price: 10,
          cover: "/mock1.jpg",
        },
        {
          id: 2,
          title: "Mock Book 2",
          author: "Author 2",
          price: 20,
          cover: "/mock2.jpg",
        },
      ],
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      isLoading: false,
    });

    render(<HomeContent />);

    // Search input is rendered
    const searchInput = screen.getByLabelText(
      "Search books by title or author",
    );
    expect(searchInput).toBeInTheDocument();

    // Books are rendered
    expect(screen.getByText("Mock Book 1")).toBeInTheDocument();
    expect(screen.getByText("Mock Book 2")).toBeInTheDocument();
  });

  it("should show loading spinner when isLoading is true", () => {
    (useBookList as jest.Mock).mockReturnValue({
      books: [],
      searchQuery: "searching...",
      setSearchQuery: mockSetSearchQuery,
      isLoading: true,
    });

    // We can't directly query the lucide-react Loader2 easily by text,
    // but we can query by checking the absence of books and the empty state
    const { container } = render(<HomeContent />);

    // Check for the animate-spin class which is on the loader
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("should show empty state when no books match", () => {
    (useBookList as jest.Mock).mockReturnValue({
      books: [],
      searchQuery: "not found",
      setSearchQuery: mockSetSearchQuery,
      isLoading: false,
    });

    render(<HomeContent />);

    expect(
      screen.getByText("No books found. Try a different search term."),
    ).toBeInTheDocument();
  });

  it("should call setSearchQuery when typing in the search input", () => {
    (useBookList as jest.Mock).mockReturnValue({
      books: [],
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      isLoading: false,
    });

    render(<HomeContent />);

    const searchInput = screen.getByLabelText(
      "Search books by title or author",
    );

    fireEvent.change(searchInput, { target: { value: "Harry" } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith("Harry");
  });
});
