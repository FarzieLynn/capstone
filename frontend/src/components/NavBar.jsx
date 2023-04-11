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
      .then((data) => setUser({}))
      .catch((err) => console.log(err));
  };

  return (
    <Navbar className="navbar-main text-light">
      <Container className="flex-column justify-content-center">
        <Nav className="w-100 align-items-center">
          <h4 className="w-50" onClick={() => navigate("/")}>
            Military Anonymous
          </h4>
          <Nav className="w-50 justify-content-end">
            {user.publicData !== undefined ? <span className="me-2 navbar-links">Welcome, {user.publicData.username}</span> : null}
            <span
              className="me-2 navbar-links"
              onClick={() => navigate(`/${user?.publicData.username}`)}
            >
              Profile
            </span>
            {user.publicData !== undefined ? (
              <span className="navbar-links" onClick={() => handleLogout()}>
                Logout
              </span>
            ) : (
              <span className="navbar-links" onClick={() => navigate("/login")}>
                Login
              </span>
            )}
          </Nav>
        </Nav>
        <Nav className="w-100 justify-content-evenly align-items-center">
          <span
            className="navbar-links fs-5"
            onClick={() => navigate("/finance")}
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
  );
};

export default NavBar;
