import express from "express";
import bookRouter from "./routes/book.mjs";
import db from "./db.mjs";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the book router for /api/books routes
app.use("/api/books", bookRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
