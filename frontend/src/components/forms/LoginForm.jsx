import { Form, Button } from "react-bootstrap";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm({ loginFailed, handleSubmit }) {
  const navigate = useNavigate();

  const renderErrorMessage = () => {
    return <div className="error">{"invalid username or password"}</div>;
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name='username' placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </Form.Group>
      <Button variant="primary" className="m-2" onClick={(e)=> {handleSubmit(e)}} >
        Submit
      </Button>

      <Button variant="primary" onClick={(e) => navigate('/register')}>
        Register
      </Button>

    </Form>
  );
}

export default LoginForm;
