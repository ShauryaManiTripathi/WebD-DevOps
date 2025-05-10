import { api, setAuthToken, logResponse, testData, sleep } from '../setup.js';

export default async function returnBookScenario() {
  console.log('🧪 Testing returning a book as reader...');

  // Set reader token for authorization
  setAuthToken(testData.tokens.reader);

  if (testData.lendings.length === 0) {
    console.log('No borrowed books to return. Please run borrow-book scenario first.');
    return;
  }

  // Select a lending to return
  const lendingToReturn = testData.lendings[0];

  // Optional: Sleep to simulate time passing
  console.log('Waiting a moment before returning the book...');
  await sleep(2000);

  try {
    // Return the book
    const returnResponse = await api.put(`/lending/${lendingToReturn._id}/return`);
    logResponse('Return Book', returnResponse);

    // Check reader's borrowed books after return
    const myBooksResponse = await api.get('/lending/my-books');
    logResponse('My Borrowed Books After Return', myBooksResponse);

    // Check if the book's available copies were updated
    const bookResponse = await api.get(`/books/${lendingToReturn.book}`);
    logResponse('Book Availability After Return', bookResponse);

  } catch (error) {
    console.error(`Error returning lending ${lendingToReturn._id}:`, error.response?.data || error.message);
  }

  console.log('✅ Returning book completed');
  return testData;
}
