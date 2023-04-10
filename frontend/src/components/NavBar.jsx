import React, { useContext } from 'react'
import '../stylesheets/NavBar.css'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { AppContext } from '../App';

const NavBar = () => {
  const {user, setUser, url} = useContext(AppContext);

  return (
    <Navbar className="navbar-main text-light">
        <Container>
          <h4>Military Anonymous</h4>
          <Nav className="w-25 justify-content-end">
            <span className="me-2 navbar-links">Profile</span>
            {user ? <span className="navbar-links">Logout</span> : <span className="navbar-links">Login</span>}
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar