import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../App";
import { DismissableAlert } from "../components/DismissableAlert";

function ThreadEditPage() {
  const [value, setValue] = React.useState("**Your Thread Here**");
  const [originalThread, setOriginalThread] = useState();
  const [title, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState();

  const { user, url, token } = useContext(AppContext);

  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(()=>{
    fetch(`${url}/threads/id/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setOriginalThread(data);
        setTitle(data.thread_title);
        setValue(data.thread_content);
      });
  }, [url, id])

  const handleSubmit = () => {
    if (value === "" || value === originalThread.thread_content) {
      setShowAlert(true);
      setAlert({
        message: "Please change something before attempting to edit this post.",
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

    fetch(`${url}/threads/id/${id}`, {
      method: "PATCH",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      body: JSON.stringify({
        thread_title: title,
        thread_content: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => navigate(`/threads/${id}`));
  };
  
  return (
    <Container fluid className="forums-main">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Edit Post</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
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
          {showAlert ? (
            <DismissableAlert alert={alert} setShowAlert={setShowAlert} />
          ) : null}
          <Button
            variant="primary"
            className="m-2 btn-chat"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
          <Button
            className="btn-chat"
            variant="primary"
            onClick={(e) => navigate(`/threads/${id}`)}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ThreadEditPage