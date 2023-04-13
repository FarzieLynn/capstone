const express = require("express");
const { checkIfUsernameExists, postUser, getUserPublicInformation, getUserRoles } = require("../db/authControllers");
const bcrypt = require("bcrypt");
const router = express.Router();
const { authenticateToken } = require("../utilities/authorization");

//Register endpoint
router.post("/", async (req, res) => {
  var { username, password, email, full_name, branch, current_status, age_group, gender, education_level, phone_number, about_you, personal_goals, is_professional, is_anonymous, roles } = req.body;

  if(roles === undefined) roles = [6];

  if (username === undefined || password === undefined)
    res.send(400).json("Bad request");

  const userExists = await checkIfUsernameExists(username);

  if (!userExists) {
    return bcrypt.hash(password, 12, (err, hash) => {
      const user = {
        username: username,
        password: hash,
        full_name:full_name,
        email:email ? email : "",
        branch:branch,
        current_status:current_status ? current_status : "",
        age_group:age_group ? age_group : "",
        gender:gender,
        education_level:education_level ? education_level : "",
        phone_number:phone_number ? phone_number : "",
        about_you:about_you ? about_you : "",
        personal_goals:personal_goals ? personal_goals : {personal_goals:[]},
        is_anonymous:is_anonymous ? is_anonymous : false,
        is_professional:is_professional ? is_professional : false,
        is_verified:false
      };
      postUser(user, roles)
        .then((data) => {
          return res.status(201).send(data);
        })
        .catch((err) => {
          console.error(err);
          return res.send(err);
        });
    });
  } else {
    res.status(400).send('Username taken!')
  }

  return res.status(500).send("something went wrong.");
});

router.get('/:username', authenticateToken, async (req, res) => {
  const data = await getUserPublicInformation(req.params.username);
  const roles = await getUserRoles(data[0].id);
  return res.send({publicData:data[0], roles});
})

module.exports = router;
