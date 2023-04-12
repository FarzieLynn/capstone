const express = require("express");
const {
  postComment,
  getComment,
  getCommentsOnPost,
  getCommentsByUser,
  deleteComment,
} = require("../db/threadCommentControllers");
let router = express.Router();

router.post('/new', async (req, res) => {
  await postComment(req.body);
  return res.send('Comment added!');
})

router.get("/id/:id", async (req, res) => {
  const comment = await getComment(req.params.id);
  return res.send(comment[0]);
});

router.get("/users/:username", async (req, res) => {
  const comments = await getCommentsByUser(req.params.username);
  return res.send(comments);
});

//get all comments on a post
router.get("/post/:id", async (req, res) => {
  const comments = await getCommentsOnPost(req.params.id);
  return res.send(comments);
});

router.delete('/:id', async (req, res) => {
  await deleteComment(req.params.id);
  return res.send('Comment deleted!');
})

module.exports = router;
