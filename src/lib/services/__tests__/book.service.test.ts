import { BookService } from "../book.service";
import prisma from "@/lib/db";

// Mock prisma
jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    book: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
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

  it("should return a single book by id", async () => {
    const mockBook = {
      id: 7,
      title: "Dune",
      author: "Frank Herbert",
      price: 14.99,
      cover: "/dune.jpg",
      description: "Desert planet.",
      isbn: "978-0",
    };
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(mockBook);

    const result = await BookService.getById(7);

    expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 7 } });
    expect(result).toEqual(mockBook);
  });

  it("should return null when no book matches id", async () => {
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await BookService.getById(99999);

    expect(prisma.book.findUnique).toHaveBeenCalledWith({
      where: { id: 99999 },
    });
    expect(result).toBeNull();
  });
});
