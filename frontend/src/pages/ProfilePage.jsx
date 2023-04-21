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
  Modal,
} from "react-bootstrap";
import { getOrCreateChat } from "react-chat-engine";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser, url, token } = useContext(AppContext);
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [userScores, setUserScores] = useState([]);
  const [showAboutMeModal, setShowAboutMeModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [aboutMeUpdate, setAboutMeUpdate] = useState("");

  const getUserData = async () => {
    return await fetch(`${url}/users/${username}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        setUserData(userData);
        return userData;
      });
  };
  //If not accessing the already logged in user's profile, fetch the user's data from the database
  useEffect(() => {
    if (user !== undefined && Object.keys(user).length !== 0) {
      if (user.publicData.username === username) {
        setUserData(user);
        fetch(`${url}/users/scores/${user.publicData.id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((data) => data.json())
          .then((data) => setUserScores(data));
      } else {
        getUserData()
          // .then((data) => {
          //   fetch(`${url}/users/scores/${userData.publicData.id}`)
          //     .then((data) => data.json())
          //     .then((data) => setUserScores(data));
          // });
      }
    }
  }, [user, username, url]);

  //Sets the is_anonymous value on the users profile in the database
  const handleSwitch = async (event) => {
    const token = cookie.parse(document.cookie).access_token;
    await fetch(`${url}/users/${user.publicData.username}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        is_anonymous: event.target.checked,
      }),
    });
    const data = await getUserData();
    setUser(data);
  };

  const handleNewChat = () => {
    const userChat = {
      userName: user.publicData.is_anonymous
        ? user.publicData.anon_username
        : user.publicData.username,
      userSecret: user.publicData.username,
      projectID: process.env.REACT_APP_PROJ_KEY
    }
    getOrCreateChat(
      userChat,
      {
        is_direct_chat: true,
        usernames: [username],
      },
      () => navigate("/chat")
    );
  };

  const handleAboutMeUpdate = async () => {
    await fetch(`${url}/users/${userData.publicData.username}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        about_you: aboutMeUpdate,
      }),
    });
    const data = await getUserData();
    setUser(data);
    setShowAboutMeModal(false);
  };

  const handleUserInfoUpdate = async () => {
    const { full_name, email, phone, branch, status, age_group } =
      document.forms[1];


    await fetch(`${url}/users/${userData.publicData.username}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        full_name: full_name.value,
        email: email.value,
        phone_number: phone.value,
        branch: branch.value,
        current_status: status.value,
        age_group:age_group.value,
      }),
    });
    const data = await getUserData();
    setUser(data);
    setShowInfoModal(false);
  };

  if (userData.publicData === undefined || user.publicData === undefined) {
    return <h3>Loading</h3>;
  } else {
    return (
      <>
        {userData.publicData.is_professional
          ? createProfessionalProfilePage(
              userData,
              user,
              handleSwitch,
              setShowAboutMeModal,
              handleNewChat,
              setShowInfoModal
            )
          : createRegularProfilePage(
              userData,
              user,
              handleSwitch,
              setShowAboutMeModal,
              userScores,
              handleNewChat,
              setShowInfoModal
            )}
        <Modal
          show={showAboutMeModal}
          onHide={() => setShowAboutMeModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>About Me Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>About You</Form.Label>
              <Form.Control
                as="textarea"
                name="about_you"
                rows={3}
                onChange={(e) => setAboutMeUpdate(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAboutMeModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => handleAboutMeUpdate()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showInfoModal} onHide={() => setShowInfoModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Account Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  defaultValue={userData.publicData.full_name}
                  type="text"
                  name="full_name"
                  placeholder="Enter first and last name"
                />

                <Form.Group className="mb-3">
                  <Form.Label>.mil Email</Form.Label>
                  <Form.Control
                    defaultValue={userData.publicData.email}
                    type="text"
                    name="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Phone/DSN</Form.Label>
                  <Form.Control
                    defaultValue={userData.publicData.phone_number}
                    type="text"
                    name="phone"
                    placeholder="Enter phone #"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Military Branch</Form.Label>
                  <Form.Select
                    defaultValue={userData.publicData.branch}
                    type="text"
                    name="branch"
                    placeholder="Military Branch"
                  >
                    <option>Space Force</option>
                    <option>Air Force</option>
                    <option>Army</option>
                    <option>Navy</option>
                    <option>Marines</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Military Status</Form.Label>
                  <Form.Select
                    defaultValue={userData.publicData.current_status}
                    type="text"
                    name="status"
                    placeholder="Military Status"
                  >
                    <option>Active Duty</option>
                    <option>Reserves</option>
                    <option>Veteren</option>
                    <option>Civilian</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Age Group</Form.Label>
                  <Form.Select
                    defaultValue={userData.publicData.age_group}
                    type="text"
                    name="age_group"
                    placeholder="Age Group"
                  >
                    <option>17-21</option>
                    <option>22-26</option>
                    <option>27-31</option>
                    <option>32-36</option>
                    <option>37-41</option>
                    <option>42-46</option>
                    <option>47-51</option>
                    <option>52-56</option>
                    <option>57+</option>
                  </Form.Select>
                </Form.Group>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowInfoModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleUserInfoUpdate()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default ProfilePage;

const createProfessionalProfilePage = (
  userData,
  user,
  handleSwitch,
  setShowModal,
  userScores,
  handleNewChat,
  setShowInfoModal
) => {
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
                <Card.Title>{userData.publicData.username}</Card.Title>
                <Card.Text className="text-muted mb-1">
                  Military Anonymous Professional
                </Card.Text>
                <div className="d-flex justify-content-center mb-2">
                  <Button
                    className="m-1 btn-chat"
                    onClick={() => handleNewChat()}
                  >
                    Message Now!
                  </Button>
                  {user.roles.includes("Admin") ? (
                    <Button className="m-1 btn-chat">Delete User</Button>
                  ) : null}
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
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.full_name}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.email !== null
                        ? userData.publicData.email
                        : "Not listed"}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Phone</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.phone_number !== null
                        ? userData.publicData.phone_number
                        : "None"}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Education Level</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.education_level !== null
                        ? userData.publicData.education_level
                        : "None"}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Branch</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.branch !== null
                        ? userData.publicData.branch
                        : "None"}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Age Group</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.age_group !== null
                        ? userData.publicData.age_group
                        : "None"}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Row>
              <Col md={6}>
                <Card className="m-4 mt-0">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <Card.Title>About Me</Card.Title>
                      <Card.Link
                        className="clickable"
                        onClick={() => setShowModal(true)}
                      >
                        Edit
                      </Card.Link>
                    </div>
                    <Card.Text>
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.about_you !== null
                        ? userData.publicData.about_you
                        : "None"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="m-4 mt-0">
                  <Card.Body>
                    <Card.Title>Specialties</Card.Title>
                    {userData.roles.map((role) => {
                      return (
                        <>
                          <Card.Text>{role}</Card.Text>
                          <hr />
                        </>
                      );
                    })}
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

//userData is the user whos profile page it is
//user is the user accessing that information
const createRegularProfilePage = (
  userData,
  user,
  handleSwitch,
  setShowModal,
  userScores,
  handleNewChat,
  setShowInfoModal
) => {
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
                <Card.Title>{userData.publicData.username}</Card.Title>
                <Card.Text className="text-muted mb-1">
                  Military Anonymous User
                </Card.Text>
                {userData.publicData.username === user.publicData.username ? (
                  <Form>
                    <Form.Check
                      onChange={(event) => handleSwitch(event)}
                      type="switch"
                      id="custom-switch"
                      label="Set anonymous"
                      checked={userData.is_anonymous}
                    />
                  </Form>
                ) : null}
                <div className="d-flex justify-content-center mb-2">
                  <button
                    className="m-1 btn-chat"
                    onClick={() => handleNewChat(userData)}
                  >
                    Message Now!
                  </button>

                  {user.roles.includes("Admin") ? (
                    <Button className="m-1 btn-chat">Delete User</Button>
                  ) : null}
                </div>
              </Card.Body>
            </Card>

            <Card className="m-4">
              <Card.Body>
                <Card.Title>Questionnaire Results</Card.Title>
                <Row>
                  <Col>Date Taken</Col>
                  <Col>Score</Col>
                </Row>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {userScores.map((item) => {
                      return (
                        <Row>
                          <Col md={6}>
                            {new Date(item.date_taken).toDateString()}
                          </Col>
                          <Col md={6}>{item.score}</Col>
                        </Row>
                      );
                    })}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="m-4">
              <Card.Body>
                <Row>
                  <div className="d-flex justify-content-between mb-2">
                    <Card.Title>User Info</Card.Title>
                    <Card.Link
                      className="clickable"
                      onClick={() => setShowInfoModal(true)}
                    >
                      Edit
                    </Card.Link>
                  </div>
                  <Col sm={3}>
                    <Card.Text>Full Name</Card.Text>
                  </Col>
                  <Col sm={8}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.full_name}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.email !== null
                        ? userData.publicData.email
                        : "Not listed"}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Phone</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.phone_number !== null
                        ? userData.publicData.phone_number
                        : "None"}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Education Level</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.education_level !== null
                        ? userData.publicData.education_level
                        : "None"}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Branch</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.branch !== null
                        ? userData.publicData.branch
                        : "None"}
                    </Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <Card.Text>Age Group</Card.Text>
                  </Col>
                  <Col sm={9}>
                    <Card.Text className="text-muted">
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.age_group !== null
                        ? userData.publicData.age_group
                        : "None"}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Row>
              <Col md={6}>
                <Card className="m-4 mt-0">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <Card.Title>About Me</Card.Title>
                      {userData.publicData.username ===
                      user.publicData.username ? (
                        <Card.Link
                          className="clickable"
                          onClick={() => setShowModal(true)}
                        >
                          Edit
                        </Card.Link>
                      ) : null}
                    </div>
                    <Card.Text>
                      {userData.is_anonymous
                        ? "Anonymous"
                        : userData.publicData.about_you !== null
                        ? userData.publicData.about_you
                        : "None"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="m-4 mt-0">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <Card.Title>Personal Goals</Card.Title>
                      {userData.publicData.username ===
                      user.publicData.username ? (
                        <Card.Link
                          className="clickable"
                          onClick={() => console.log("Editing")}
                        >
                          Edit
                        </Card.Link>
                      ) : null}
                    </div>
                    <div>
                      {userData.publicData.personal_goals?.personal_goals.map(
                        (item) => {
                          return (
                            <>
                              <Card.Text>{item}</Card.Text>
                              <hr />
                            </>
                          );
                        }
                      )}
                    </div>
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
