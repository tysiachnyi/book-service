import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the current directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use JSON file for storage
const file = join(__dirname, "..", "data", "books.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Initialize the database
async function initDB() {
  await db.read();
}

await initDB();

export default db;
