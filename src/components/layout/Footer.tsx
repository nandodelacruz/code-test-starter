import Link from "next/link";

import { FooterCartLink } from "@/components/layout/FooterCartLink";
import { ROUTES, SITE } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div
        className="mx-auto flex flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <p className="text-sm text-muted-foreground">{SITE.FOOTER_TEXT}</p>

        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <Link
            href={ROUTES.HOME}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <FooterCartLink />
        </nav>
      </div>
    </footer>
  );
}
