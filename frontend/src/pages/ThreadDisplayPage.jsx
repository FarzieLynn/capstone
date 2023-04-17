import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Row,
  Col,
  Container,
  Accordion,
  Button,
  Pagination,
} from "react-bootstrap";
import "./stylesheets/Forums.css";
import { AppContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

function ThreadDisplayPage() {
  const [pages, setPages] = useState(1);
  const [shownPage, setShownPage] = useState(1);
  const [pageItems, setPageItems] = useState([]);
  const [threads, setThreads] = useState([]);
  const [shownThreads, setShownThreads] = useState(threads);

  const navigate = useNavigate();

  const { type } = useParams();

  const { url } = useContext(AppContext);

  useEffect(() => {
    fetch(`${url}/threads/type/${type}`)
      .then((res) => res.json())
      .then((data) => setThreads(data));
  }, [type, url]);

  useEffect(() => {
    setPageItems(createPagination(pages, shownPage, setShownPage));
  }, [pages, shownPage]);

  useEffect(() => {
    let numberPerPage = 10;
    setPages(Math.ceil(threads.length / numberPerPage));

    setShownThreads(
      threads.slice(numberPerPage * (shownPage - 1), numberPerPage * shownPage)
    );
  }, [threads, shownPage]);

  return (
    <Container fluid className="forums-main">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Button
            className="mt-3 btn-chat"
            variant="primary"
            onClick={(e) => navigate("/forums")}
          >
            Back
          </Button>
          <Pagination className="mt-3">{pageItems}</Pagination>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8}>
          {shownThreads.map((item) => {
            return (
              <Card className="mb-2 clickable">
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
          })}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Pagination className="mt-1">{pageItems}</Pagination>
        </Col>
      </Row>
      <div className="extender-20"></div>
    </Container>
  );
}

export default ThreadDisplayPage;

function createPagination(pages, shownPage, setShownPage) {
  let items = [];

  if (pages <= 11) {
    for (let i = 1; i <= pages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === shownPage}
          onClick={() => setShownPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    for (let i = 1; i <= 11; i++) {
      if (shownPage <= 6) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === shownPage}
            onClick={() => setShownPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      } else if (shownPage > 6 && pages - 6 >= shownPage) {
        items.push(
          <Pagination.Item
            key={i}
            active={i + shownPage - 6 === shownPage}
            onClick={() => setShownPage(i + shownPage - 6)}
          >
            {i + shownPage - 6}
          </Pagination.Item>
        );
      } else {
        items.push(
          <Pagination.Item
            key={i}
            active={i + (pages - 11) === shownPage}
            onClick={() => setShownPage(i + (pages - 11))}
          >
            {i + (pages - 11)}
          </Pagination.Item>
        );
      }
    }
  }

  return items;
}
