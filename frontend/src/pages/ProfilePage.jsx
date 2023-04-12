import React, { useContext } from 'react'
import '../stylesheets/ProfilePage.css'
import { AppContext } from '../App'

const ProfilePage = () => {
  const { user } = useContext(AppContext);
  console.log(user);
  return (
    <div className='profilepage-main'>
      <div className='profilepage-container'>
        {user.publicData !== undefined ? <img className='profile-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt='Profile pic'/> : null}
        {user.publicData !== undefined ? <h3>{user.publicData.full_name}</h3> : null}
        {user.publicData !== undefined ? <h3>{user.publicData.branch}</h3> : null}
        {user.publicData !== undefined ? <h3>{user.publicData.age_group}</h3> : null}
        {user.publicData !== undefined ? <h3>{user.publicData.gender}</h3> : null}
      </div>
    </div>
  )
}

export default ProfilePage