import { runScenario } from './setup.js';

// Import all scenarios
import librarianSignupScenario from './scenarios/1-librarian-signup.js';
import readerSignupScenario from './scenarios/2-reader-signup.js';
import addBooksScenario from './scenarios/3-add-books.js';
import updateBookScenario from './scenarios/4-update-book.js';
import browseBooksScenario from './scenarios/5-browse-books.js';
import borrowBookScenario from './scenarios/6-borrow-book.js';
import returnBookScenario from './scenarios/7-return-book.js';
import overdueSimulationScenario from './scenarios/8-overdue-simulation.js';
import profileUpdateScenario from './scenarios/9-profile-update.js';
import userManagementScenario from './scenarios/10-user-management.js';
import cleanupScenario from './scenarios/11-cleanup.js';

// Run all scenarios in sequence
(async () => {
  console.log('🚀 Starting Library Management System Test Scenarios');
  
  try {
    // Authentication scenarios
    await runScenario(librarianSignupScenario, 'Librarian Signup');
    await runScenario(readerSignupScenario, 'Reader Signup');
    
    // Book management scenarios
    await runScenario(addBooksScenario, 'Add Books');
    await runScenario(updateBookScenario, 'Update Book');
    await runScenario(browseBooksScenario, 'Browse Books');
    
    // Lending scenarios
    await runScenario(borrowBookScenario, 'Borrow Book');
    await runScenario(returnBookScenario, 'Return Book');
    await runScenario(overdueSimulationScenario, 'Overdue Book Simulation');
    
    // User scenarios
    await runScenario(profileUpdateScenario, 'Update User Profiles');
    await runScenario(userManagementScenario, 'User Management');
    
    // Database cleanup
    await runScenario(cleanupScenario, 'Database Cleanup');
    
    console.log('✨ All test scenarios completed successfully!');
  } catch (error) {
    console.error('❌ Error running scenarios:', error);
  }
})();
