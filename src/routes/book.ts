import express, { Request, Response } from "express";
import db from "../db.js";
import validateBookSchema from "./validation.js";
import { Book } from "../types/book.js";

const router = express.Router();

// GET all books
router.get("/", (req: Request, res: Response) => {
  if (!db.data) {
    return res.status(500).json({ error: "Database not initialized" });
  }
  res.json({ message: db.data });
});

// GET single book by id
router.get("/:id", (req: Request, res: Response) => {
  try {
    if (!db.data || !db.data.books) {
      throw new Error("Database not initialized");
    }

    const books = db.data.books;
    const response = books.find((book: Book) => +book.id === +req.params.id);

    if (!response) throw new Error("Not Found");
    res.status(200).json({ book: response });
  } catch (error) {
    res.status(404).json({ book: "Not found" });
  }
});

// POST new book
router.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  const validation = validateBookSchema(body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    if (!db.data || !db.data.books) {
      throw new Error("Database not initialized");
    }

    const books = db.data.books;

    const hasBook = books.find((book: Book) => +book.id === +body.id);
    if (hasBook) {
      return res
        .status(409)
        .json({ error: "Book with this ID already exists" });
    }

    // Add book to database
    books.push(body as Book);
    await db.write();
    res.status(201).json({ message: "Book added successfully", book: body });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
});

// DELETE a book by id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (!db.data || !db.data.books) {
      throw new Error("Database not initialized");
    }

    const books = db.data.books;

    const hasBook = books.find((book: Book) => +book.id === +req.params.id);
    if (!hasBook) {
      return res.status(409).json({ error: "Book with this ID doesn't exist" });
    }

    const filteredBooks = books.filter(
      (book: Book) => +book.id !== +req.params.id,
    );
    db.data.books = filteredBooks;
    await db.write();
    res
      .status(200)
      .json({ message: "Book removed successfully", books: filteredBooks });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
