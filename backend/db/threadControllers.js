const knex = require("./dbConnection");

const postThread = ({thread_content, thread_type, thread_author, thread_title}) => {
  //COLUMNS: id, thread_type, thread_author, thread_timestamp, thread_content
  const thread = {
    thread_title:thread_title,
    thread_author:thread_author,
    thread_content:thread_content,
    thread_type:thread_type,
    thread_timestamp:knex.fn.now(),
  }
  return knex('threads').insert(thread, '*');
}

const getThreads = () => {
  return knex.select('threads.id', 'threads.thread_title', 'threads.thread_type', 'threads.thread_content', 'users.username', 'users.is_anonymous','threads.thread_timestamp')
  .from('threads')
  .innerJoin('users', "users.id", "=", "threads.thread_author")
}

const getThreadsByType = (type) => {
  //for displaying in a screen where you can see all threads of a type
  //ie mentorship, mental health, etc.
  return knex.select('threads.id', 'threads.thread_title', 'threads.thread_type', 'threads.thread_content', 'users.username', 'users.is_anonymous','threads.thread_timestamp')
    .from('threads')
    .innerJoin('users', "users.id", "=", "threads.thread_author")
    .where('threads.thread_type', '=', type);
}

const getThread = (id) => {
  return knex.select('threads.id', 'threads.thread_title', 'threads.thread_type', 'threads.thread_content', 'users.username', 'users.is_anonymous','threads.thread_timestamp')
    .from('threads')
    .innerJoin('users', "users.id", "=", "threads.thread_author")
    .where('threads.id', '=', id);
}

const getThreadsByUser = (userID) => {
  return knex.select('*').from('threads').where('thread_author', '=', userID);
}

const deleteThread = async (id) => {
  await knex('thread_comments').where('thread_id', '=', id).del();
  return knex('threads').where('id', '=', id).del();
}

const editThreadText = (id, newText, newTitle) => {
  console.log(id, newText, newTitle);
  return knex('threads').where({id:id}).update({thread_content:newText, thread_title:newTitle}, ['*'])
}

module.exports = {
  postThread,
  getThread,
  getThreadsByUser,
  deleteThread,
  getThreadsByType,
  getThreads,
  editThreadText,
};
