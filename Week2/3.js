// 1. Callbacks done


// 2. Async Functions

// A callback function is a function that is passed as an argument to another function,

// A Async function is a function that returns a promise. It can be created using the async keyword.

// My JS code doesnt has to do anything instantly, to improve responsiveness and performance, I can use async functions.
// which basically means that the function will return a promise, and the resolve value of the promise will be whatever the function returns.
// the function call is slowed and prolonged, the function will return a promise that will resolve with the return value of the function.

// types of long running operations:
// 1. Network requests
// 2. File system operations
// 3. Database operations
// 4. setTimeout
// 5. setInterval
// 6. Promises
// 7. async functions

// async functions are a way to handle asynchronous code in a more synchronous way.

const readline = require('readline');

// Simulate network delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Example data fetching function
async function fetchData(id) {
  await delay(1000); // Simulate network delay
  if (id < 0) throw new Error("ID cannot be negative");
  return { id, name: `Item ${id}`, timestamp: Date.now() };
}

// CALLBACKS
function callbackExample() {
  console.log("🔄 Callback example running...");
  
  function getUserData(id, callback) {
    console.log("Fetching user data...");
    setTimeout(() => {
      if (id < 0) {
        callback(new Error("Invalid ID"), null);
        return;
      }
      callback(null, { id, name: `User ${id}` });
    }, 1500);
  }
  
  // Callback hell example
  getUserData(1, (error, user) => {
    if (error) {
      console.error("Error:", error.message);
      return;
    }
    
    console.log("User data:", user);
    
    getUserData(2, (error, secondUser) => {
      if (error) {
        console.error("Error:", error.message);
        return;
      }
      
      console.log("Second user data:", secondUser);
      
      // Third nested call
      getUserData(3, (error, thirdUser) => {
        if (error) {
          console.error("Error:", error.message);
          return;
        }
        
        console.log("Third user data:", thirdUser);
        console.log("✅ Callback sequence complete");
      });
    });
  });
}

// PROMISES
async function promiseExample() {
  console.log("🔄 Promise example running...");
  
  function getUserData(id) {
    return new Promise((resolve, reject) => {
      console.log(`Fetching user ${id}...`);
      setTimeout(() => {
        if (id < 0) {
          reject(new Error("Invalid ID"));
        } else {
          resolve({ id, name: `User ${id}` });
        }
      }, 1000);
    });
  }
  
  // Promise chaining
  getUserData(1)
    .then(user => {
      console.log("First user:", user);
      return getUserData(2); // Return a new promise
    })
    .then(user => {
      console.log("Second user:", user);
      return getUserData(3);
    })
    .then(user => {
      console.log("Third user:", user);
      console.log("✅ Promise chain complete");
    })
    .catch(error => {
      console.error("❌ Error in promise chain:", error.message);
    });
    
  // Wait for promises to complete
  await delay(4000);
  
  // Promise.all example
  console.log("\nRunning Promise.all example...");
  try {
    const usersPromise = await Promise.all([
      getUserData(4),
      getUserData(5),
      getUserData(6)
    ]);
    console.log("All users loaded concurrently:", usersPromise);
    console.log("✅ Promise.all complete");
  } catch (error) {
    console.error("❌ Error in Promise.all:", error.message);
  }
}

// ASYNC/AWAIT
async function asyncAwaitExample() {
  console.log("🔄 Async/Await example running...");
  
  try {
    console.log("Starting sequential data fetching...");
    
    const user1 = await fetchData(101);
    console.log("User 1:", user1);
    
    const user2 = await fetchData(102);
    console.log("User 2:", user2);
    
    const user3 = await fetchData(103);
    console.log("User 3:", user3);
    
    console.log("✅ Sequential async/await complete");
    
    // Parallel execution with async/await
    console.log("\nStarting parallel data fetching...");
    const [product1, product2, product3] = await Promise.all([
      fetchData(201),
      fetchData(202),
      fetchData(203)
    ]);
    
    console.log("Products fetched in parallel:");
    console.log("- Product 1:", product1);
    console.log("- Product 2:", product2);
    console.log("- Product 3:", product3);
    console.log("✅ Parallel async/await complete");
    
  } catch (error) {
    console.error("❌ Error in async/await example:", error.message);
  }
}

// ERROR HANDLING
async function errorHandlingExample() {
  console.log("🔄 Error handling examples running...");
  
  // Promise error handling
  console.log("\n1. Promise error handling:");
  fetchData(-1)
    .then(data => console.log("This won't run"))
    .catch(error => console.error("  ❌ Caught with .catch():", error.message));
  
  await delay(1500);
  
  // Async/await try/catch
  console.log("\n2. Async/await error handling:");
  try {
    const data = await fetchData(-2);
    console.log("This won't run");
  } catch (error) {
    console.error("  ❌ Caught with try/catch:", error.message);
  }
  
  await delay(1500);
  
  // Error in Promise.all
  console.log("\n3. Error in Promise.all:");
  try {
    const results = await Promise.all([
      fetchData(1),
      fetchData(-3),  // Will throw
      fetchData(3)
    ]);
    console.log("This won't run");
  } catch (error) {
    console.error("  ❌ Promise.all failed:", error.message);
  }
  
  await delay(1500);
  
  // Promise.allSettled (handling mixed success/failure)
  console.log("\n4. Using Promise.allSettled:");
  const results = await Promise.allSettled([
    fetchData(4),
    fetchData(-5),  // Will throw
    fetchData(6)
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`  ✅ Task ${index + 1} succeeded:`, result.value);
    } else {
      console.log(`  ❌ Task ${index + 1} failed:`, result.reason.message);
    }
  });
}

