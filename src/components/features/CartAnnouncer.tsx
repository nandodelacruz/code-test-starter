"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState, useRef } from "react";

export function CartAnnouncer() {
  const { totalItems } = useCart();
  const [announcement, setAnnouncement] = useState("");
  const initialMount = useRef(true);
  const prevCount = useRef(totalItems);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    if (totalItems > prevCount.current) {
      setAnnouncement("Item added to cart");
    } else if (totalItems < prevCount.current) {
      setAnnouncement("Item removed from cart");
    }

    prevCount.current = totalItems;

    // Clear announcement after it's been read
    const timer = setTimeout(() => setAnnouncement(""), 1000);
    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <div role="status" aria-live="polite" className="sr-only">
      {announcement}
    </div>
  );
}
