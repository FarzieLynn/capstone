const express = require('express');
const { checkIfUsernameExists, getUser, getUserRoles } = require("../db/authControllers");
const {comparePasswords} = require('../utilities/authorization');
const jwt = require("jsonwebtoken");
let router = express.Router();

//login endpoint
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined)
    res.send(400).json("Bad request");

  const userExists = await checkIfUsernameExists(username);

  if(userExists){

    const userData = await getUser(username);
    const userRoles = await getUser(username);
    const roles = await getUserRoles(userData[0].id);

    return comparePasswords(password, userData[0].password)
      .then(result => {
        //Generates a user JWT based on their roles after successful authentication.
        const accessToken = jwt.sign({username:username, roles:roles}, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('access_token', accessToken).json('Login successful!');
      })
  }
  res.status(500).send();
});

module.exports = router;