import { api, setAuthToken, logResponse, testData } from '../setup.js';

export default async function profileUpdateScenario() {
  console.log('🧪 Testing user profile updates...');

  // PART 1: Update Reader Profile
  console.log('Updating reader profile...');
  setAuthToken(testData.tokens.reader);

  try {
    // Get current reader profile
    const readerProfileResponse = await api.get('/auth/me');
    logResponse('Reader Profile Before Update', readerProfileResponse);

    // Update reader profile
    const readerUpdateData = {
      name: 'John Doe Updated',
      address: {
        street: '456 Book Avenue',
        city: 'Reading',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      phoneNumber: '555-987-6543'
    };

    const readerUpdateResponse = await api.put('/users/profile', readerUpdateData);
    logResponse('Reader Profile Update Response', readerUpdateResponse);

    // Verify reader profile was updated
    const updatedReaderProfileResponse = await api.get('/auth/me');
    logResponse('Reader Profile After Update', updatedReaderProfileResponse);
  } catch (error) {
    console.error('Error updating reader profile:', error.response?.data || error.message);
  }

  // PART 2: Update Librarian Profile
  console.log('Updating librarian profile...');
  setAuthToken(testData.tokens.librarian);

  try {
    // Get current librarian profile
    const librarianProfileResponse = await api.get('/auth/me');
    logResponse('Librarian Profile Before Update', librarianProfileResponse);

    // Update librarian profile
    const librarianUpdateData = {
      name: 'Jane Smith Updated',
      specialty: 'Digital Archives and Rare Books'
    };

    const librarianUpdateResponse = await api.put('/users/profile', librarianUpdateData);
    logResponse('Librarian Profile Update Response', librarianUpdateResponse);

    // Verify librarian profile was updated
    const updatedLibrarianProfileResponse = await api.get('/auth/me');
    logResponse('Librarian Profile After Update', updatedLibrarianProfileResponse);
  } catch (error) {
    console.error('Error updating librarian profile:', error.response?.data || error.message);
  }

  console.log('✅ Profile updates completed');
  return testData;
}
