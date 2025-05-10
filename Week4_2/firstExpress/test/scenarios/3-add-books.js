import { api, setAuthToken, logResponse, testData } from '../setup.js';

export default async function addBooksScenario() {
  console.log('🧪 Testing adding books as librarian...');

  // Set librarian token for authorization
  setAuthToken(testData.tokens.librarian);

  // Prepare sample books
  const books = [
    {
      isbn: '9780451524935',
      title: '1984',
      author: 'George Orwell',
      publishedYear: 1949,
      genre: ['Fiction', 'Dystopian'],
      description: 'A dystopian novel about a totalitarian regime.',
      copies: 5,
      availableCopies: 5,
      location: {
        section: 'Fiction',
        shelf: 'A',
        position: '12'
      }
    },
    {
      isbn: '9780061120084',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedYear: 1960,
      genre: ['Fiction', 'Coming-of-age', 'Legal'],
      description: 'The story of racial injustice and loss of innocence in the American South.',
      copies: 3,
      availableCopies: 3,
      location: {
        section: 'Fiction',
        shelf: 'B',
        position: '5'
      }
    },
    {
      isbn: '9780141439518',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publishedYear: 1813,
      genre: ['Fiction', 'Romance', 'Classic'],
      description: 'A romantic novel of manners.',
      copies: 4,
      availableCopies: 4,
      location: {
        section: 'Classic',
        shelf: 'C',
        position: '7'
      }
    }
  ];

  // Add books one by one
  for (const bookData of books) {
    try {
      const response = await api.post('/books', bookData);
      logResponse(`Added Book: ${bookData.title}`, response);
      
      // Store the book ID
      testData.books.push(response.data.data);
    } catch (error) {
      console.error(`Error adding book ${bookData.title}:`, error.response?.data || error.message);
    }
  }

  // Get all books to verify
  const getAllResponse = await api.get('/books');
  logResponse('Get All Books', getAllResponse);

  console.log('✅ Adding books completed');
  return testData;
}
