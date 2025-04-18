import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { DatabaseSchema } from "./types/book.js";

// Get the current directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define default data
const defaultData: DatabaseSchema = { books: [] };

// Use JSON file for storage
const file = join(__dirname, "..", "data", "books.json");
const adapter = new JSONFile<DatabaseSchema>(file);
const db = new Low<DatabaseSchema>(adapter, defaultData);

// Initialize the database
async function initDB(): Promise<void> {
  await db.read();

  // Use default data if the file is empty
  if (db.data === null) {
    db.data = defaultData;
    await db.write();
  }
}

await initDB();

export default db;
