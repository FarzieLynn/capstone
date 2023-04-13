const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const createChatUser = async (user) => {
  fetch('https://api.chatengine.io/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-KEY': 'ecbf6db7-5e08-48d8-9174-9d4c76dbe5d4'
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
        'PRIVATE-KEY': 'ecbf6db7-5e08-48d8-9174-9d4c76dbe5d4'
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