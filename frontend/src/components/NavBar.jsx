import React, { useContext } from "react";
import "../stylesheets/NavBar.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, setUser, url } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch(`${url}/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setUser({})
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (user === undefined) {
    return <h1>Loading</h1>
  } else {
    return (
      <>
      <div id="filler" className='filler'>
      </div>
      <Navbar className="navbar-main text-light" fixed="top">
        <Container className="flex-column justify-content-around navbar-container">
          <Nav className="w-100 align-items-center">
            <h4 className="w-50 clickable" onClick={() => navigate("/")}>
              Military Anonymous
            </h4>
            <Nav className="w-75 justify-content-end">
              {user.publicData !== undefined ? <><span className="me-1">Hello, <strong>{user.publicData.is_anonymous ? user.publicData.anon_username : user.publicData.username}</strong> |</span>
                <span className="navbar-links me-2" onClick={() => navigate('/chat')}>
                  Messages
                </span>
                <span className="navbar-links me-1" onClick={() => navigate('/forums')}>
                  Forums
                </span>
                <span>|</span>
                <span
                  className="ms-1 me-2 navbar-links"
                  onClick={() => navigate(`/profile/${user?.publicData.username}`)}
                >
                  Profile
                </span>
                <span className="navbar-links" onClick={() => handleLogout()}>
                  Logout
                </span>
              </> : (
                <span className="navbar-links" onClick={() => navigate("/login")}>
                  Login
                </span>
              )}
            </Nav>
          </Nav>
          <Nav className="w-100 justify-content-evenly align-items-center">
            <span
              className="navbar-links fs-5"
              onClick={() => navigate("/financeinfo")}
            >
              Finance
            </span>
            <span
              className="navbar-links fs-5"
              onClick={() => navigate("/fitness")}
            >
              Fitness
            </span>
            <span
              className="navbar-links fs-5"
              onClick={() => navigate("/mentalhealthinfo")}
            >
              Mental Health
            </span>
            <span
              className="navbar-links fs-5"
              onClick={() => navigate("/mentorship")}
            >
              Mentorship
            </span>
          </Nav>
        </Container>
      </Navbar>
      </>
    )
  };
};

export default NavBar;
