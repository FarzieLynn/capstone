const knex = require("./dbConnection");

const postComment = ({thread_id, comment_content, comment_author}) => {
  //COLUMNS: id, thread_type, thread_author, thread_timestamp, thread_content
  const comment = {
    comment_author:comment_author,
    comment_content:comment_content,
    thread_id:thread_id,
    comment_timestamp:knex.fn.now(),
  }
  return knex('thread_comments').insert(comment);
}

const getComment = (id) => {
  return knex.select('*').from('thread_comments').where('id', '=', id);
}

const getCommentsOnPost = (threadID) => {
  return knex.select('*').from('thread_comments').where('thread_id', '=', threadID);
}

const getCommentsByUser = (userID) => {
  return knex.select('*').from('thread_comments').where('comment_author', '=', userID);
}

const deleteComment = (id) => {
  return knex('thread_comments').where('id', '=', id).del();
}

module.exports = {
  postComment,
  getComment,
  getCommentsOnPost,
  getCommentsByUser,
  deleteComment,
};
