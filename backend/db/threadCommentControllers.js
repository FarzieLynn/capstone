const knex = require("./dbConnection");

const postThread = ({thread_content, thread_type, thread_author}) => {
  //COLUMNS: id, thread_type, thread_author, thread_timestamp, thread_content
  const comment = {
    thread_author:thread_author,
    thread_content:thread_content,
    thread_type:thread_type,
    thread_timestamp:knex.fn.now(),
  }
  return knex('thread_comments').insert(thread);
}

const getThread = (id) => {
  return knex.select('*').from('threads').where('id', '=', id);
}

const getThreadsByUser = (userID) => {
  return knex.select('*').from('threads').where('thread_author', '=', userID);
}

const deleteThread = (id) => {
  return knex('threads').where('id', '=', id).del();
}

module.exports = {
  postThread,
  getThread,
  getThreadsByUser,
  deleteThread,
};
