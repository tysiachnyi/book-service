import express from 'express';
import bookRouter from './routes/book.js';
import db from './db.js';
const app = express();
const port = 3000;
console.log(db.data); // Log the database content
// Middleware to parse JSON bodies
app.use(express.json());
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
// Use the book router for /api/books routes
app.use('/api/books', bookRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
export default app;
//# sourceMappingURL=app.js.map