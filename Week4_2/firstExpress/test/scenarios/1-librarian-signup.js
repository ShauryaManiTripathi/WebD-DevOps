import { api, logResponse, testData } from '../setup.js';

export default async function librarianSignupScenario() {
  console.log('🧪 Testing librarian signup and signin...');

  // Step 1: Register a new librarian
  const librarianData = {
    name: 'Jane Smith',
    email: 'jane.smith@library.com',
    password: 'password123',
    userType: 'Librarian',
    employeeId: 'LIB-001',
    department: 'Reference'
  };

  // Try signup first, but handle case where user already exists
  try {
    const signupResponse = await api.post('/auth/signup', librarianData);
    logResponse('Librarian Signup', signupResponse);

    // Store the token
    testData.tokens.librarian = signupResponse.data.token;
    testData.users.librarian = signupResponse.data.user;
    
    console.log('✅ Librarian signup successful');
  } catch (error) {
    // Check if error is because user already exists
    if (error.response?.status === 400 && 
        error.response?.data?.message?.includes('already exists')) {
      console.log('⚠️ User already exists, proceeding to signin...');
    } else {
      // If it's another error, log and rethrow
      console.error('❌ Signup error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Step 2: Sign in with the librarian
  try {
    const signinResponse = await api.post('/auth/signin', {
      email: librarianData.email,
      password: librarianData.password
    });
    logResponse('Librarian Signin', signinResponse);

    // Update token with the new one
    testData.tokens.librarian = signinResponse.data.token;
    testData.users.librarian = signinResponse.data.user;
    
    console.log('✅ Librarian signin completed');
  } catch (error) {
    console.error('❌ Signin error:', error.response?.data || error.message);
    throw error;
  }
  
  return testData;
}
