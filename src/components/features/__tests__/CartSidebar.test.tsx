/**
 * CartSidebar component tests
 * Covers: empty state, item list, quantity controls, remove, totals.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { CartSidebar } from "@/components/features/CartSidebar";
import { CartContext } from "@/context/CartContext";
import { CartItem } from "@/context/CartContext";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  ),
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mockItem: CartItem = {
  id: 1,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  price: 12.99,
  cover: "/covers/gatsby.jpg",
  quantity: 2,
};

const baseCtx = {
  items: [] as CartItem[],
  totalItems: 0,
  totalPrice: 0,
  isHydrated: true,
  isOpen: true,
  openCart: jest.fn(),
  closeCart: jest.fn(),
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  updateQuantity: jest.fn(),
  clearCart: jest.fn(),
};

function renderWithContext(overrides: Partial<typeof baseCtx> = {}) {
  const ctx = { ...baseCtx, ...overrides };
  return render(
    <CartContext.Provider value={ctx}>
      <CartSidebar />
    </CartContext.Provider>,
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("CartSidebar", () => {
  let rafSpy: jest.SpyInstance<number, [FrameRequestCallback]>;

  beforeEach(() => {
    jest.clearAllMocks();
    rafSpy = jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        (cb as FrameRequestCallback)(0);
        return 0;
      });
  });

  afterEach(() => {
    rafSpy.mockRestore();
  });

  it("renders the sidebar heading", () => {
    renderWithContext();
    expect(screen.getByRole("dialog", { name: /cart/i })).toBeInTheDocument();
  });

  it("shows empty state when cart has no items", () => {
    renderWithContext();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/browse books/i)).toBeInTheDocument();
  });

  it("renders cart items with title, author, and price", () => {
    renderWithContext({ items: [mockItem], totalItems: 2, totalPrice: 25.98 });
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText(/F. Scott Fitzgerald/i)).toBeInTheDocument();
    // Subtotal for item (2 × $12.99 = $25.98) — appears in item row
    const prices = screen.getAllByText("$25.98");
    expect(prices.length).toBeGreaterThanOrEqual(1);
  });

  it("calls removeFromCart when Trash button is clicked", () => {
    const removeFromCart = jest.fn();
    renderWithContext({
      items: [mockItem],
      totalItems: 2,
      totalPrice: 25.98,
      removeFromCart,
    });
    fireEvent.click(
      screen.getByLabelText(/remove the great gatsby from cart/i),
    );
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  it("calls updateQuantity(+1) when increase button is clicked", () => {
    const updateQuantity = jest.fn();
    renderWithContext({
      items: [mockItem],
      totalItems: 2,
      totalPrice: 25.98,
      updateQuantity,
    });
    fireEvent.click(
      screen.getByLabelText(/increase quantity of the great gatsby/i),
    );
    expect(updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("calls updateQuantity(-1) when decrease button is clicked", () => {
    const updateQuantity = jest.fn();
    renderWithContext({
      items: [mockItem],
      totalItems: 2,
      totalPrice: 25.98,
      updateQuantity,
    });
    fireEvent.click(
      screen.getByLabelText(/decrease quantity of the great gatsby/i),
    );
    expect(updateQuantity).toHaveBeenCalledWith(1, -1);
  });

  it("calls closeCart when the X button is clicked", () => {
    const closeCart = jest.fn();
    renderWithContext({ closeCart });
    fireEvent.click(screen.getByLabelText(/close cart/i));
    expect(closeCart).toHaveBeenCalled();
  });

  it("displays the cart total", () => {
    renderWithContext({ items: [mockItem], totalItems: 2, totalPrice: 25.98 });
    // The footer total label + value
    expect(screen.getByText("Total")).toBeInTheDocument();
    // There'll be two "$25.98" — item subtotal and footer total
    const totals = screen.getAllByText("$25.98");
    expect(totals.length).toBeGreaterThanOrEqual(2);
  });

  it("renders Checkout link to /checkout and closes cart on click", () => {
    const closeCart = jest.fn();
    renderWithContext({
      items: [mockItem],
      totalItems: 2,
      totalPrice: 25.98,
      closeCart,
    });
    const checkoutLink = screen.getByRole("link", { name: /^checkout$/i });
    expect(checkoutLink).toHaveAttribute("href", "/checkout");
    fireEvent.click(checkoutLink);
    expect(closeCart).toHaveBeenCalled();
  });

  it("focuses the close button when the cart opens", async () => {
    const { rerender } = render(
      <CartContext.Provider value={{ ...baseCtx, isOpen: false }}>
        <CartSidebar />
      </CartContext.Provider>,
    );
    rerender(
      <CartContext.Provider value={{ ...baseCtx, isOpen: true }}>
        <CartSidebar />
      </CartContext.Provider>,
    );
    await waitFor(() => {
      expect(document.activeElement).toBe(
        document.getElementById("cart-close-button"),
      );
    });
  });
});
