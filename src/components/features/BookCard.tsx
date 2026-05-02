"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { LABELS, ROUTES } from "@/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Book } from "@/types";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface BookCardProps extends Book {
  priority?: boolean;
}

export function AddToCartButton({
  book,
  className,
}: {
  book: Book;
  className?: string;
}) {
  const { addToCart, openCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
    openCart();
  };

  return (
    <Button
      id={`add-to-cart-${book.id}`}
      className={cn(
        "w-full font-semibold transition-all duration-[var(--transition-base)] hover:shadow-md",
        className,
      )}
      aria-label={`${LABELS.ADD_TO_CART}: ${book.title}`}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {LABELS.ADD_TO_CART}
    </Button>
  );
}

export function BookCard({
  id,
  title,
  author,
  price,
  cover,
  priority = false,
  description,
  isbn,
}: BookCardProps) {
  return (
    <Link
      href={`${ROUTES.BOOK_DETAIL}/${id}`}
      className="block group h-full"
      aria-label={`View details for ${title}`}
    >
      <Card className="flex flex-col h-full overflow-hidden transition-all duration-[var(--transition-base)] hover:shadow-xl hover:border-primary/20 bg-background border">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] overflow-hidden bg-muted/30 relative">
            <Image
              src={cover}
              alt={`Cover of ${title}`}
              width={400}
              height={600}
              className="h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-5">
          <h3 className="text-base font-bold leading-tight line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground italic mb-4">
            {LABELS.BY_AUTHOR} {author}
          </p>
          <div className="mt-auto flex items-end justify-between">
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              ${price.toFixed(2)}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <AddToCartButton
            book={{ id, title, author, price, cover, description, isbn }}
          />
        </CardFooter>
      </Card>
    </Link>
  );
}
