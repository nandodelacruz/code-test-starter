import { BookService } from "../book.service";
import prisma from "@/lib/db";

// Mock prisma
jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    book: {
      findMany: jest.fn(),
    },
  },
}));

// Mock next/cache
jest.mock("next/cache", () => ({
  unstable_cache: <T>(cb: T) => cb,
}));

describe("BookService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all books when query is empty", async () => {
    const mockBooks = [{ id: 1, title: "Book 1", author: "Author 1" }];
    (prisma.book.findMany as jest.Mock).mockResolvedValue(mockBooks);

    const result = await BookService.list();

    expect(prisma.book.findMany).toHaveBeenCalledWith();
    expect(result).toEqual(mockBooks);
  });

  it("should ignore whitespace queries and return all books", async () => {
    await BookService.list("   ");
    expect(prisma.book.findMany).toHaveBeenCalledWith();
  });

  it("should search books by title or author when query is provided", async () => {
    const mockBooks = [
      { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
    ];
    (prisma.book.findMany as jest.Mock).mockResolvedValue(mockBooks);

    const result = await BookService.list("Harry");

    expect(prisma.book.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          {
            title: {
              contains: "Harry",
              mode: "insensitive",
            },
          },
          {
            author: {
              contains: "Harry",
              mode: "insensitive",
            },
          },
        ],
      },
    });
    expect(result).toEqual(mockBooks);
  });
});
