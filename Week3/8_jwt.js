
const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";
const cors = require("cors");
const app = express();
app.use(cors());
const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
    let trueOrFalse = false;
  ALL_USERS.forEach(element => {
    if (element.username === username && element.password === password) {
        trueOrFalse = true;
    }
    console.log("DEBUG", element.username, element.password);
  });
    return trueOrFalse;
}

app.use(express.json());

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  console.log("TOKEN", token);
  try {
    const decoded = jwt.verify(token, jwtPassword);
    console.log("DECODED", decoded);
    const username = decoded.username;
    console.log("USERNAME", username);
    res.json({
      msg: "Welcome to the users page",
      users: ALL_USERS,
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)