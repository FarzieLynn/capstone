import { Form, Button, Row, Col } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm({ loginFailed, handleSubmit }) {
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
          <Form.Text className="text-light">
            All information is kept anonymous if specified.
          </Form.Text>
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
      <Row className="mb-3">
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

      <Form.Group as={Col}>
        <Form.Label>Military Status</Form.Label>
        <Form.Select type="text" name="status" placeholder="Military Status">
          <option>Active Duty</option>
          <option>Reserves</option>
          <option>Veteran</option>
          <option>Civilian</option>
        </Form.Select>
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col}>
        <Form.Label>Age Group</Form.Label>
        <Form.Select type="text" name="age_group" placeholder="Age Group">
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

      <Form.Group as={Col}>
        <Form.Label>Gender</Form.Label>
        <Form.Select type="text" name="gender" placeholder="Gender">
          <option>Male</option>
          <option>Female</option>
          <option>Binary</option>
          <option>Non-Binary</option>
          <option>Prefer not to answer</option>
        </Form.Select>
      </Form.Group>
    </Row>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" name="isAnon" label="Anonymous Account?" />
      </Form.Group>

      <Form.Group className="mb-3" id="goalsGroup">
        <Form.Label>Personal Goals:</Form.Label>
        <Form.Check type="checkbox" id="goals1" name="Create and practice positive affirmations." label="Create and practice positive affirmations." />
        <Form.Check type="checkbox" id="goals2" name="Create a personal development plan." label="Create a personal development plan." />
        <Form.Check type="checkbox" id="goals3" name="Get rid of toxic habits." label="Get rid of toxic habits." />
        <Form.Check type="checkbox" id="goals4" name="Take more action." label="Take more action." />
        <Form.Check type="checkbox" id="goals5" name="Develop resilience." label="Develop resilience." />
        <Form.Check type="checkbox" id="goals6" name="Become the master of my financial situation." label="Become the master of my financial situation." />
        <Form.Check type="checkbox" id="goals7" name="Stop negative thoughts." label="Stop negative thoughts." />
        <Form.Check type="checkbox" id="goals8" name="Develop self awareness." label="Develop self awareness." />
        <Form.Check type="checkbox" id="goals9" name="Change my attitude and outlook on life." label="Change my attitude and outlook on life." />
        <Form.Check type="checkbox" id="goals10" name="Find a personal and professional mentor." label="Find a personal and professional mentor." />
        <Form.Check type="checkbox" id="goals11" name="Become more dedicated to a healthy lifestyle." label="Become more dedicated to a healthy lifestyle." />
        <Form.Check type="checkbox" id="goals12" name="Find a workout routine that works for me." label="Find a workout routine that works for me." />
        <Form.Check type="checkbox" id="goals13" name="Embrace being a unique individual." label="Embrace being a unique individual." />
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

export default RegisterForm;
