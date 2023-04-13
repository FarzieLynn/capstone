import React, { useContext, useState } from "react";
import ProfessionalRegisterForm from "../components/forms/ProfessionalRegisterForm";
import { useNavigate } from 'react-router-dom'

function ProfessionalRegisterPage() {
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, password, password_confirm, full_name, email, phone, branch, gender, about_you, chk_mental, chk_finance, chk_fitness, chk_mentor} =
      document.forms[0];

    if (password.value === "" || username.value === "" || password_confirm.value === "" || full_name.value === "" || email.value === "" || phone.value === "") {
      alert("Please fill out all form elements.");
      return;
    }else if(password.value !== password_confirm.value){
      alert("passwords must match!");
      return;
    }else if(!chk_mental.checked && !chk_finance.checked && !chk_fitness.checked && !chk_mentor.checked){
      alert('Please select at least one specialty.');
    }

    let roles = [];

    if(chk_mental.checked) roles.push(3);
    if(chk_finance.checked) roles.push(4);
    if(chk_fitness.checked) roles.push(2);
    if(chk_mentor.checked) roles.push(5);

    fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify({
        username: username.value.toLowerCase(),
        password: password.value,
        full_name:full_name.value,
        email:email.value,
        phone_number:phone.value,
        branch:branch.value,
        gender:gender.value,
        about_you:about_you.value,
        is_professional:true,
        roles:roles,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => {
      if (data.ok) {
        navigate('/registerprofessionalagreement')
      } else if (data.status === 400) {
        alert("Username already exists. Please pick a new username.");
      }
    });
  };

  return (
    <div>
    <div className="login-page">
      <div className="login-form">
        <div className="title">Military Anonymous Professional Registration</div>
        {loginFailed ? (
          <div> is successfully logged in</div>
        ) : (
          <ProfessionalRegisterForm handleSubmit={handleSubmit} loginFailed={loginFailed} />
        )}
      </div>
    </div>
  </div>
  )
}

export default ProfessionalRegisterPage