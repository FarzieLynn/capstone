import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import "./stylesheets/Forums.css";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

function ForumSection({ type }) {
  const [threads, setThreads] = useState([]);

  const navigate = useNavigate();

  const { url } = useContext(AppContext);

  useEffect(() => {
    fetch(`${url}/threads`)
      .then((res) => res.json())
      .then((data) => setThreads(data));
  }, [url]);

  return (
    <Container fluid className="forums-main">
      <Row className="justify-content-center">
        <Col md={8}>
          <Button onClick={() => navigate("/threads/new")} className="mt-3 btn-chat">
            New Thread
          </Button>
          <Card
            className="mt-2 p-3 clickable "
            onClick={() => navigate('/forums/finance')}
          >
            <Card.Title>Finance Threads</Card.Title>
            <Card.Subtitle className="text-muted">Total posts: {threads.filter((item) => item.thread_type === 'Finance').length}</Card.Subtitle>
          </Card>
          {getTop3Posts('Finance', threads, navigate)}
          <Card
            className="mt-5 p-3 clickable"
            onClick={() => navigate('/forums/fitness')}
          >
            <Card.Title>Fitness Threads</Card.Title>
            <Card.Subtitle className="text-muted">Total posts: {threads.filter((item) => item.thread_type === 'Fitness').length}</Card.Subtitle>
          </Card>
          {getTop3Posts('Fitness', threads, navigate)}
          <Card
            className="mt-5 p-3 clickable"
            onClick={() => navigate('/forums/mentalhealth')}
          >
            <Card.Title>Mental Health Threads</Card.Title>
            <Card.Subtitle className="text-muted">Total posts: {threads.filter((item) => item.thread_type === 'Mental Health').length}</Card.Subtitle>
          </Card>
          {getTop3Posts('Mental Health', threads, navigate)}
          <Card
            className="mt-5 p-3 clickable"
            onClick={() => navigate('/forums/mentorship')}
          >
            <Card.Title>Mentorship/Career Guidance Threads</Card.Title>
            <Card.Subtitle className="text-muted">Total posts: {threads.filter((item) => item.thread_type === 'Mentorship').length}</Card.Subtitle>
          </Card>
          {getTop3Posts('Mentorship', threads, navigate)}
        </Col>
      </Row>
      <div className="extender-20"></div>
    </Container>
  );
}

export default ForumSection;

const getTop3Posts = (type, threads, navigate) => {
  const filt = threads.filter((item) => item.thread_type === type).slice(0, 3);

  if (filt.length > 0) {
    return filt.map((item) => {
      return (
        <Card className="mt-2 clickable">
          <Card.Header>
            <Card.Title onClick={() => navigate(`/threads/${item.id}`)}>
              {item.thread_title}
            </Card.Title>
          </Card.Header>
          <Card.Body data-color-mode="light">
            By: {item.is_anonymous ? "Anonymous" : item.username}
          </Card.Body>
        </Card>
      );
    });
  } else {
    return (
      <Card className="mt-2">
        <Card.Title>No threads :(</Card.Title>
        <Card.Text>Try posting one!</Card.Text>
      </Card>
    );
  }
};