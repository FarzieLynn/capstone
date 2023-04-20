const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    console.log(token)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err, user);
      if(err) return res.sendStatus(403);
  
      req.roles = user.roles;
      req.username = user.username;
      next();
    })
}

const authUser = (username) => {
  
}

const comparePasswords = (plainText, hashed) => {
  return bcrypt.compare(plainText, hashed)
  .then((result) => {
    return result;
  })
  .catch(err => console.error(err));
}

const authenticateRole = (role) => {
  return (req, res, next) => {
    if(1==1){

    }
  }
}

module.exports = {authenticateToken, comparePasswords};