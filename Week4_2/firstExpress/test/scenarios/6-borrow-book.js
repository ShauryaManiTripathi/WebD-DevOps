import { api, setAuthToken, logResponse, testData } from '../setup.js';

export default async function borrowBookScenario() {
  console.log('🧪 Testing borrowing a book as reader...');

  // Set reader token for authorization
  setAuthToken(testData.tokens.reader);

  if (testData.books.length === 0) {
    console.log('No books available to borrow. Please run add-books scenario first.');
    return;
  }

  // Select a book to borrow
  const bookToBorrow = testData.books[0];

  try {
    // Borrow the book
    const borrowResponse = await api.post('/lending', {
      bookId: bookToBorrow._id
    });
    logResponse(`Borrowed Book: ${bookToBorrow.title}`, borrowResponse);

    // Store lending record
    testData.lendings.push(borrowResponse.data.data);

    // Check reader's borrowed books
    const myBooksResponse = await api.get('/lending/my-books');
    logResponse('My Borrowed Books', myBooksResponse);

  } catch (error) {
    console.error(`Error borrowing book ${bookToBorrow.title}:`, error.response?.data || error.message);
  }

  console.log('✅ Borrowing book completed');
  return testData;
}
