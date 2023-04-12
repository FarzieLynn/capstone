import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AppContext } from "../App";
import MDEditor from "@uiw/react-md-editor";

function ThreadDisplay({ thread_id }) {
  const [comments, setComments] = useState([]);
  const [thread, setThread] = useState();
  const [value, setValue] = React.useState("");

  const { user, url, token } = useContext(AppContext);

  useEffect(() => {
    //fetch thread details
    fetch(`${url}/threads/id/1`)
      .then((res) => res.json())
      .then((data) => setThread(data));

    //fetch comments
    fetch(`${url}/comments/post/1`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  const handleSubmit = (e) => {
    const obj = {
      comment_author:user.publicData.id,
      thread_id:thread.id,
      comment_content:value
    };


    fetch(`${url}/comments/new`, {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      body:JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
  })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={8}>
          {createThreadCard(thread)}
          {thread ? (
            comments.map((comment) => {
              return createCommentCard(comment);
            })
          ) : (
            <div>Loading...</div>
          )}
        </Col>
      </Row>
      <br />
      <Row className="justify-content-center">
        <Col md={8}>
          <span>Post a comment:</span>
          <MDEditor value={value} onChange={setValue} />
          <Button
            variant="primary"
            className="m-2"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
          <Button variant="primary" onClick={() => setValue('')}>Cancel</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ThreadDisplay;

const createThreadCard = (thread) => {
  return (
    <Card className="m-1">
      <Card.Title>This is thread #1!</Card.Title>
      <Card.Body>
        <MDEditor.Markdown
          source={thread?.thread_content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </Card.Body>
      <Card.Footer>
        <Card.Text>By: {thread?.username}</Card.Text>
        <Card.Text>Posted at: {thread?.thread_timestamp}</Card.Text>
      </Card.Footer>
    </Card>
  );
};

const createCommentCard = (comment) => {
  return (
    <Card className="m-1">
      <Card.Body>
        <MDEditor.Markdown
          source={comment?.comment_content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </Card.Body>
      <Card.Footer>
        <Card.Text>By: {comment?.username}</Card.Text>
        <Card.Text>Posted at: {comment?.comment_timestamp}</Card.Text>
      </Card.Footer>
    </Card>
  );
};
