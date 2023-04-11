import React, { useContext, useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { AppContext } from '../App';
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

function LoginPage() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

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
          username: username.value,
          password: password.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((data) => data.json())
        .then(data => {
          console.log('login successful. Setting user info.', data)
          setLoading(false);
          setUser(data);
          navigate('/');
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
              <LoginForm handleSubmit={handleSubmit} loginFailed={loginFailed} />
            </>
          )}
        </div>
        {loading ? <Spinner /> : <></>}
      </div>
    </div>
  );
}

export default LoginPage;
