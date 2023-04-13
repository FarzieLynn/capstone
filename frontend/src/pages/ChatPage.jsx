import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import {ChatEngine, getOrCreateChat} from 'react-chat-engine'

const ChatPage = () => {
  const { user } = useContext(AppContext);
  const [username, setUsername] = useState('');

  // useEffect(() => {
  //   if(user.publicData !== undefined){
  //     fetchUser();
  //   }

  // }, [user])

  // const fetchUser = () => {
  //   fetch('https://api.chatengine.io/users/', {
  //     method: 'GET',
  //     headers: {
  //       'PRIVATE-KEY': 'ecbf6db7-5e08-48d8-9174-9d4c76dbe5d4'
  //     },
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data) })
  // }

  const createDirectChat = (creds) => {
    getOrCreateChat(
      creds,
      {is_direct_chat: true, usernames: [username]},
      () => setUsername('')
    )
  }

  const renderChatForm = (creds) => {
    return (
      <div>
        <input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <button onClick={() => createDirectChat(creds)}> Create </button>
      </div>
    )
  }
  if(user.publicData === undefined) return <h3>Loading</h3>
  return (
    <ChatEngine
      height='92vh'
      userName={user.publicData.username}
      userSecret={user.publicData.username}
      projectID='87c51be2-76f9-4924-96cf-845972cd42ce'
      renderNewChatForm={(creds) => renderChatForm(creds)}
      />
  )
}

export default ChatPage