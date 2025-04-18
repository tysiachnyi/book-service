import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// Get the current directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Define default data
const defaultData = { books: [] };
// Use JSON file for storage
const file = join(__dirname, '..', 'data', 'books.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, defaultData);
// Initialize the database
async function initDB() {
    await db.read();
    // Use default data if the file is empty
    if (db.data === null) {
        db.data = defaultData;
        await db.write();
    }
}
await initDB();
export default db;
//# sourceMappingURL=db.js.map