import React, { useContext, useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { useNavigate } from 'react-router-dom'


function RegisterPage() {
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, password, password_confirm, full_name, branch, status, age_group, gender, isAnon} =
      document.forms[0];

      console.log(full_name.value, password_confirm.value, branch.value, status.value, age_group.value, gender.value, isAnon.checked)

    if (password.value === "" || username === "") {
      alert("Please fill out all form elements.");
      return;
    }

    // fetch("http://localhost:8080/users", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: username.value.toLowerCase(),
    //     password: password.value,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // }).then((data) => {
    //   if (data.ok) {
    //     alert("Account created!");
    //     navigate('/')
    //   } else if (data.status === 400) {
    //     alert("Username already exists. Please pick a new username.");
    //   }
    // });
  };

  return (
    <div>
    <div className="login-page">
      <div className="login-form">
        <div className="title">Military Anonymous Registration</div>
        {loginFailed ? (
          <div> is successfully logged in</div>
        ) : (
          <RegisterForm handleSubmit={handleSubmit} loginFailed={loginFailed} />
        )}
      </div>
    </div>
  </div>
  )
}

export default RegisterPage