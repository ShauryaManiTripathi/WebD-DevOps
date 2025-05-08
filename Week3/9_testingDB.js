const mongoose = require("mongoose");


mongoose.connect("mongodb://admin:passwd@localhost:27017/userappnew?authSource=admin")

// check if connected or not
mongoose.connection.on("connected", function () {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", function (err) {
  console.log("Error connecting to MongoDB", err);
});

// const User = mongoose.model("User", {
//   name: String,
//   username: String,
//   password: String,
// });

const User = mongoose.model(
    "User",
    new mongoose.Schema({
      name: String,
      username: { type: String, unique: true },
      password: String,
    })
  );

// add some users to the database

async function addUser(name, username, password) {
  // const user = new User({
  //   name: name,
  //   username: username,
  //   password: password,
  // });
  // await user.save();
  // * alternative to this
  await User.create({
    name: name,
    username: username,
    password: password,
  })
  console.log("User added to database");
}

// add 3 users
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


async function addUsers() {
    ALL_USERS.forEach(async (user) => {
        console.log("Adding user", user);
        await addUser(user.name, user.username, user.password);
    });
}
//addUsers();

setTimeout(()=>{
    User.find({}).then((users) => {
        console.log("All users", users);
        mongoose.connection.close();
    });
}, 2000);

// setTimeout(()=>{
//     User.deleteMany({})
//   .then(() => console.log("All users deleted"))
//   .catch((err) => console.error("Error deleting users", err));
// }, 5000);