// ADVANCED PATTERNS
async function advancedPatternsExample() {
  console.log("🔄 Advanced async patterns example running...");
  
  // 1. Timeout pattern
  console.log("\n1. Request with timeout pattern:");
  
  async function fetchWithTimeout(id, timeoutMs) {
    return Promise.race([
      fetchData(id),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs)
      )
    ]);
  }
  
  try {
    // This would succeed (timeout is longer than fetch time)
    const data = await fetchWithTimeout(42, 2000);
    console.log("  ✅ Data fetched successfully:", data);
    
    // This would timeout (we use delay to simulate slow operation)
    console.log("\n  Attempting fetch with short timeout:");
    const slowFetch = Promise.race([
      delay(2000).then(() => ({ id: 43, name: "Slow Item" })),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error(`Request timed out after 1000ms`)), 1000)
      )
    ]);
    
    await slowFetch;
  } catch (error) {
    console.error("  ❌ Fetch failed:", error.message);
  }
  
  await delay(500);
  
  // 2. Retry pattern
  console.log("\n2. Retry pattern:");
  
  async function fetchWithRetry(id, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`  Attempt ${attempt}/${maxRetries}...`);
        
        // For demo purposes, fail on first attempts
        if (attempt < maxRetries) {
          throw new Error("Simulated network error");
        }
        
        const data = await fetchData(id);
        console.log(`  ✅ Succeeded on attempt ${attempt}`);
        return data;
      } catch (error) {
        lastError = error;
        console.error(`  ❌ Attempt ${attempt} failed:`, error.message);
        
        if (attempt < maxRetries) {
          // Wait longer between each retry (exponential backoff)
          const delay = Math.pow(2, attempt) * 500;
          console.log(`  Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
  }
  
  try {
    const data = await fetchWithRetry(99);
    console.log("  Final result:", data);
  } catch (error) {
    console.error("  ❌ All retries failed:", error.message);
  }
}

// MAIN MENU
async function showMainMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.clear();
  console.log("=".repeat(50));
  console.log("       JAVASCRIPT ASYNCHRONOUS PROGRAMMING DEMO       ");
  console.log("=".repeat(50));
  console.log("\nChoose an example to run:");
  console.log("1. Callbacks and Callback Hell");
  console.log("2. Promises and Promise Chaining");
  console.log("3. Async/Await Patterns");
  console.log("4. Error Handling Strategies");
  console.log("5. Advanced Async Patterns");
  console.log("6. View Detailed Notes");
  console.log("0. Exit");
  
  rl.question("\nEnter option number: ", async (answer) => {
    rl.close();
    console.clear();
    
    switch(answer) {
      case '1':
        await callbackExample();
        break;
      case '2':
        await promiseExample();
        break;
      case '3':
        await asyncAwaitExample();
        break;
      case '4':
        await errorHandlingExample();
        break;
      case '5':
        await advancedPatternsExample();
        break;
      case '6':
        showNotes();
        break;
      case '0':
        console.log("Exiting demo. Goodbye!");
        return;
      default:
        console.log("Invalid option. Please try again.");
    }
    
    console.log("\nPress Enter to return to menu...");
    await new Promise(resolve => {
      const tempRl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      tempRl.question("", () => {
        tempRl.close();
        resolve();
      });
    });
    
    await showMainMenu();
  });
}

function showNotes() {
  console.log("=".repeat(70));
  console.log("                 ASYNC JAVASCRIPT DETAILED NOTES                 ");
  console.log("=".repeat(70));
  
  console.log(`
CALLBACKS
---------
Callbacks are functions passed as arguments to other functions, to be executed
after an operation completes.

Characteristics:
- Oldest asynchronous pattern in JavaScript
- Can lead to "callback hell" (nested callbacks)
- Difficult error handling (error-first pattern)

Example:
\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback(null, "Data");  // Error-first pattern
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});
\`\`\`

PROMISES
--------
Promises represent future values or failures of asynchronous operations.

States:
- Pending: Initial state
- Fulfilled: Operation completed successfully
- Rejected: Operation failed

Key methods:
- then(): Handle success cases
- catch(): Handle errors
- finally(): Execute code regardless of outcome

Static methods:
- Promise.all(): Wait for all promises to complete
- Promise.race(): Wait for the first promise to complete
- Promise.allSettled(): Get results of all promises, regardless of success/failure
- Promise.any(): Get the first fulfilled promise

Example:
\`\`\`javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    // Async operation
    if (success) {
      resolve(data);
    } else {
      reject(error);
    }
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

ASYNC/AWAIT
-----------
Syntactic sugar over promises, making async code look synchronous.

Characteristics:
- More readable than promise chains
- Uses try/catch for error handling
- Always returns a promise
- Must use 'async' keyword for functions using 'await'

Example:
\`\`\`javascript
async function getData() {
  try {
    const result = await fetchData();
    return result;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

ERROR HANDLING
-------------
1. Promise-based:
   - Use .catch() at the end of chains
   - Each .then() can have a second error handler argument

2. Async/Await:
   - Use try/catch blocks
   - Can handle multiple await statements in one try/catch

ADVANCED PATTERNS
----------------
1. Timeout pattern:
   - Use Promise.race() with a timeout promise
   - Prevents operations from hanging indefinitely

2. Retry pattern:
   - Implement exponential backoff
   - Set maximum retry attempts

3. Concurrent operations:
   - Use Promise.all() for operations that can run in parallel
   - Use sequential await for dependent operations

BEST PRACTICES
-------------
1. Always handle promise rejections and errors
2. Avoid mixing callbacks with promises/async
3. Use meaningful variable names for promises
4. Avoid deeply nested promise chains
5. Prefer async/await for readability
6. Return promises from functions for better composition
7. Use Promise.all() for concurrent operations
8. Add proper timeout handling for external API calls
`);
}

// Start the demo
showMainMenu();