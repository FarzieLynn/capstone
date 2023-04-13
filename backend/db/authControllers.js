const knex = require("./dbConnection");

const postUser = async (user, roles) => {
  const id = await knex("users").insert(user, ['id']);
  for(let i = 0; i < roles.length; i++){
    await knex("role_users").insert({user_id:id[0].id, role_id:roles[i]});
  }
};

const getUser = (username) => {
  return knex.select("*").from("users").where({ username: username });
};

const getUserPublicInformation = (username) => {
  return knex.select("id", "username", "email", "branch", "full_name", "age_group", "gender", "education_level", "phone_number", "about_you", "personal_goals", "is_professional", "is_anonymous", "anon_username").from("users").where({ username: username });
}

const getUserRoles = async (userID) => {
  const roles = await knex
    .select("roles.role_name")
    .from("users")
    .innerJoin("role_users", "users.id", "=", "role_users.user_id")
    .innerJoin("roles", "roles.id", "=", "role_users.role_id")
    .where("user_id", "=", userID);

    let out = [];
    for(let i = 0; i < roles.length; i++){
      out.push(roles[i].role_name);
    }

    return out;
};

const checkIfUsernameExists = async (username) => {
  const user = await knex
    .select("username")
    .from("users")
    .where({ username: username });
  return user.length !== 0;
};
const checkIfAnonUsernameExists = async (username) => {
  const user = await knex
    .select("anon_username")
    .from("users")
    .where({ anon_username: username });
  return user.length !== 0;
};

const verifySessionID = async (sessionId) => {
  const sessId = await knex
    .select("*")
    .from("sessions")
    .where({ sid: sessionId })
    .where("expired", ">=", knex.fn.now());
  return sessId.length !== 0;
};

const updateUser = async (username, data) => {
  const user = await knex("users").where({ username: username }).update(data);
  return user;
};

module.exports = {
  postUser,
  verifySessionID,
  checkIfUsernameExists,
  getUser,
  getUserRoles,
  getUserPublicInformation,
  updateUser,
  checkIfAnonUsernameExists
};
