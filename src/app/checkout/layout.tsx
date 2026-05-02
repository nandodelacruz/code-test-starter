import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LABELS, SITE } from "@/constants";

export const metadata: Metadata = {
  title: `${LABELS.CHECKOUT} — ${SITE.NAME}`,
  description: "Review your order and complete your purchase at BookHaven.",
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return children;
}
