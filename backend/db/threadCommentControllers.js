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
  const out = knex.select('thread_comments.id', 'thread_comments.thread_id', 'thread_comments.comment_content', 'users.username', 'thread_comments.comment_timestamp')
    .from('thread_comments')
    .innerJoin('users', "users.id", "=", "thread_comments.comment_author")
    .where('thread_id', '=', threadID)

  return out;
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
