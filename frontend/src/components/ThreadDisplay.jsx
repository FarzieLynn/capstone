import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { AppContext } from "../App";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate, useParams } from "react-router-dom";

function ThreadDisplay() {
  const [comments, setComments] = useState([]);
  const [thread, setThread] = useState();
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const { user, url, token } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    //fetch thread details
    fetch(`${url}/threads/id/${id}`)
      .then((res) => res.json())
      .then((data) => setThread(data));

    //fetch comments
    fetch(`${url}/comments/post/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [url, id]);

  const handleSubmit = (e) => {
    const obj = {
      comment_author: user.publicData.id,
      thread_id: thread.id,
      comment_content: value,
    };

    fetch(`${url}/comments/new`, {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments([
          ...comments,
          {
            comment_content: data.comment_content,
            thread_id: data.thread_id,
            username: user?.publicData.is_anonymous
              ? "Anonymous"
              : user?.publicData.username,
            comment_timestamp: data.comment_timestamp,
          },
        ]);
        setValue("");
      });
  };

  const handleDelete = () => {
    console.log('deleting!')
    fetch(`${url}/threads/id/${id}`, {
      method: "DELETE",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.json())

    setShowModal(false);
    navigate('/forums');
  };

  return (
    <>
      <Container fluid className="forums-main">
        <Row className="justify-content-center">
          <Col md={6}>
            <Container className="flex-column justify-content-center">
              <Button
                className="m-2 btn-chat"
                variant="primary"
                onClick={(e) => navigate("/forums")}
              >
                Back
              </Button>
              {thread?.username === user?.publicData?.username ||
              user?.roles.includes("Admin") ? (
                <>
                  <Button
                    className="m-2 btn-chat"
                    variant="primary"
                    onClick={(e) => navigate(`/threads/${thread.id}/edit`)}
                  >
                    Edit Post
                  </Button>
                  <Button
                    className="m-2 btn-chat"
                    variant="primary"
                    onClick={(e) => setShowModal(true)}
                  >
                    Delete Post
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Container>
            {createThreadCard(thread, user)}
            {thread ? (
              comments.map((comment) => {
                return createCommentCard(comment, user);
              })
            ) : (
              <div>Loading...</div>
            )}
          </Col>
        </Row>
        <br />
        <Row className="justify-content-center">
          <Col md={6} data-color-mode="light">
            <span>Post a comment:</span>
            <MDEditor value={value} onChange={setValue} />
            <Button
              variant="primary"
              className="m-2 btn-chat"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
            <Button
              variant="primary"
              className="btn-chat"
              onClick={() => setValue("")}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={() =>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ThreadDisplay;

const createThreadCard = (thread, user) => {
  return (
    <Card className="m-1" key={thread?.thread_id}>
      <Card.Header>
        <Card.Title className="m-2">{thread?.thread_title}</Card.Title>
      </Card.Header>
      <Card.Subtitle className="m-2 text-muted">
        {thread?.is_anonymous ? "Anonymous" : thread?.username}
      </Card.Subtitle>
      <Card.Body data-color-mode="light">
        <MDEditor.Markdown
          source={thread?.thread_content}
          style={{ whiteSpace: "pre-wrap" }}
          preview="preview"
        />
      </Card.Body>
      <Card.Footer>
        <Card.Text className="text-muted">
          Posted on: {new Date(thread?.thread_timestamp).toDateString()}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};

const createCommentCard = (comment, user) => {
  return (
    <Card className="m-1" key={comment?.comment_id}>
      <Card.Subtitle className="m-2 text-muted">
        {comment?.is_anonymous ? "Anonymous" : comment?.username}
      </Card.Subtitle>
      <Card.Body data-color-mode="light">
        <MDEditor.Markdown
          source={comment?.comment_content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </Card.Body>
      <Card.Footer>
        <Card.Text className="text-muted">
          Posted on: {new Date(comment?.comment_timestamp).toDateString()}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};
