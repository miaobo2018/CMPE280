var express = require("express");
var login = require("./routes/loginroutes");
var bodyParser = require("body-parser");
var app = express();
const users = require("./data/users");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var router = express.Router();
// test route
router.get("/", function(req, res) {
  res.json({ message: "welcome to our upload module apis" });
});

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

app.use("/api", router);
app.listen(5000);
