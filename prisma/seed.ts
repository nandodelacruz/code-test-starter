import { PrismaClient } from "@prisma/client";
import { books } from "../src/lib/books";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");
  for (const b of books) {
    const book = await prisma.book.upsert({
      where: { id: b.id },
      update: {
        title: b.title,
        author: b.author,
        price: b.price,
        cover: b.cover,
        description: b.description,
        isbn: b.isbn,
      },
      create: {
        id: b.id,
        title: b.title,
        author: b.author,
        price: b.price,
        cover: b.cover,
        description: b.description,
        isbn: b.isbn,
      },
    });
    console.log(`Created book with id: ${book.id}`);
  }
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
