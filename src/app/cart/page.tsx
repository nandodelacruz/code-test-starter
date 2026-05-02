import type { Metadata } from "next";

import { CartPageContent } from "@/components/features/CartPageContent";
import { SITE, LABELS } from "@/constants";

export const metadata: Metadata = {
  title: `${LABELS.CART} — ${SITE.NAME}`,
  description: "Review the books in your cart and proceed to checkout.",
};

export default function CartPage() {
  return <CartPageContent />;
}
