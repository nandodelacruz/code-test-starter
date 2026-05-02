"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { LABELS, ROUTES, SITE_MESSAGES } from "@/constants";

export function CartPageContent() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } =
    useCart();

  return (
    <main
      className="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8"
      style={{
        maxWidth: "var(--container-max)",
        paddingTop: "var(--space-xl)",
        paddingBottom: "var(--space-3xl)",
      }}
    >
      {/* Page header */}
      <div className="mb-10">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to bookshop
        </Link>

        <div className="flex items-center gap-3">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {LABELS.CART}
          </h1>
          {totalItems > 0 && (
            <span className="rounded-full bg-primary text-primary-foreground text-sm font-bold px-2.5 py-0.5 leading-none">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        /* ── Empty state ────────────────────────────────────────── */
        <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
          <ShoppingBag className="h-20 w-20 text-muted-foreground/20" />
          <p className="text-lg font-medium text-muted-foreground">
            {SITE_MESSAGES.CART_EMPTY}
          </p>
          <Button asChild>
            <Link href={ROUTES.HOME}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse Books
            </Link>
          </Button>
        </div>
      ) : (
        /* ── Cart content ───────────────────────────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          {/* Item list */}
          <ul
            className="lg:col-span-2 divide-y divide-border"
            aria-label="Cart items"
          >
            {items.map((item) => (
              <li key={item.id} className="flex gap-5 py-6 group">
                {/* Book cover */}
                <div className="w-20 h-28 flex-shrink-0 rounded-md overflow-hidden bg-muted shadow-sm">
                  <Image
                    src={item.cover}
                    alt={`Cover of ${item.title}`}
                    width={80}
                    height={112}
                    className="h-full w-full object-contain p-1"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="font-semibold text-base leading-snug mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    {LABELS.BY_AUTHOR} {item.author}
                  </p>

                  <div className="mt-auto flex items-center justify-between flex-wrap gap-3">
                    {/* Quantity stepper */}
                    <div className="flex items-center gap-1.5 rounded-full border px-1.5 py-1 bg-background shadow-sm">
                      <Button
                        id={`cart-page-decrease-${item.id}`}
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span
                        className="w-6 text-center text-sm font-semibold tabular-nums"
                        aria-label={`Quantity: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <Button
                        id={`cart-page-increase-${item.id}`}
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    {/* Right side: price + remove */}
                    <div className="flex items-center gap-3 ml-auto">
                      <span className="text-base font-bold tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        (${item.price.toFixed(2)} each)
                      </span>
                      <Button
                        id={`cart-page-remove-${item.id}`}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Order summary */}
          <aside
            className="lg:col-span-1 rounded-2xl border bg-muted/30 p-6 space-y-5 lg:sticky lg:top-8"
            aria-label="Order summary"
          >
            <h2 className="text-lg font-bold tracking-tight">Order Summary</h2>

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </dt>
                <dd className="tabular-nums">${totalPrice.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Shipping</dt>
                <dd className="text-green-600 font-medium">Free</dd>
              </div>
            </dl>

            <div className="border-t pt-4 flex justify-between font-bold text-base">
              <span>{LABELS.TOTAL}</span>
              <span className="tabular-nums">${totalPrice.toFixed(2)}</span>
            </div>

            <Button
              id="cart-page-checkout-button"
              className="w-full font-semibold h-11 shadow-sm hover:shadow-md transition-shadow"
              aria-label="Proceed to checkout"
            >
              {LABELS.CHECKOUT}
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link href={ROUTES.HOME}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {LABELS.CONTINUE_SHOPPING}
              </Link>
            </Button>
          </aside>
        </div>
      )}
    </main>
  );
}
