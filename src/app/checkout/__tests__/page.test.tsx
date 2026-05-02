import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import CheckoutPage from "../page";
import { ROUTES } from "@/constants";

const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    replace: mockReplace,
  })),
}));

const mockUseCart = jest.fn();
jest.mock("@/context/CartContext", () => ({
  useCart: () => mockUseCart(),
}));

function cartWithItems() {
  return {
    items: [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 12.99,
        cover: "/covers/gatsby.jpg",
        quantity: 1,
      },
    ],
    totalItems: 1,
    totalPrice: 12.99,
    isHydrated: true,
    isOpen: false,
    openCart: jest.fn(),
    closeCart: jest.fn(),
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
  };
}

describe("CheckoutPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing before cart is hydrated", () => {
    mockUseCart.mockReturnValue({
      ...cartWithItems(),
      isHydrated: false,
    });
    const { container } = render(<CheckoutPage />);
    expect(container.firstChild).toBeNull();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("redirects home when the cart is empty after hydration", async () => {
    mockUseCart.mockReturnValue({
      ...cartWithItems(),
      items: [],
      totalItems: 0,
      totalPrice: 0,
    });
    render(<CheckoutPage />);
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(ROUTES.HOME);
    });
  });

  it("shows the checkout form when the cart has items", () => {
    mockUseCart.mockReturnValue(cartWithItems());
    render(<CheckoutPage />);
    expect(
      screen.getByRole("heading", { name: /checkout/i }),
    ).toBeInTheDocument();
  });

  it("navigates to the success route after placing an order", async () => {
    mockUseCart.mockReturnValue(cartWithItems());
    const { container } = render(<CheckoutPage />);
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/street address/i), {
      target: { value: "123 Bookish Lane" },
    });
    fireEvent.change(screen.getByLabelText(/^city$/i), {
      target: { value: "Library City" },
    });
    fireEvent.change(screen.getByLabelText(/^state$/i), {
      target: { value: "NSW" },
    });
    fireEvent.change(screen.getByLabelText(/zip code/i), {
      target: { value: "2000" },
    });
    const form = container.querySelector("form");
    expect(form).toBeTruthy();
    fireEvent.submit(form!);
    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith(ROUTES.CHECKOUT_SUCCESS);
      },
      { timeout: 3000 },
    );
  });
});
