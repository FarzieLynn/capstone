import { Form, Button, Row, Col } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProfessionalRegisterForm({ loginFailed, handleSubmit }) {
  const navigate = useNavigate();

  return (
    <Form>
      <Row className="mb-3">
      <Form.Group as={Col}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="full_name"
          placeholder="Enter first and last name"
        />
      </Form.Group>
      </Row>

      <Row className="mb-3">
      <Form.Group as={Col} controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>

      <Form.Group as={Col} controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="password_confirm"
          placeholder="Confirm Password"
        />
      </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>.mil Email</Form.Label>
        <Form.Control type="text" name="email" placeholder="Enter email" />
      </Form.Group>

      <Row className="mb-3">
      <Form.Group as={Col}>
        <Form.Label>Phone/DSN</Form.Label>
        <Form.Control type="text" name="phone" placeholder="Enter phone #" />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>Military Branch</Form.Label>
        <Form.Select type="text" name="branch" placeholder="Military Branch">
          <option>Space Force</option>
          <option>Air Force</option>
          <option>Army</option>
          <option>Navy</option>
          <option>Marines</option>
        </Form.Select>
      </Form.Group>
      </Row>

      
      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select type="text" name="gender" placeholder="Gender">
          <option>Male</option>
          <option>Female</option>
          <option>Binary</option>
          <option>Non-Binary</option>
          <option>Prefer not to answer</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>About You</Form.Label>
        <Form.Control as="textarea" name="about_you" rows={3} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Specialties:</Form.Label>
        <Form.Check type="checkbox" name="chk_mental" label="Mental Health" />
        <Form.Check type="checkbox" name="chk_finance" label="Finance" />
        <Form.Check type="checkbox" name="chk_fitness" label="Fitness" />
        <Form.Check type="checkbox" name="chk_mentor" label="Mentorship" />
      </Form.Group>

      <Button
        variant="primary"
        className="m-2"
        onClick={(e) => handleSubmit(e)}
      >
        Create Account
      </Button>
      <Button variant="primary" onClick={(e) => navigate("/login")}>
        Cancel
      </Button>
    </Form>
  );
}

export default ProfessionalRegisterForm;
