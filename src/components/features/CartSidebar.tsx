"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { LABELS, ROUTES, SITE_MESSAGES } from "@/constants";
import { cn } from "@/lib/utils";

export function CartSidebar() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(false);

  // Focus close when opening; return focus to header cart when closing
  useEffect(() => {
    if (isOpen && !prevOpenRef.current) {
      requestAnimationFrame(() => {
        document.getElementById("cart-close-button")?.focus();
      });
    } else if (!isOpen && prevOpenRef.current) {
      requestAnimationFrame(() => {
        document.getElementById("header-cart-button")?.focus();
      });
    }
    prevOpenRef.current = isOpen;
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        role="presentation"
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={LABELS.CART}
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-sm sm:max-w-md bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold tracking-tight">{LABELS.CART}</h2>
            {totalItems > 0 && (
              <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 leading-none">
                {totalItems}
              </span>
            )}
          </div>
          <Button
            id="cart-close-button"
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-muted"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
              <p className="text-muted-foreground font-medium">
                {SITE_MESSAGES.CART_EMPTY}
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={closeCart}
                asChild
              >
                <Link href={ROUTES.HOME}>
                  Browse Books <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5" aria-label="Cart items">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 py-4 border-b last:border-0 group"
                >
                  {/* Cover thumbnail */}
                  <div className="w-16 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.cover}
                      alt={`Cover of ${item.title}`}
                      width={64}
                      height={96}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <p className="font-semibold text-sm leading-tight line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      {LABELS.BY_AUTHOR} {item.author}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1 rounded-full border px-1 py-0.5">
                        <Button
                          id={`cart-decrease-${item.id}`}
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span
                          className="w-5 text-center text-sm font-semibold tabular-nums"
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          id={`cart-increase-${item.id}`}
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Remove */}
                      <Button
                        id={`cart-remove-${item.id}`}
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — totals + CTA */}
        {items.length > 0 && (
          <div className="border-t px-6 py-5 space-y-4 bg-muted/30">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>{LABELS.TOTAL}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Button
              id="cart-checkout-button"
              className="w-full font-semibold h-11 shadow-sm hover:shadow-md transition-shadow"
              aria-label="Proceed to checkout"
              asChild
            >
              <Link href={ROUTES.CHECKOUT} onClick={closeCart}>
                {LABELS.CHECKOUT}
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-8/12 mx-auto flex text-muted-foreground text-xs"
              onClick={closeCart}
            >
              {LABELS.CONTINUE_SHOPPING}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
