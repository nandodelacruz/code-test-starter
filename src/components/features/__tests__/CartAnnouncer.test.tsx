import { render, screen, waitFor } from "@testing-library/react";

import { CartAnnouncer } from "@/components/features/CartAnnouncer";
import { CartContext } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

const noop = () => {};

const buildValue = (
  overrides: {
    totalItems?: number;
    items?: CartItem[];
  } = {},
) => ({
  items: overrides.items ?? ([] as CartItem[]),
  totalItems: overrides.totalItems ?? 0,
  totalPrice: 0,
  isHydrated: true,
  isOpen: false,
  openCart: noop,
  closeCart: noop,
  addToCart: noop,
  removeFromCart: noop,
  updateQuantity: noop,
  clearCart: noop,
});

function renderAnnouncer(totalItems: number) {
  return render(
    <CartContext.Provider value={buildValue({ totalItems })}>
      <CartAnnouncer />
    </CartContext.Provider>,
  );
}

describe("CartAnnouncer", () => {
  it("announces when an item is added to the cart", async () => {
    const { rerender } = renderAnnouncer(0);
    rerender(
      <CartContext.Provider value={buildValue({ totalItems: 1 })}>
        <CartAnnouncer />
      </CartContext.Provider>,
    );
    const region = screen.getByRole("status");
    await waitFor(() => {
      expect(region).toHaveTextContent("Item added to cart");
    });
  });

  it("announces when an item is removed from the cart", async () => {
    const { rerender } = renderAnnouncer(2);
    rerender(
      <CartContext.Provider value={buildValue({ totalItems: 1 })}>
        <CartAnnouncer />
      </CartContext.Provider>,
    );
    const region = screen.getByRole("status");
    await waitFor(() => {
      expect(region).toHaveTextContent("Item removed from cart");
    });
  });
});
