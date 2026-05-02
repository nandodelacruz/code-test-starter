// Route paths
export const ROUTES = {
  HOME: "/",
  /** @deprecated `/cart` redirects to `CHECKOUT`. Use `CHECKOUT` for links. */
  CART: "/cart",
  CHECKOUT: "/checkout",
  CHECKOUT_SUCCESS: "/checkout/success",
  BOOK_DETAIL: "/book",
} as const;

// UI strings
export const SITE = {
  NAME: "BookHaven",
  TAGLINE: "Curated stories for every reader.",
  SEARCH_PLACEHOLDER: "Search by title or author\u2026",
  EMPTY_STATE: "No books found. Try a different search term.",
  NO_BOOKS: "No books found. Have you run the seed script?",
  FOOTER_TEXT: `\u00a9 ${new Date().getFullYear()} BookHaven. All rights reserved.`,
} as const;

// Labels
export const LABELS = {
  ADD_TO_CART: "Add to Cart",
  REMOVE_FROM_CART: "Remove",
  CART: "Cart",
  BY_AUTHOR: "by",
  TOTAL: "Total",
  CHECKOUT: "Checkout",
  CONTINUE_SHOPPING: "Continue Shopping",
  ISBN: "ISBN",
  DESCRIPTION: "Description",
  BOOK_DETAILS: "Book Details",
  PLACE_ORDER: "Place Order",
} as const;

// Site-wide messages
export const SITE_MESSAGES = {
  CART_EMPTY: "Your cart is empty.",
} as const;
