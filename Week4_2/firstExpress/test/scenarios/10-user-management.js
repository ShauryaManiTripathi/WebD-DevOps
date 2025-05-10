import { api, setAuthToken, logResponse, testData } from '../setup.js';

export default async function userManagementScenario() {
  console.log('🧪 Testing user management as librarian...');

  // Set librarian token for authorization
  setAuthToken(testData.tokens.librarian);

  try {
    // List all users (should include both librarians and readers)
    const allUsersResponse = await api.get('/users');
    logResponse('All Users', allUsersResponse);

    // Filter users by role
    const readersResponse = await api.get('/users?role=reader');
    logResponse('Readers Only', readersResponse);

    const librariansResponse = await api.get('/users?role=librarian');
    logResponse('Librarians Only', librariansResponse);

    // Filter users by type
    const readersTypeResponse = await api.get('/users?userType=Reader');
    logResponse('Reader User Type', readersTypeResponse);

    const librariansTypeResponse = await api.get('/users?userType=Librarian');
    logResponse('Librarian User Type', librariansTypeResponse);

    // Get specific user details
    const readerUserId = testData.users.reader.id;
    const userDetailsResponse = await api.get(`/users/${readerUserId}`);
    logResponse('Specific User Details', userDetailsResponse);

    // Get lending history for specific user
    const lendingResponse = await api.get(`/lending?reader=${readerUserId}`);
    logResponse('User Lending History', lendingResponse);

  } catch (error) {
    console.error('Error in user management:', error.response?.data || error.message);
  }

  console.log('✅ User management completed');
  return testData;
}
