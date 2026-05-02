"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight, Star } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  // Clear the cart on successful checkout
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[70vh]">
      <div className="relative mb-10">
        <div className="absolute inset-0 scale-150 blur-3xl bg-primary/20 rounded-full animate-pulse" />
        <CheckCircle2 className="h-24 w-24 text-primary relative z-10 animate-in zoom-in duration-700" />
      </div>

      <div className="space-y-4 max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <h1 className="text-4xl font-extrabold tracking-tight italic">
          Thank You!
        </h1>
        <p className="text-xl text-muted-foreground italic font-medium">
          Your order has been placed successfully and will be on its way to your
          library soon.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="font-bold shadow-lg shadow-primary/20 group"
            asChild
          >
            <Link href={ROUTES.HOME}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 flex items-center gap-2 text-muted-foreground animate-in fade-in duration-1000 delay-1000">
        <div className="flex -space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <span className="text-sm font-medium italic">
          Loved by 10,000+ readers
        </span>
      </div>
    </main>
  );
}
