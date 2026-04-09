export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
};

export const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10,
    cover: "/images/gatsby.jpg",
  },
  {
    id: 2,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 12,
    cover: "/images/catcher.jpg",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 15,
    cover: "/images/mockingbird.jpg",
  },
];
