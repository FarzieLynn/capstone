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
  const [showModal, setShowModal] = useState(false);
  const [aboutMeUpdate, setAboutMeUpdate] = useState("");

  const getUserData = () => {
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
        setUserData(user);
      } else {
        getUserData().then((userData) => setUserData(userData));
      }
    }
  }, [user, username, url]);

  //Sets the is_anonymous value on the users profile in the database
  const handleSwitch = async (event) => {
    const token = cookie.parse(document.cookie).access_token;
    await fetch(
      `${url}/users/${user.publicData.username}`,
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

  const handleAboutMeUpdate = async () => {
    await fetch(`${url}/users/${userData.publicData.username}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        about_you:aboutMeUpdate
      }),
    });
    const data = await getUserData();
    setUser(data);
    setShowModal(false);
  };

  if (userData.publicData === undefined || user.publicData === undefined) {
    return <h3>Loading</h3>;
  } else {
    return (
      <>
        {createRegularProfilePage(userData, user, handleSwitch, setShowModal)}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
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
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleAboutMeUpdate()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default ProfilePage;

const createProfessionalProfilePage = (user) => {
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

//userData is the user whos profile page it is
//user is the user accessing that information
const createRegularProfilePage = (
  userData,
  user,
  handleSwitch,
  setShowModal
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
                  {user.publicData.is_professional ||
                  user.roles.includes("Admin") ? (
                    <Button className="m-1 btn-chat">Message Now!</Button>
                  ) : null}

                  {user.roles.includes("Admin") ? (
                    <Button className="m-1 btn-chat">Delete User</Button>
                  ) : null}
                </div>
              </Card.Body>
            </Card>

            <Card className="m-4">
              <Card.Body>
                <Card.Title>Questionnaire Results</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Card.Text>Results Go Here!</Card.Text>
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
                    <div className="d-flex justify-content-between mb-2">
                      <Card.Title>Personal Goals</Card.Title>
                      <Card.Link
                        className="clickable"
                        onClick={() => console.log("Editting")}
                      >
                        Edit
                      </Card.Link>
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
