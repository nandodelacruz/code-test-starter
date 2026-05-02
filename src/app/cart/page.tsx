import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";

/**
 * Legacy `/cart` URL — the dedicated cart page is deprecated in favour of the
 * sliding cart plus `/checkout`. Keep this redirect for bookmarks and old links.
 */
export default function CartPageRedirect() {
  redirect(ROUTES.CHECKOUT);
}
