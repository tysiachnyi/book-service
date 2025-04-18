import express, { Express, Request, Response } from "express";
import bookRouter from "./routes/book.js";
import db from "./db.js";

const app: Express = express();
const port: number = 3000;

console.log(db.data); // Log the database content

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

// Use the book router for /api/books routes
app.use("/api/books", bookRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
