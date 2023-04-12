import React, { useContext, useEffect, useState } from 'react'
import '../stylesheets/ProfilePage.css'
import { AppContext } from '../App'
import { useParams } from 'react-router-dom';
import cookie from 'cookie';

const ProfilePage = () => {
  const { user, url } = useContext(AppContext);
  const { username } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log(username)
    if(user.publicData !== undefined) {
      if(user.publicData.username === username) {
        setUserData(user.publicData);
      }else{
        const token = cookie.parse(document.cookie).access_token;
        fetch(`${url}/users/${username}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        })
      .then(response => response.json())
      .then(userData => {
        setUserData(userData.publicData);
      })
      }
    }
  }, [user, username, url])
  if(userData === undefined) {
    return (
      <h3>Loading</h3>
    )
  }
  if (userData.is_professional === false) {
    return (
      <div className='profilepage-main d-flex flex-column align-items-center'>
        <div className='profilepage-container d-flex flex-column justify-content-center'>
          {userData !== undefined ?
            <>
              <img className='profile-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt='Profile pic' />
              <h1 className='text-center mb-4'>{user.full_name}</h1>
              <h3>Username: {userData.username}</h3>
              <h3>Branch: {userData.branch}</h3>
              <h3>Age Bracket: {userData.age_group}</h3>
              <h3>Gender: {userData.gender}</h3>
            </>
            : null}
        </div>
      </div>
    )
  } else {
    return (
      <div className='profilepage-main d-flex flex-column align-items-center'>
        <div className='profilepage-container d-flex flex-column justify-content-center'>
          {userData !== undefined ?
            <>
              <img className='profile-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt='Profile pic' />
              <h1 className='text-center mb-4'>{userData.full_name}</h1>
              <h3>Username: {userData.username}</h3>
              <h3>Education: {userData.education_level}</h3>
              <h3>Branch: {userData.branch}</h3>
              <h3>Cell: {userData.phone_number}</h3>
              <p>{userData.about_you}</p>
            </>
            : null}
        </div>
      </div>
    )
  }
}

export default ProfilePage