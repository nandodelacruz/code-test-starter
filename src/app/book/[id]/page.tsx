import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Truck, BookOpen } from "lucide-react";

import { BookService } from "@/lib/services/book.service";
import { AddToCartButton } from "@/components/features/BookCard";
import { LABELS, ROUTES } from "@/constants";

/** Same as home: metadata + page load the DB; keep build free of Neon/Prisma. */
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const book = await BookService.getById(parseInt(id));

  if (!book) return { title: "Book Not Found" };

  return {
    title: `${book.title} | BookHaven`,
    description:
      book.description || `Read ${book.title} by ${book.author} at BookHaven.`,
  };
}

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  const book = await BookService.getById(parseInt(id));

  if (!book) {
    notFound();
  }

  return (
    <main
      className="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-16"
      style={{ maxWidth: "var(--container-max)" }}
    >
      <Link
        href={ROUTES.HOME}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: Cover */}
        <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-xl overflow-hidden bg-muted shadow-2xl transition-transform hover:scale-[1.02] duration-500">
          <Image
            src={book.cover}
            alt={`Cover of ${book.title}`}
            fill
            priority
            className="object-contain p-4 md:p-8"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right: Details */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground flex items-center gap-2">
              <span className="font-medium text-foreground italic">
                {LABELS.BY_AUTHOR} {book.author}
              </span>
            </p>
            <div className="text-3xl font-bold text-primary">
              ${book.price.toFixed(2)}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-muted/30 border space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <AddToCartButton
                  book={book}
                  className="w-full h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Free express shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure checkout
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {LABELS.DESCRIPTION}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {book.description}
            </p>
          </div>

          {book.isbn && (
            <div className="pt-4 border-t flex gap-8 text-sm">
              <div>
                <span className="text-muted-foreground block mb-1 uppercase tracking-wider text-[10px] font-bold">
                  {LABELS.ISBN}
                </span>
                <span className="font-mono font-medium">{book.isbn}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1 uppercase tracking-wider text-[10px] font-bold">
                  Category
                </span>
                <span className="font-medium">Classic Literature</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
