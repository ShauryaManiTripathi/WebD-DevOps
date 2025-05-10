import { api, setAuthToken, logResponse, testData } from '../setup.js';

export default async function browseBooksScenario() {
  console.log('🧪 Testing browsing books as reader...');

  // Set reader token for authorization (optional for public routes)
  setAuthToken(testData.tokens.reader);

  // Test 1: Get all books
  const getAllResponse = await api.get('/books');
  logResponse('Get All Books', getAllResponse);

  // Test 2: Search for a book by term
  const searchTerm = 'fiction';
  const searchResponse = await api.get(`/books?search=${searchTerm}`);
  logResponse(`Search Books for "${searchTerm}"`, searchResponse);

  // Test 3: Filter by genre
  const genre = 'Classic';
  const genreResponse = await api.get(`/books?genre=${genre}`);
  logResponse(`Filter Books by Genre "${genre}"`, genreResponse);

  // Test 4: Filter by availability
  const availabilityResponse = await api.get('/books?available=true');
  logResponse('Filter Available Books', availabilityResponse);

  // Test 5: Get a single book
  if (testData.books.length > 0) {
    const singleBookResponse = await api.get(`/books/${testData.books[0]._id}`);
    logResponse(`Get Single Book: ${testData.books[0].title}`, singleBookResponse);
  }

  console.log('✅ Browsing books completed');
  return testData;
}
