const express = require("express");
const users = require("../data/users");

const router = express.Router();

//route to handle user registration
//test to get all of the users
router.get("/users", (req, res) => {
  res.send(users);
});
//router.post('/register', login.register);
router.post("/register", function(req, res) {
  const user = {
    id: users.length,
    username: req.body.username,
    password: req.body.password
  };
  users.push(user);
  res.send(user);
});
//router.post('/login', login.login)
router.post("/login", function(req, res) {
  const user = users.find(c => c.username === req.body.username);
  if (!user) return res.status(404).send("Username Wrong");
  if (user.password != req.body.password)
    return res.status(404).send("Password Wrong");

  res.send(user);
});

module.exports = router;
