// Import Express and initialize the app
const express = require('express');
const app = express();
const port = 3000;

// Built-in middleware for parsing JSON payloads
app.use(express.json());

// --- Application-Level Middleware ---

// Logger middleware: logs current time, HTTP method, and URL
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware to add requestTime property to the req object
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

// --- Routes ---

// GET route at the root ('/') that shows a greeting and the request time
app.get('/', (req, res) => {
  res.send(`Hello World!<br>Requested at: ${new Date(req.requestTime).toLocaleString()}`);
});

// GET route with a query string, e.g. /search?q=express
app.get('/search', (req, res) => {
  const q = req.query.q || 'none';
  res.send(`Search query: ${q}`);
});

// GET route with a route parameter, e.g. /user/123
app.get('/user/:id', (req, res, next) => {
  console.log('User ID:', req.params.id);
  // Simulate an error if user id is '0'
  if (req.params.id === '0') {
    return next(new Error('Invalid user id'));
  }
  res.send(`User ID: ${req.params.id}`);
});

// POST route to simulate receiving data
app.post('/submit', (req, res) => {
  res.send(`Data received: ${JSON.stringify(req.body)}`);
});

// PUT route to simulate updating data
app.put('/update', (req, res) => {
  res.send('Data updated successfully!');
});

// DELETE route to simulate deleting a resource
app.delete('/delete', (req, res) => {
  res.send('Resource deleted successfully!');
});

// Route that explicitly triggers an error
app.get('/error', (req, res, next) => {
  next(new Error('This is a forced error.'));
});

// --- 404 Catch-All Route ---
app.use((req, res, next) => {
  res.status(404).send('404: Not Found');
});

// --- Error Handling Middleware ---
// This middleware handles errors passed via next(err)
app.use((err, req, res, next) => {
  console.error('Error encountered:', err.message);
  res.status(500).send(`Error: ${err.message}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
