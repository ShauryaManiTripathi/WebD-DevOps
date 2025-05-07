const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";
const cors = require("cors");

mongoose.connect(
  "mongodb://admin:passwd@localhost:27017/userappnew?authSource=admin",
);

const User = mongoose.model("User", {
  name: String,
  username: {
    type: String,
    unique: true,
  },
  pasword: String,
});
// print all user in the database
User.find({}).then((users) => {
  console.log("USERS", users);
});
// find a user with username raman@gmail.com and password 123321
// log it
User.find({username: 'raman@gmail.com', password: '123321'}).then((user) => {
    console.log("USER found", user);
});
const app = express();
app.use(cors());
app.use(express.json());

async function userExists(username,password){
    const user = await User.findOne({ username: username, password: password });
    if (user) {
        return true;
    } else {
        return false;
    }
}

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log("username", username, password);
  console.log("result", userExists(username, password));
  if (!await userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }
  console.log("cred", username, password);
  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username from the database
    User.find({ username: { $ne: username } }).then((users) => {
      return res.json(users);
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);