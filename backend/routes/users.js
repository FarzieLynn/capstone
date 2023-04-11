const express = require("express");
const { checkIfUsernameExists, postUser } = require("../db/authControllers");
const bcrypt = require("bcrypt");
const router = express.Router();

//Register endpoint
router.post("/", async (req, res) => {
  const { username, password, full_name, branch, current_status, age_group, gender, is_anonymous } = req.body;

  if (username === undefined || password === undefined)
    res.send(400).json("Bad request");

  const userExists = await checkIfUsernameExists(username);

  if (!userExists) {
    return bcrypt.hash(password, 12, (err, hash) => {
      const user = {
        username: username,
        password: hash,
        full_name:full_name,
        branch:branch,
        current_status:current_status,
        age_group:age_group,
        gender:gender,
        is_anonymous:is_anonymous
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
