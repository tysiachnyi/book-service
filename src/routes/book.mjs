import express from "express";
import db from "../db.mjs";
import validateBookSchema from "./validation.mjs";

const router = express.Router();

// GET all books
router.get("/", (req, res) => {
  res.json({ message: db.data });
});

// GET single book by id
router.get("/:id", (req, res) => {
  try {
    const { books } = db.data;

    const response = books.find((book) => +book.id === +req.params.id);
    if (!response) throw Error("Not Found");
    res.status(200).json({ book: response });
  } catch {
    res.status(404).json({ book: "Not found" });
  }
});

// POST single book by id
router.post("/", async (req, res) => {
  const body = req.body;

  const validation = validateBookSchema(body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const { books } = db.data;

    const hasBook = books.find((book) => +book.id === +body.id);
    if (hasBook) {
      return res
        .status(409)
        .json({ error: "Book with this ID already exists" });
    }

    books.push(body);
    db.data = { books };
    await db.write();
    res.status(201).json({ message: "Book added successfully", book: body });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { books } = db.data;

    const hasBook = books.find((book) => +book.id === +req.params.id);
    if (!hasBook) {
      return res.status(409).json({ error: "Book with this ID didn't exists" });
    }

    const filteredBooks = books.filter((book) => +book.id !== +req.params.id);
    db.data = { filteredBooks };
    await db.write();
    res
      .status(201)
      .json({ message: "Book removed successfully", books: filteredBooks });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
