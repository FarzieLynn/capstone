import React, { useContext, useEffect, useState } from 'react'
import '../stylesheets/ProfilePage.css'
import { AppContext } from '../App'
import { useNavigate, useParams } from 'react-router-dom';
import cookie from 'cookie';
import { Form } from 'react-bootstrap';
import { getOrCreateChat } from 'react-chat-engine';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser, url } = useContext(AppContext);
  const { username } = useParams();
  const [userData, setUserData] = useState({});

  const getUserData = () => {
    const token = cookie.parse(document.cookie).access_token;
    return fetch(`${url}/users/${username}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(userData => {
        return userData;
      })
  }
  //If not accessing the already logged in user's profile, fetch the user's data from the database
  useEffect(() => {
    if (user !== undefined && Object.keys(user).length !== 0) {
      if (user.publicData.username === username) {
        setUserData(user.publicData);
      } else {
        getUserData().then(userData => setUserData(userData.publicData));
      }
    }
  }, [user, username, url])



  //Sets the is_anonymous value on the users profile in the database
  const handleSwitch = async (event) => {
    const token = cookie.parse(document.cookie).access_token;
    const wait = await fetch(`${url}/users/${user.publicData.username}/anonymous`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        is_anonymous: event.target.checked
      })
    })
    const data = await getUserData();
    setUser(data);
  }

  const handleNewChat = () => {
    const userChat = {
      userName: user.publicData.is_anonymous ? user.publicData.anon_username : user.publicData.username,
      userSecret: user.publicData.username,
      projectID: '87c51be2-76f9-4924-96cf-845972cd42ce'
    }
    getOrCreateChat(
      userChat,
      {
        is_direct_chat: true,
        usernames: [username],
      }, () => navigate('/chat')
    );
  }
  console.log(userData);
  if (userData === undefined || user.publicData === undefined) {
    return (
      <h3>Loading</h3>
    )
  } else {
    if (userData.is_professional === false) {
      return (
        <div className='profilepage-main d-flex flex-column align-items-center'>
          <div className='profilepage-container d-flex flex-row justify-content-start mt-5 w-75 text-white'>
            {userData !== undefined ?
              <>
                <img className='profile-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt='Profile pic' />
                <div className='profile-info ms-4'>
                  <h1 className='text-center mb-1'>{userData.full_name}</h1>
                  <h4 className='mb-3'>@{userData.username}</h4>
                  <h4>Branch: {userData.branch}</h4>
                  <h4>Age Bracket: {userData.age_group}</h4>
                  <h4>Gender: {userData.gender}</h4>
                  {userData.username === user.publicData.username ?
                    <Form>
                      <Form.Check
                        onChange={(event) => handleSwitch(event)}
                        type="switch"
                        id="custom-switch"
                        label="Set anonymous"
                        checked={userData.is_anonymous}
                      />
                    </Form>
                    : null}
                  {username !== user.publicData.username ? <button onClick={() => handleNewChat()}>Start a Chat!</button> : null}
                </div>
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
                {userData.username === user.publicData.username ?
                  <Form>
                    <Form.Check
                      onChange={handleSwitch}
                      type="switch"
                      id="custom-switch"
                      label="Set anonymous"
                      checked={userData.is_anonymous}
                    />
                  </Form>
                  : null}
                <h3>Username: {userData.username}</h3>
                <h3>Education: {userData.education_level}</h3>
                <h3>Branch: {userData.branch}</h3>
                <h3>Cell: {userData.phone_number}</h3>
                {username !== user.publicData.username ? <button onClick={() => handleNewChat()}>Start a Chat!</button> : null}
                <p>{userData.about_you}</p>
              </>
              : null}
          </div>
        </div>
      )
    }
  }
}

export default ProfilePage