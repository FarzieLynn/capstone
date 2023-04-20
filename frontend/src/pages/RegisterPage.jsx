import React, { useContext, useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom'


function RegisterPage() {
  const [loginFailed] = useState(false);
  const navigate = useNavigate();
  const { url } = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, password, password_confirm, full_name, branch, status, age_group, gender, isAnon} =
      document.forms[0];

      var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
      let outArr = [];

      for(let i = 0; i < checkboxes.length; i++){
        outArr.push(checkboxes[i].name);
      }

    if (password.value === "" || username.value === "" || password_confirm.value === "" || full_name.value === "") {
      alert("Please fill out all form elements.");
      return;
    }else if(password.value !== password_confirm.value){
      alert("passwords must match!");
      return;
    }

    fetch(`${url}/users`, {
      method: "POST",
      body: JSON.stringify({
        username: username.value.toLowerCase(),
        password: password.value,
        full_name:full_name.value,
        branch:branch.value,
        current_status:status.value,
        age_group:age_group.value,
        gender:gender.value,
        is_anonymous:isAnon.checked,
        personal_goals: outArr
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => {
      if (data.ok) {
        alert("Account created!");
        navigate('/login')
      } else if (data.status === 400) {
        alert("Username already exists. Please pick a new username.");
      }
    });
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