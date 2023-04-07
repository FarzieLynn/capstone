const knex = require('./dbConnection');

const postUser = (user) => {
  return knex('users').insert(user);
}

const getUser = (username) => {
  return knex.select('*').from('users').where({username:username});
}

const checkIfUsernameExists = async(username) => {
  const user = await knex.select('username').from('users').where({username:username})
  return user.length !== 0;
}

const verifySessionID = async (sessionId) => {
  const sessId = await knex.select('*').from('sessions').where({sid:sessionId}).where('expired', '>=', knex.fn.now());
  return sessId.length !== 0;
}

module.exports = {postUser, verifySessionID, checkIfUsernameExists, getUser};