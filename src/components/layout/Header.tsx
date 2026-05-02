"use client";

import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { ROUTES, SITE, LABELS } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
  visible?: boolean;
}

export function Header({
  onSearch,
  searchQuery = "",
  visible = false,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ease-in-out",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div
        className="mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: "var(--container-max)" }}
      >
        {/* Logo */}
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-80"
        >
          <span className="text-base sm:text-lg font-bold tracking-tight">
            {SITE.NAME}
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder={SITE.SEARCH_PLACEHOLDER}
              className="pl-9 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              aria-label="Search books"
            />
          </div>
        </div>

        {/* Cart */}
        <Link href={ROUTES.CART} className="shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`${LABELS.CART} (0 items)`}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
