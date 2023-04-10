const express = require("express");
const {
  checkIfUsernameExists,
  getUser,
  getUserRoles,
  getUserPublicInformation,
} = require("../db/authControllers");
const { comparePasswords, authenticateToken } = require("../utilities/authorization");
const jwt = require("jsonwebtoken");
let router = express.Router();

//login endpoint
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined)
    res.send(400).json("Bad request");

  const userExists = await checkIfUsernameExists(username);

  if (userExists) {
    const userData = await getUser(username);
    const publicData = await getUserPublicInformation(username);
    const roles = await getUserRoles(userData[0].id);

    return comparePasswords(password, userData[0].password).then((result) => {
      if (result) {
        //Generates a user JWT based on their roles after successful authentication.
        const accessToken = jwt.sign(
          { username: username, roles: roles },
          process.env.ACCESS_TOKEN_SECRET, {expiresIn:'12h'}
        );
        return res.cookie("access_token", accessToken, {maxAge:1000 * 60 * 60 * 12}).json({publicData:publicData, roles:
          roles});
      }
      return res.json("Incorrect username or password.");
    });
  }
  res.status(500).send();
});


router.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.clearCookie("access_token");
  return res.status(201).json('Logout successful.');
})

module.exports = router;