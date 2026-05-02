import { GET } from "../route";
import { BookService } from "@/lib/services/book.service";
import { NextRequest } from "next/server";

// Mock the BookService
jest.mock("@/lib/services/book.service", () => ({
  BookService: {
    list: jest.fn(),
  },
}));

// Mock next/server
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body, init) => ({
      json: async () => body,
      status: init?.status ?? 200,
    })),
  },
}));

describe("GET /api/books", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call BookService.list with no query when no query parameter is provided", async () => {
    const mockBooks = [{ id: 1, title: "Book 1" }];
    (BookService.list as jest.Mock).mockResolvedValue(mockBooks);

    const req = {
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    } as unknown as NextRequest;
    const res = await GET(req);
    const json = await res.json();

    expect(BookService.list).toHaveBeenCalledWith(undefined);
    expect(res.status).toBe(200);
    expect(json).toEqual(mockBooks);
  });

  it("should call BookService.list with the query parameter", async () => {
    const mockBooks = [{ id: 2, title: "Harry Potter" }];
    (BookService.list as jest.Mock).mockResolvedValue(mockBooks);

    const req = {
      nextUrl: {
        searchParams: new URLSearchParams({ query: "Harry" }),
      },
    } as unknown as NextRequest;
    const res = await GET(req);
    const json = await res.json();

    expect(BookService.list).toHaveBeenCalledWith("Harry");
    expect(res.status).toBe(200);
    expect(json).toEqual(mockBooks);
  });

  it("should return 500 when BookService throws an error", async () => {
    // Silence console.error for this test
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (BookService.list as jest.Mock).mockRejectedValue(new Error("DB Error"));

    const req = {
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    } as unknown as NextRequest;
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json).toEqual({ error: "Internal Server Error" });

    consoleSpy.mockRestore();
  });
});
