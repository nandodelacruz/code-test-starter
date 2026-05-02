import Image from "next/image";

import { LABELS } from "@/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Book } from "@/types";

interface BookCardProps extends Book {
  priority?: boolean;
}

export function BookCard({
  title,
  author,
  price,
  cover,
  priority = false,
}: BookCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden group transition-shadow duration-[var(--transition-base)] hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-[2/3] overflow-hidden bg-muted">
          <Image
            src={cover}
            alt={`Cover of ${title}`}
            width={400}
            height={600}
            className="h-full w-full object-contain p-2 transition-transform duration-[var(--transition-slow)] group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 sm:p-5">
        <h3 className="text-base font-semibold leading-tight line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground italic mb-3">
          {LABELS.BY_AUTHOR} {author}
        </p>
        <div className="mt-auto">
          <span className="text-xl font-bold tracking-tight">
            ${price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 sm:p-5 pt-0">
        <Button
          className="w-full font-semibold transition-all duration-[var(--transition-base)] hover:shadow-md"
          aria-label={`${LABELS.ADD_TO_CART}: ${title}`}
        >
          {LABELS.ADD_TO_CART}
        </Button>
      </CardFooter>
    </Card>
  );
}
