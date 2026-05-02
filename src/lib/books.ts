export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
};

export const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.0,
    cover: "https://m.media-amazon.com/images/I/51Bm6JUCscL._SY522_.jpg",
  },
  {
    id: 2,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 12.0,
    cover: "https://m.media-amazon.com/images/I/61cfToP7pgL._SL1500_.jpg",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 15.0,
    cover: "https://m.media-amazon.com/images/I/51lVvSDLQJL._SY522_.jpg",
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    price: 11.5,
    cover: "https://m.media-amazon.com/images/I/61ZewDE3beL._SL1200_.jpg",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 9.0,
    cover: "https://m.media-amazon.com/images/I/71Q1tPupKjL._SL1500_.jpg",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 14.0,
    cover: "https://m.media-amazon.com/images/I/71jD4jMityL._SL1500_.jpg",
  },
  {
    id: 7,
    title: "Brave New World",
    author: "Aldous Huxley",
    price: 13.0,
    cover: "https://m.media-amazon.com/images/I/81zE42gT3xL._SL1500_.jpg",
  },
  {
    id: 8,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    price: 10.5,
    cover: "https://m.media-amazon.com/images/I/61l8LHt4MeL._SL1500_.jpg",
  },
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 12.5,
    cover: "https://m.media-amazon.com/images/I/61HAE8zahLL._SL1500_.jpg",
  },
  {
    id: 10,
    title: "Dune",
    author: "Frank Herbert",
    price: 16.0,
    cover: "https://m.media-amazon.com/images/I/81ym3QUd3KL._SL1500_.jpg",
  },
];
