import React, { useContext, useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import {AppContext} from '../App';

function LoginPage() {
  const [loginFailed, setLoginFailed] = useState(false);

  const {user, setUser} = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    var { username, password } = document.forms[0];

    if (username.value === "" || password.value === "") {
      alert("please fill out your username and password");
      return;
    }

    if (username.value !== "" && password !== "") {
      fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((data) => data.json())
      .then(data => setUser(data));
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
            <LoginForm handleSubmit={handleSubmit} loginFailed={loginFailed} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
