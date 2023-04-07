const express = require('express');
let router = express.Router();

router.get("/", async (req, res) => {
  if (req.sessionID) {
    res.status(200);
    return res.json('good job you did it');
  }
  return res.sendStatus(403);
});

module.exports = router;