import React, { useContext } from 'react'
import {Container, Button} from 'react-bootstrap';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

function ThreadCreatePage({thread_type}) {
  const [value, setValue] = React.useState("**Hello world!!!**");

  const {user, url, token} = useContext(AppContext);  

  const navigate = useNavigate();

  const handleSubmit = () => {
    let userID = user.publicData.id;
    let threadType = 'Mentor'

    fetch(`${url}/threads/new`, {
        method: "POST",
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
        body:JSON.stringify({
          thread_type:threadType,
          thread_author:userID,
          thread_content:value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
    })
    .then(res =>res.json())
    .then(data => console.log(data));
  }

  return (
    <Container>
      <MDEditor
        value={value}
        onChange={setValue}
      />
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