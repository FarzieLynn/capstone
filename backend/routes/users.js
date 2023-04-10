const express = require("express");
const { checkIfUsernameExists, postUser } = require("../db/authControllers");
const bcrypt = require("bcrypt");
const router = express.Router();

//Register endpoint
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined)
    res.send(400).json("Bad request");

  const userExists = await checkIfUsernameExists(username);

  if (!userExists) {
    return bcrypt.hash(password, 12, (err, hash) => {
      const user = {
        id: 30003,
        username: username,
        password: hash,
      };
      postUser(user)
        .then((data) => {
          return res.status(201).send(data);
        })
        .catch((err) => {
          console.error(err);
          return res.send(err);
        });
    });
  }

  return res.status(500).send("something went wrong.");
});

module.exports = router;
