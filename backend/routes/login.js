const express = require('express');
const { checkIfUsernameExists, getUser } = require("../db/authControllers");
const {comparePasswords} = require('../utilities/authorization');
let router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined)
    res.send(400).json("Bad request");

  const userExists = await checkIfUsernameExists(username);

  if(userExists){
    const userData = await getUser(username);
    return comparePasswords(password, userData[0].password)
      .then(result => {
        res.send(result);
      })
  }
  res.status(500).send();
});

module.exports = router;