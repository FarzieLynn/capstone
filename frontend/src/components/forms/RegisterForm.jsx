import { Form, Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm({ loginFailed, handleSubmit }) {
  const navigate = useNavigate();

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="full_name"
          placeholder="Enter first and last name"
        />
        <Form.Text className="text-muted">
          All information is kept anonymous if specified.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="password_confirm"
          placeholder="Confirm Password"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Military Branch</Form.Label>
        <Form.Select type="text" name="branch" placeholder="Military Branch">
          <option>Space Force</option>
          <option>Air Force</option>
          <option>Army</option>
          <option>Navy</option>
          <option>Marines</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Military Status</Form.Label>
        <Form.Select type="text" name="status" placeholder="Military Status">
          <option>Active Duty</option>
          <option>Reserves</option>
          <option>Veteren</option>
          <option>Civilian</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
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
        <Form.Check type="checkbox" name="isAnon" label="Anonymous Account?"/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Personal Goals:</Form.Label>
        <Form.Check type="checkbox" label="Create and practice positive affirmations."/>
        <Form.Check type="checkbox" label="Create a personal development plan."/>
        <Form.Check type="checkbox" label="Get rid of toxic habits." />
        <Form.Check type="checkbox" label="Take more action." />
        <Form.Check type="checkbox" label="Develop resilience." />
        <Form.Check type="checkbox" label="Become the master of my financial situation."/>
        <Form.Check type="checkbox" label="Stop negative thoughts." />
        <Form.Check type="checkbox" label="Develop self awareness." />
        <Form.Check type="checkbox" label="Change my attitude and outlook on life."/>
        <Form.Check type="checkbox" label="Find a personal and professional mentor."/>
        <Form.Check type="checkbox" label="Become more dedicated to a healthy lifestyle."/>
        <Form.Check type="checkbox" label="Find a workout routine that works for me."/>
        <Form.Check type="checkbox" label="Embrace being a unique individual."/>
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
