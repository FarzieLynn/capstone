import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/ProfilePage.css";
import { AppContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import cookie from "cookie";
import {
  Form,
  Container,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";
import { getOrCreateChat } from "react-chat-engine";

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
      .then((response) => response.json())
      .then((userData) => {
        return userData;
      });
  };
  //If not accessing the already logged in user's profile, fetch the user's data from the database
  useEffect(() => {
    if (user !== undefined && Object.keys(user).length !== 0) {
      if (user.publicData.username === username) {
        setUserData(user.publicData);
      } else {
        getUserData().then((userData) => setUserData(userData.publicData));
      }
    }
  }, [user, username, url]);

  //Sets the is_anonymous value on the users profile in the database
  const handleSwitch = async (event) => {
    const token = cookie.parse(document.cookie).access_token;
    const wait = await fetch(
      `${url}/users/${user.publicData.username}/anonymous`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          is_anonymous: event.target.checked,
        }),
      }
    );
    const data = await getUserData();
    setUser(data);
  };

  const handleNewChat = () => {
    const userChat = {
      userName: user.publicData.is_anonymous
        ? user.publicData.anon_username
        : user.publicData.username,
      userSecret: user.publicData.username,
      projectID: "87c51be2-76f9-4924-96cf-845972cd42ce",
    };
    getOrCreateChat(
      userChat,
      {
        is_direct_chat: true,
        usernames: [username],
      },
      () => navigate("/chat")
    );

  };
  return <>{createRegularProfilePage()}</>;


  // if (userData === undefined || user.publicData === undefined) {
  //   return (
  //     <h3>Loading</h3>
  //   )
  // } else {
  //   if (userData.is_professional === false) {
  //     return (
  //       <div className='profilepage-main d-flex flex-column align-items-center'>
  //         <div className='profilepage-container d-flex flex-column justify-content-center'>
  //           {userData !== undefined ?
  //             <>
  //               <img className='profile-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt='Profile pic' />
  //               <h1 className='text-center mb-4'>{userData.full_name}</h1>
  //               {userData.username === user.publicData.username ?
  //                 <Form>
  //                   <Form.Check
  //                     onChange={(event) => handleSwitch(event)}
  //                     type="switch"
  //                     id="custom-switch"
  //                     label="Set anonymous"
  //                     checked={userData.is_anonymous}
  //                   />
  //                 </Form>
  //                 : null}
  //               <h3>Username: {userData.username}</h3>
  //               <h3>Branch: {userData.branch}</h3>
  //               <h3>Age Bracket: {userData.age_group}</h3>
  //               <h3>Gender: {userData.gender}</h3>
  //               {username !== user.publicData.username ? <button onClick={() => handleNewChat()}>Start a Chat!</button> : null}
  //             </>
  //             : null}
  //         </div>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div className='profilepage-main d-flex flex-column align-items-center'>
  //         <div className='profilepage-container d-flex flex-column justify-content-center'>
  //           {userData !== undefined ?
  //             <>
  //               <img className='profile-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt='Profile pic' />
  //               <h1 className='text-center mb-4'>{userData.full_name}</h1>
  //               {userData.username === user.publicData.username ?
  //                 <Form>
  //                   <Form.Check
  //                     onChange={handleSwitch}
  //                     type="switch"
  //                     id="custom-switch"
  //                     label="Set anonymous"
  //                     checked={userData.is_anonymous}
  //                   />
  //                 </Form>
  //                 : null}
  //               <h3>Username: {userData.username}</h3>
  //               <h3>Education: {userData.education_level}</h3>
  //               <h3>Branch: {userData.branch}</h3>
  //               <h3>Cell: {userData.phone_number}</h3>
  //               {username !== user.publicData.username ? <button onClick={() => handleNewChat()}>Start a Chat!</button> : null}
  //               <p>{userData.about_you}</p>
  //             </>
  //             : null}
  //         </div>
  //       </div>
  //     )
  //   }
  // }
};

export default ProfilePage;

const createProfessionalProfilePage = () => {
  return (
    <section className="profilepage-main">
      <Container fluid className="m-3">
        <Row>
          <Col lg={4}>
            <Card className="m-4">
              <Card.Body className="text-center">
                <Card.Img
                  className="profile-img"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
                  alt="Profile pic"
                />
                <Card.Title>Username</Card.Title>
                <Card.Text className="text-muted mb-1">
                  Full Stack Developer
                </Card.Text>
                <Card.Text className="text-muted mb-4">Location here</Card.Text>
                <div className="d-flex justify-content-center mb-2">
                  <Button className="m-1 btn-chat">Message Now!</Button>
                  <Button className="m-1 btn-chat">Another thing</Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="m-4">
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="m-4">
              <Card.Body>
                <Row>
                  <Col sm={3}>
                    <Card.Text>Full Name</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      Tanner Anderson
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">tan@aol.com</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Phone</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">123-123-1234</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Education Level</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">Bachelors</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Branch/Status</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      USSF/Active Duty
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Row>
              <Col md={6}>
                <Card className="m-4 mt-0">
                  <Card.Body>
                    <Card.Title>About Me</Card.Title>
                    <Card.Text>
                      Hello, so I am a person who does things and is cool and
                      all of that kind of stuff. Please let me know if you need
                      any help with mental health issues because I am wildy
                      unqualified to actually assist you, but I can show you
                      funny cat videos I guess?
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="m-4 mt-0">
                  <Card.Body>
                    <Card.Title>Specialties</Card.Title>
                    <Card.Text>Mental Health</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const createRegularProfilePage = () => {
  return (
    <section className="profilepage-main">
      <Container fluid className="py-5">
        <Row>
          <Col lg={4}>
            <Card className="m-4">
              <Card.Body className="text-center">
                <Card.Img
                  className="profile-img"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
                  alt="Profile pic"
                />
                <Card.Title>Username</Card.Title>
                <Card.Text className="text-muted mb-1">
                  Full Stack Developer
                </Card.Text>
                <Card.Text className="text-muted mb-4">Location here</Card.Text>
                <div className="d-flex justify-content-center mb-2">
                  <Button className="m-1">Message Now!</Button>
                  <Button className="m-1">Another thing</Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="m-4">
              <Card.Body>
                <Card.Title>Questionnaire Results</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>website here</Card.Text>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="m-4">
              <Card.Body>
                <Row>
                  <Col sm={3}>
                    <Card.Text>Full Name</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      Tanner Anderson
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">tan@aol.com</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Phone</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">123-123-1234</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Education Level</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">Bachelors</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Branch/Status</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      USSF/Active Duty
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Row>
              <Col md={6}>
                <Card className="m-4 mt-0">
                  <Card.Body>
                    <Card.Title>About Me</Card.Title>
                    <Card.Text>
                      Hello, so I am a person who does things and is cool and
                      all of that kind of stuff. Please let me know if you need
                      any help with mental health issues because I am wildy
                      unqualified to actually assist you, but I can show you
                      funny cat videos I guess?
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="m-4 mt-0">
                  <Card.Body>
                    <Card.Title>Personal Goals</Card.Title>
                    <Card.Text>To do things that are happy</Card.Text>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
