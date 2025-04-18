/**
 * Book interface - defines the structure of a book object
 */
export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description?: string;
  tags?: string[];
  genre?: string;
  views?: number;
  rating?: number;
}

/**
 * Database structure interface - defines the structure of our database
 */
export interface DatabaseSchema {
  books: Book[];
}
