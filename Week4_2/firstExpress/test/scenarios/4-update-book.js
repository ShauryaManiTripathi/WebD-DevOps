import { api, setAuthToken, logResponse, testData } from '../setup.js';

export default async function updateBookScenario() {
  console.log('🧪 Testing updating a book as librarian...');

  // Set librarian token for authorization
  setAuthToken(testData.tokens.librarian);

  if (testData.books.length === 0) {
    console.log('No books available to update. Please run add-books scenario first.');
    return;
  }

  // Get the first book
  const bookToUpdate = testData.books[0];

  // Update book details
  const updatedData = {
    description: `${bookToUpdate.description} Updated with new information.`,
    copies: bookToUpdate.copies + 2,
    availableCopies: bookToUpdate.availableCopies + 2,
    location: {
      ...bookToUpdate.location,
      shelf: 'Z'
    }
  };

  try {
    const response = await api.put(`/books/${bookToUpdate._id}`, updatedData);
    logResponse(`Updated Book: ${bookToUpdate.title}`, response);
    
    // Check if book was updated properly
    const getBookResponse = await api.get(`/books/${bookToUpdate._id}`);
    logResponse('Get Updated Book', getBookResponse);
    
    // Update book in testData
    const updatedIndex = testData.books.findIndex(book => book._id === bookToUpdate._id);
    if (updatedIndex !== -1) {
      testData.books[updatedIndex] = getBookResponse.data.data;
    }
  } catch (error) {
    console.error(`Error updating book ${bookToUpdate.title}:`, error.response?.data || error.message);
  }

  console.log('✅ Updating book completed');
  return testData;
}
