"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LABELS, ROUTES } from "@/constants";

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, isHydrated } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (items.length === 0) {
      router.replace(ROUTES.HOME);
    }
  }, [isHydrated, items.length, router]);

  if (!isHydrated || items.length === 0) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push(ROUTES.CHECKOUT_SUCCESS);
  };

  return (
    <main
      className="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16"
      style={{ maxWidth: "var(--container-max)" }}
    >
      <Link
        href={ROUTES.HOME}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to bookshop
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex-[2] space-y-10">
          <section className="space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="Jane" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Street Address
                  </label>
                  <Input id="address" placeholder="123 Bookish Lane" required />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      City
                    </label>
                    <Input id="city" placeholder="Library City" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="state" className="text-sm font-medium">
                      State
                    </label>
                    <Input id="state" placeholder="NSW" required />
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label htmlFor="zip" className="text-sm font-medium">
                      ZIP Code
                    </label>
                    <Input id="zip" placeholder="2000" required />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Details
                </h2>
                <div className="p-4 rounded-xl border bg-muted/20 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold italic">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground italic">
                      Pay securely when your books arrive.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg font-bold shadow-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : LABELS.PLACE_ORDER}
              </Button>
            </form>
          </section>
        </div>

        <aside className="flex-1 lg:max-w-sm">
          <div className="rounded-2xl border bg-muted/30 p-6 space-y-6 sticky top-24">
            <h2 className="text-xl font-bold tracking-tight">Order Summary</h2>

            <ul className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative h-16 w-12 flex-shrink-0 rounded bg-muted overflow-hidden border">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold line-clamp-1 italic">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold tabular-nums italic">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest italic">
                  Free
                </span>
              </div>
              <div className="flex justify-between font-extrabold text-xl pt-2 border-t border-muted-foreground/10">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-xl flex gap-3 items-center">
              <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-[10px] font-medium leading-relaxed italic text-muted-foreground">
                Items are held for 30 minutes to ensure availability. Complete
                your purchase now to secure your books.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
