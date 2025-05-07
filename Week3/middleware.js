const express = require("express");

// ? MiddleWare are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.

const app = express();
let count=0;
// ! We will cover Middlewares,authentication,global catches,zod

// * Middlewares does things  , for example ... authentication checking and input validation....

// ! These prechecks can be done right in the function, but it is better to separate them out into middleware functions.

// * there are multiple ways a user can send parameters to the server
// * 1. Query parameters (GET)
// * 2. Body parameters (POST)
// * 3. Headers (GET)

// Lets do something
// Force user to send number n in query parameter , and username,password in header
app.get("/api1", (req, res) => {
  const n = parseInt(req.query.n);
  const username = req.headers.username;
  const password = req.headers.password;
  // Check if n is a number
  if (username == "harkirat" && password == "1234" && !isNaN(n)) {
    res.status(200).json({ message: "success" });
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
});

var login = false;

app.get("/auth", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  // Check if username and password are correct
  // if (username != "harkirat" || password != "1234") is better, as it returns early
  if (username == "harkirat" && password == "1234") {
    res.status(200).json({ message: "success" });
    login = true;
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
});

// ! Since in above both APIs we are checking for username and password, we can create a middleware function to do this, as it violates the DRY principle
// ? DRY - Don't Repeat Yourself

// * Method 1
// Make a function , that validates, made somewhat linear, but still, the function needs to be called in every API

// * Method 2
// Make a middleware function, that can be given as parameter to the api functions

// app apis can take range of functions in input

// * api function can take multiple functions as input

app.get(
  "/api2",
  function (req, res, next) {
    console.log("Hi from func1");
    next();
  },
  function (req, res, next) {
    console.log("Hi from func2");
    res.send("Hello World!");
  }
);

// api.requesttype('path', middleware1, middleware2, middleware3)
// where each of them are functions of param (req, res, next)
// calling next function will call the next middleware function
// * next() is used to call the next middleware function in the stack , if everything is fine in current function

// Middleware for authentication
function authMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  
  if (username === "harkirat" && password === "1234") {
    console.log("Authentication successful");
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized access" });
  }
}

// Middleware for input validation
function validateInput(req, res, next) {
  const n = parseInt(req.query.n);
  
  if (isNaN(n)) {
    return res.status(400).json({ message: "Invalid input: n must be a number" });
  }
  
  req.validatedN = n; // Store validated input for next middleware
  console.log("Input validation successful");
  next();
}

// Middleware for logging
function logRequest(req, res, next) {
  console.log(`Request received at: ${new Date().toISOString()}`);
  console.log(`Endpoint: ${req.path}`);
  next();
}

// API endpoint with multiple middleware functions
app.get("/api-with-middleware", logRequest, authMiddleware, validateInput, (req, res) => {
  // Main handler after all middleware has passed
  res.status(200).json({ 
    message: "All middleware passed successfully",
    value: req.validatedN * 2
  });
});

// ! app.use() is used to register middleware functions that will be executed
// * A middleware via .use is called for every request whiuch is below the .use, regardless of the endpoint
// app.use(express.json()); // Middleware to parse JSON request body
// express.json() is a built-in middleware function in Express that parses incoming requests with JSON payloads
// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request body

// Middleware to track request processing time
function requestTimer(req, res, next) {
  req.startTime = Date.now();
  
  // Override res.send to calculate time before response is sent
  const originalSend = res.send;
  res.send = function(body) {
    const processingTime = Date.now() - req.startTime;
    console.log(`Request to ${req.path} took ${processingTime}ms to process`);
    
    // Add processing time to response headers
    res.set('X-Response-Time', `${processingTime}ms`);
    
    // Call the original send method
    return originalSend.call(this, body);
  };
  
  next();
}

// Global timing middleware for all routes that follow
app.use(requestTimer);

// Example endpoint to demonstrate timing
app.get("/timed-endpoint", (req, res) => {
  // Simulate some processing delay
  count++;
  console.log("Count:", count);
  setTimeout(() => {
    res.status(200).json({
      message: "Request processed successfully",
      processingTimeMs: Date.now() - req.startTime
    });
  }, 500); // 500ms delay
});

// Change the server to listen on all network interfaces
app.listen(3000, '0.0.0.0', () => {
  console.log("Server is running on port 3000");
  console.log("Access from other devices on your network using your IP address");
  console.log(`Example: http://<your-ip-address>:3000`);
});

