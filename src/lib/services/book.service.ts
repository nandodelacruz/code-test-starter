import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

export const BookService = {
  list: unstable_cache(
    async (query?: string) => {
      if (!query || query.trim() === "") {
        return prisma.book.findMany();
      }

      const normalised = query.trim();

      return prisma.book.findMany({
        where: {
          OR: [
            {
              title: {
                contains: normalised,
                mode: "insensitive",
              },
            },
            {
              author: {
                contains: normalised,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    },
    ["books-list"],
    {
      revalidate: 3600, // cache for 1 hour
      tags: ["books"],
    },
  ),
};
