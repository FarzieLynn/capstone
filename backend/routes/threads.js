const express = require("express");
const {
  postThread,
  getThread,
  getThreadsByUser,
  deleteThread,
  getThreadsByType,
  getThreads,
  editThreadText,
} = require("../db/threadControllers");
let router = express.Router();
const { authenticateToken } = require("../utilities/authorization");

router.post('/new', async (req, res) => {
  const thread = await postThread(req.body);
  return res.send(thread[0]);
})

router.get('/', async (req, res) => {
  let threads;

  threads = await getThreads();
  return res.send(threads);
})

router.get('/type/:type', async (req, res) => {
  let type;
  switch (req.params.type) {
    case 'finance':
      type = 'Finance'
      break;
    case 'fitness':
      type = 'Fitness'
      break;
    case 'mentalhealth':
      type = 'Mental Health'
      break;
    case 'mentorship':
      type = 'Mentorship'
      break;
    default:
      res.status('400').send();
  }
  const threads = await getThreadsByType(type);
  return res.send(threads);
})

router.get("/id/:id", async (req, res) => {
  const thread = await getThread(req.params.id);
  return res.send(thread[0]);
});

router.get("/users/:username", async (req, res) => {
  const threads = await getThreadsByUser(req.params.username);
  return res.send(threads);
});

router.delete('/id/:id', authenticateToken, async (req, res) => {
  const thread = await getThread(req.params.id);
  
  if(thread.thread_author === req.username || req.roles.includes('Admin')){
    await deleteThread(req.params.id);
    return res.send('Thread and comments deleted!');
  }

  return res.status(401).send();

})

router.patch('/id/:id', authenticateToken,  async (req, res) => {
  const thread = await getThread(req.params.id);

  if(thread[0].username === req.username || req.roles.includes('Admin')){
    const updatedPost = await editThreadText(req.params.id, req.body.thread_content, req.body.thread_title);
    return res.send(updatedPost);
  }

  return res.status(401).send();
})

module.exports = router;
