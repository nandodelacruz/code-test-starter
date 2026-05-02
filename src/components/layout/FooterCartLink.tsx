"use client";

import { useCart } from "@/context/CartContext";
import { LABELS } from "@/constants";

export function FooterCartLink() {
  const { openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      aria-label={`Open ${LABELS.CART}`}
    >
      {LABELS.CART}
    </button>
  );
}
