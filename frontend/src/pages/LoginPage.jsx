import React, { useContext, useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { AppContext } from '../App';
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import '../stylesheets/LoginPage.css'

function LoginPage() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    var { username, password } = document.forms[0];

    if (username.value === "" || password.value === "") {
      alert("please fill out your username and password");
      return;
    }

    if (username.value !== "" && password !== "") {
      setLoading(true);
      fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: username.value.toLowerCase(),
          password: password.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((data) => {
          return data.json();
        })
        .then(data => {
          if (data.error === undefined) {
            console.log('login successful. Setting user info.', data)
            setLoading(true);
            setUser(data);
            navigate('/');
          } else {
            setLoading(false);
            setAlert(data);
          }
        });
    }
  };

  return (
    <div>
      <div className="login-page">
        <div className="login-form">
          <div className="title">Military Anonymous Login</div>
          {loginFailed ? (
            <div> is successfully logged in</div>
          ) : (
            <>
              <LoginForm handleSubmit={handleSubmit} alert={alert} />
            </>
          )}
        </div>
        {loading === true ? <Spinner /> : <></>}
      </div>
    </div>
  );
}

export default LoginPage;
