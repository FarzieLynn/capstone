import React, { useContext } from 'react'
import '../stylesheets/ProfilePage.css'
import { AppContext } from '../App'

const ProfilePage = () => {
  const { user } = useContext(AppContext);
  if(user.publicData === undefined) {
    return (
      <h3>You must login</h3>
    )
  }
  if (user.publicData.is_professional === false) {
    return (
      <div className='profilepage-main d-flex flex-column align-items-center'>
        <div className='profilepage-container d-flex flex-column justify-content-center'>
          {user.publicData !== undefined ?
            <>
              <img className='profile-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt='Profile pic' />
              <h1 className='text-center mb-4'>{user.publicData.full_name}</h1>
              <h3>Username: {user.publicData.username}</h3>
              <h3>Branch: {user.publicData.branch}</h3>
              <h3>Age Bracket: {user.publicData.age_group}</h3>
              <h3>Gender: {user.publicData.gender}</h3>
            </>
            : null}
        </div>
      </div>
    )
  } else {
    return (
      <div className='profilepage-main d-flex flex-column align-items-center'>
        <div className='profilepage-container d-flex flex-column justify-content-center'>
          {user.publicData !== undefined ?
            <>
              <img className='profile-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt='Profile pic' />
              <h1 className='text-center mb-4'>{user.publicData.full_name}</h1>
              <h3>Username: {user.publicData.username}</h3>
              <h3>Education: {user.publicData.education_level}</h3>
              <h3>Branch: {user.publicData.branch}</h3>
              <h3>Cell: {user.publicData.phone_number}</h3>
              <p>{user.publicData.about_you}</p>
            </>
            : null}
        </div>
      </div>
    )
  }
}

export default ProfilePage