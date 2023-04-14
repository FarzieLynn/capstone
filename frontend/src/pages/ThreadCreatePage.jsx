import React, { useContext, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { DismissableAlert } from "../components/DismissableAlert";

function ThreadCreatePage({ thread_type }) {
  const [value, setValue] = React.useState("**Your Thread Here**");
  const [title, setTitle] = useState("");
  const [threadType, setThreadType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "Please choose where to post your thread",
    error: true,
  });

  const { user, url, token } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = () => {
    let userID = user.publicData.id;

    if (threadType === "") {
      setShowAlert(true);
      setAlert({
        message: "Please choose where to post your thread.",
        error: true,
      });
      return;
    } else if (value === "" || value === "**Your Thread Here**") {
      setShowAlert(true);
      setAlert({
        message: "Please write something before attempting to post.",
        error: true,
      });
      return;
    } else if (title === "") {
      setShowAlert(true);
      setAlert({
        message: "Please choose a title for your thread.",
        error: true,
      });
      return;
    }

    setShowAlert(false);

    fetch(`${url}/threads/new`, {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      body: JSON.stringify({
        thread_title:title,
        thread_type: threadType,
        thread_author: userID,
        thread_content: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => navigate(`/threads/${data.id}`));
  };

  return (
    <Container>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <MDEditor
        value={value}
        onChange={setValue}
        className="mt-3"
        data-color-mode="light"
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="m-1">Post Thread to: </Form.Label>
          <Form.Check
            inline
            type="radio"
            value="Mental Health"
            name="group1"
            label="Mental Health"
            onChange={(e) => setThreadType(e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            value="Finance"
            name="group1"
            label="Finance"
            onChange={(e) => setThreadType(e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            value="Fitness"
            name="group1"
            label="Fitness"
            onChange={(e) => setThreadType(e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            value="Mentorship"
            name="group1"
            label="Mentorship"
            onChange={(e) => setThreadType(e.target.value)}
          />
        </Form.Group>
      </Form>
      {showAlert ? (
        <DismissableAlert alert={alert} setShowAlert={setShowAlert} />
      ) : null}
      <Button
        variant="primary"
        className="m-2"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </Button>
      <Button variant="primary" onClick={(e) => navigate("/login")}>
        Cancel
      </Button>
    </Container>
  );
}

export default ThreadCreatePage;
