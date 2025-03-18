// Callbacks in JavaScript

// **What are Callbacks?**
// In JavaScript, functions are first-class citizens. This means they can be:
// 1. Assigned to variables
// 2. Passed as arguments to other functions
// 3. Returned from other functions

// A callback function is a function that is passed as an argument to another function,
// to be executed at a later time.
// In other words, "Hey, run this function when you are done with your work".

// **Why use Callbacks?**
// Callbacks are fundamental to asynchronous programming in JavaScript.
// They allow us to handle operations that take time (like network requests, file reading, timers)
// without blocking the main thread. This keeps the user interface responsive and prevents the program from freezing.

// **Creating a Callback**

// Step 1: Define a function that will be used as a callback
function callbackFunction(result) {
  console.log("Callback function executed!");
  console.log("Result:", result);
}

// Step 2: Define a function that accepts another function as an argument (this is the 'higher-order' function)
function higherOrderFunction(value, callback) {
  console.log("Starting higher-order function...");
  // Simulate some asynchronous operation (e.g., a timer)
  setTimeout(function() {
    const processedValue = value * 2;
    console.log("Operation complete, calling callback...");
    // Step 3: Execute the callback function, passing it the result of the operation
    callback(processedValue); // Calling the callback function here!
  }, 1000); // Wait for 1 second (1000 milliseconds)
  console.log("Higher-order function continues to execute after initiating the async operation...");
}

// Step 4: Call the higher-order function, passing both a value and the callback function
console.log("Calling higherOrderFunction with a callback...");
higherOrderFunction(5, callbackFunction);
console.log("higherOrderFunction call finished, but asynchronous operation is still in progress...");

// **Explanation:**
// 1. `callbackFunction` is a simple function that logs a message and the 'result' it receives.
// 2. `higherOrderFunction` takes two arguments: `value` and `callback`.
// 3. Inside `higherOrderFunction`, `setTimeout` is used to simulate an asynchronous operation that takes 1 second.
// 4. After 1 second, the anonymous function inside `setTimeout` is executed.
// 5. This anonymous function calculates `processedValue` and then calls the `callback` function, passing `processedValue` as an argument.
// 6. When `higherOrderFunction` is called with `higherOrderFunction(5, callbackFunction)`, `callbackFunction` is passed as the `callback` argument.
// 7. Therefore, when `callback(processedValue)` is executed inside `higherOrderFunction`, it is actually `callbackFunction(processedValue)` that gets called.

// **Existing Callback Patterns in JavaScript**

// 1. **Event Handlers:**
//    - DOM events (like 'click', 'mouseover', 'load') use callbacks.
//    - You provide a function to be executed when a specific event occurs.

// document.addEventListener('click', function() {
//   console.log("Document clicked!"); // This is a callback function
// });

// 2. **Timers:**
//    - `setTimeout` and `setInterval` use callbacks.
//    - You provide a function to be executed after a delay or at intervals.

setTimeout(function() {
  console.log("This will run after 2 seconds"); // This is a callback function
}, 2000);

// 3. **AJAX (Asynchronous JavaScript and XML) / Fetch API:**
//    - Used for making network requests. Callbacks (or Promises, which are built upon callbacks) handle the response.

// Example using Fetch API (Promises, which are based on callback concepts):
fetch('https://api.ipify.org?format=json')
  .then(function(response) { // This is a callback within a Promise
    return response.json();
  })
  .then(function(data) { // Another callback
    console.log("Data received:", data);
  });

// 4. **Node.js Style Callbacks (Error-First Callbacks):**
//    - In Node.js, asynchronous functions often follow a pattern where the callback is the last argument,
//      and the first argument of the callback is reserved for an error object or null if there's no error.

// Example: Reading a file in Node.js (This example will not run directly in the browser environment)
/*
const fs = require('fs'); // Node.js file system module

fs.readFile('example.txt', 'utf8', function(err, data) { // Error-first callback
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data);
});
*/

// **Benefits of Callbacks:**
// - **Non-blocking Asynchronous Operations:**  Keeps the program responsive.
// - **Flexibility:**  Allows for highly customizable and dynamic behavior.
// - **Foundation for Higher-Level Abstractions:**  Callbacks are the basis for Promises and async/await, which simplify asynchronous code further.

// **Drawbacks of Callbacks (Callback Hell):**
// - **Complexity:**  Nested callbacks can lead to "callback hell" or "pyramid of doom," making code hard to read and maintain.
// - **Error Handling:**  Error handling in nested callbacks can become complex.
// - **Inversion of Control:**  When you pass a callback, you are giving control to another function to execute your code, which can sometimes make reasoning about program flow harder.

// **Modern Alternatives (Promises and Async/Await):**
// Promises and async/await are built on top of callback concepts but provide a more structured and readable way to handle asynchronous operations,
// mitigating many of the drawbacks of "callback hell." However, understanding callbacks is crucial for grasping asynchronous JavaScript fully.

console.log("Script execution finished!");
