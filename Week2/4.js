const fs = require('fs');

fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

console.log('Reading file...');
// readFile takes callback function, to run code depending on file reading completion

// Explanation of JavaScript's Execution Model for this code:
 
/*
1. JavaScript Call Stack:
   - JS is single-threaded - it has one call stack and executes code line by line
   - When the script starts, main() is pushed onto the stack
   - fs.readFile() is pushed onto the stack, then popped immediately after it's called

2. Node.js/WebAPIs:
   - The actual file reading happens outside the main JS thread
   - Node.js delegates the file reading operation to libuv (C++ library)
   - This is why JS is "non-blocking" - it doesn't wait for I/O to complete

3. Callback Queue:
   - When file reading completes, the callback function is placed in the "callback queue"
   - The callback waits here until the call stack is empty

4. Event Loop:
   - Constantly checks if the call stack is empty
   - When empty, takes the first callback from the queue and pushes it to the stack
   - This is when our callback with (err, data) finally executes

5. Single-threaded Non-blocking:
   - "Single-threaded": JS itself runs in one thread - one piece of code at a time
   - "Non-blocking": While I/O operations happen externally, JS can continue running other code
   - We don't wait for fs.readFile to complete before moving to next lines
   - This allows handling many operations concurrently without multi-threading
*/
