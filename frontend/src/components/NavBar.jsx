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
              <div className='w-50'>
                <h4 className="w-75 clickable-nav" onClick={() => navigate("/")}>
                  <img className="logo" src="/favicon.ico" alt="icon" />Military Anonymous
                </h4>
                <h6 className="slogan w-75 mt-0 pe-4 text-end ">Connect Anonymously. Thrive Openly.</h6>
              </div>
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
