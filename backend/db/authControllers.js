const knex = require('./dbController');

const postUser = (user) => {
  return knex('users').insert(user);
}

module.exports = {postUser};