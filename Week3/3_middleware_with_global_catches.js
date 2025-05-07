const express = require("express");

const app = express();

// Error handling for JSON parsing
app.use(express.json());// .json has its own parameters.

app.get('/',(req, res) => {
    const kidneys = req.body.kidneys;
    const kidneyslength = kidneys.length;
    res.status(200).json({ message: `You have ${kidneyslength} kidneys` });
}
);
// It has 4 parameters, called error handling middlewares.
// express recognizes this as special error handling middleware.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
// ! this middleware, is godlike, in end of the day, it checks for errors
// ? suppose we didnt use this, then we have our own normal function validator,handler, but what if app.use(express.json()) itself fails

// ! Here global catch for errors is added.
// ! This will catch any error thrown in the middleware or route handlers.
// ! This is a global error handler.
app.listen(3000);

