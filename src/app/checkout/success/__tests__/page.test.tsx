import { render, waitFor } from "@testing-library/react";

import CheckoutSuccessPage from "../page";

const mockClearCart = jest.fn();
const mockUseCart = jest.fn();

jest.mock("@/context/CartContext", () => ({
  useCart: () => mockUseCart(),
}));

describe("CheckoutSuccessPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCart.mockReturnValue({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isHydrated: true,
      isOpen: false,
      openCart: jest.fn(),
      closeCart: jest.fn(),
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: mockClearCart,
    });
  });

  it("clears the cart once on mount", async () => {
    render(<CheckoutSuccessPage />);
    await waitFor(() => {
      expect(mockClearCart).toHaveBeenCalledTimes(1);
    });
  });
});
