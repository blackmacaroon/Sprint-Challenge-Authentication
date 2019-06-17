const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate, generateToken } = require("../auth/authenticate");
const Users = require("./helpers.js");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12); //hashed 2^12th times
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.log("register", err);
      res.status(500).json({ message: "registration failure" });
    });
}

function login(req, res) {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        // generate a token
        const token = generateToken(user)
        res.status(200).json({
          message: `Hello ${user.username}.`,
          // add the newly generated token to the servers response
          token
        });
  } else {
        res.status(401).json({ message: 'invalid login credentials'})
  }

  })
  .catch(err => {
    console.log('login fail', err)
    res.status(500).jaon({ message: 'login failed' })
  })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
