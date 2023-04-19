const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

const createChatUser = async (user) => {
  fetch('https://api.chatengine.io/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-KEY': process.env.CHAT_KEY
      },
      body: JSON.stringify({
        username: user.username,
        secret: user.username
      }),
    })
    .then(response => {
      return response.json()})
    .then(data => {})
  fetch('https://api.chatengine.io/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-KEY': process.env.CHAT_KEY
      },
      body: JSON.stringify({
        username: user.anon_username,
        secret: user.username
      }),
    })
    .then(response => {
      return response.json()})
    .then(data => {})
}

module.exports = { createChatUser }