const express = require("express");
const { authenticateToken } = require("../utilities/authorization");
const {getUserPublicInformation, getUserRoles, getUser} = require('../db/authControllers');
const jwt = require("jsonwebtoken");
let router = express.Router();

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.clearCookie("access_token");
  return res.status(201).json("Logout successful.");
});

router.get("/session", async (req, res) => {
  console.log(req.sessionID)
  if (req.sessionID) {
    res.status(200);
    return res.json("good job you did it");
  }
  return res.sendStatus(403);
});

router.post('/fetch-login', authenticateToken, async (req, res) => {
  const publicData = await getUserPublicInformation(req.username);
  console.log(publicData);
  const roles = await getUserRoles(publicData[0].id);

  
  res.json({publicData:publicData[0], roles:roles});
})

module.exports = router;
