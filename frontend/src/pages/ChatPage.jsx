import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import '../stylesheets/ChatPage.css'

const ChatPage = () => {
  const { user } = useContext(AppContext);
  const [username, setUsername] = useState('');

  const createDirectChat = (creds) => {
    console.log(creds);
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
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
  if (user.publicData === undefined) return <h3>Loading</h3>
  if(user.publicData.is_anonymous){
    return (
      <ChatEngine
        height='92vh'
        userName={user.publicData.anon_username}
        userSecret={user.publicData.username}
        projectID='87c51be2-76f9-4924-96cf-845972cd42ce'
        renderNewChatForm={(creds) => renderChatForm(creds)}
      />
    )
  }
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