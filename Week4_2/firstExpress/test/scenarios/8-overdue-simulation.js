import { api, setAuthToken, logResponse, testData } from '../setup.js';

export default async function overdueSimulationScenario() {
  console.log('🧪 Testing overdue book simulation...');

  // Set appropriate tokens for different operations
  setAuthToken(testData.tokens.librarian);

  if (testData.books.length === 0) {
    console.log('No books available. Please run add-books scenario first.');
    return;
  }

  try {
    // Step 1: As a librarian, create a lending with a past due date
    const bookId = testData.books[1]._id; // Use the second book
    const readerId = testData.users.reader.id;

    // Calculate a past due date (7 days ago)
    const pastDueDate = new Date();
    pastDueDate.setDate(pastDueDate.getDate() - 7);

    // Create lending with manual due date in the past
    const createLendingResponse = await api.post('/lending', {
      bookId,
      readerId,
      dueDate: pastDueDate.toISOString() // This would normally be set by the server
    });
    
    logResponse('Create Overdue Lending', createLendingResponse);
    
    const overdueLending = createLendingResponse.data.data;
    testData.lendings.push(overdueLending);

    // Step 2: Check lending status (should be marked as overdue)
    const lendingResponse = await api.get(`/lending/${overdueLending._id}`);
    logResponse('Overdue Lending Status', lendingResponse);

    // Step 3: Return the book (should calculate fine)
    const returnResponse = await api.put(`/lending/${overdueLending._id}/return`);
    logResponse('Return Overdue Book', returnResponse);

    // Step 4: Check fine details
    const finalLendingResponse = await api.get(`/lending/${overdueLending._id}`);
    logResponse('Final Lending with Fine', finalLendingResponse);

    // Step 5: Pay the fine
    const finePaymentResponse = await api.put(`/lending/${overdueLending._id}/pay-fine`);
    logResponse('Pay Fine', finePaymentResponse);

  } catch (error) {
    console.error('Error in overdue simulation:', error.response?.data || error.message);
  }

  console.log('✅ Overdue book simulation completed');
  return testData;
}
