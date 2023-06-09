import React, { useContext, useState } from 'react'
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
      <div className='mt-4 mb-2 create-chat input-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => createDirectChat(creds)} className='btn btn-secondary'> Create </button>
      </div>
    )
  }
  if (user.publicData === undefined) return <h3>Loading</h3>
  if(user.publicData.is_anonymous){
    return (
      <ChatEngine
        height='86vh'
        userName={user.publicData.anon_username}
        userSecret={user.publicData.username}
        projectID={process.env.REACT_APP_PROJ_KEY}
        renderNewChatForm={(creds) => renderChatForm(creds)}
      />
    )
  }
  return (
    <ChatEngine
      height='86vh'
      userName={user.publicData.username}
      userSecret={user.publicData.username}
      projectID={process.env.REACT_APP_PROJ_KEY}
      renderNewChatForm={(creds) => renderChatForm(creds)}
    />
  )
}

export default ChatPage