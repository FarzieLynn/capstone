import React, { useContext } from 'react'
import '../stylesheets/ProfilePage.css'
import { AppContext } from '../App'

const ProfilePage = () => {
  const { user } = useContext(AppContext);

  console.log(user);
  return (
    <div className='profilepage-main'>
      <h1>Profile Page</h1>
      
    </div>
  )
}

export default ProfilePage