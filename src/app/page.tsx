import prisma from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const books = await prisma.book.findMany();

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          BookHaven
        </h1>
        <p className="text-xl text-muted-foreground">
          Curated stories for every reader.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book) => (
          <Card key={book.id} className="flex flex-col overflow-hidden group">
            <CardHeader className="p-0">
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <CardTitle className="line-clamp-2 mb-1">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">
                {book.author}
              </p>
              <div className="mt-auto">
                <span className="text-2xl font-bold">${book.price.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button className="w-full transition-all duration-300 hover:shadow-lg">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground italic">
            No books found. Have you run the seed script?
          </p>
        </div>
      )}
    </main>
  );
}
