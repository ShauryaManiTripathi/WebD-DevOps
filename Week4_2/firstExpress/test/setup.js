import axios from 'axios';

// Base URL for API
const API_URL = 'http://localhost:5000/api';

// Store tokens and IDs for use across tests
export const testData = {
  tokens: {
    librarian: null,
    reader: null
  },
  users: {
    librarian: null,
    reader: null
  },
  books: [],
  lendings: []
};

// Create axios instance with common config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper to set auth token for requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Helper to log API responses
export const logResponse = (title, response) => {
  console.log(`\n=== ${title} ===`);
  console.log(`Status: ${response.status}`);
  console.log('Data:', JSON.stringify(response.data, null, 2));
};

// Helper to pause execution
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to run test scenario
export const runScenario = async (scenarioFn, title) => {
  console.log(`\n=========== STARTING SCENARIO: ${title} ===========\n`);
  try {
    await scenarioFn();
    console.log(`\n=========== COMPLETED SCENARIO: ${title} ===========\n`);
  } catch (error) {
    console.error(`\n⚠️ ERROR IN SCENARIO: ${title}`);
    console.error(error.response?.data || error.message);
    console.log(`\n=========== FAILED SCENARIO: ${title} ===========\n`);
  }
};
