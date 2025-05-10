import { api, logResponse, testData } from '../setup.js';

export default async function readerSignupScenario() {
  console.log('🧪 Testing reader signup and signin...');

  // Step 1: Register a new reader
  const readerData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'reader123',
    userType: 'Reader',
    address: {
      street: '123 Main St',
      city: 'Booktown',
      state: 'TX',
      zipCode: '75001',
      country: 'USA'
    },
    phoneNumber: '555-123-4567'
  };

  // Try signup first, but handle case where user already exists
  try {
    const signupResponse = await api.post('/auth/signup', readerData);
    logResponse('Reader Signup', signupResponse);

    // Store the token
    testData.tokens.reader = signupResponse.data.token;
    testData.users.reader = signupResponse.data.user;
    
    console.log('✅ Reader signup successful');
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

  // Step 2: Sign in with the reader
  try {
    const signinResponse = await api.post('/auth/signin', {
      email: readerData.email,
      password: readerData.password
    });
    logResponse('Reader Signin', signinResponse);

    // Update token with the new one
    testData.tokens.reader = signinResponse.data.token;
    testData.users.reader = signinResponse.data.user;
    
    console.log('✅ Reader signin completed');
  } catch (error) {
    console.error('❌ Signin error:', error.response?.data || error.message);
    throw error;
  }

  return testData;
}
