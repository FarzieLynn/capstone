import React, { useState } from "react";
import "../pages/stylesheets/BmiForm.css";
import { useNavigate } from "react-router-dom";

function BmiForm() {
  const navigate = useNavigate();
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
 
  let calcBmi = (event) => {
    //prevent submitting to the server
    event.preventDefault()
 
    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi = (weight / (height * height) * 703)
      setBmi(bmi.toFixed(1))
 
      // Logic for message
 
      if (bmi < 18.9) {
        setMessage('You are considered to be underweight')
      } else if (bmi >= 18.9 && bmi < 24.9) {
        setMessage('You are considered to be at a healthy weight')
      }  else if (bmi >= 25 && bmi < 29.9) {
        setMessage('You are considered to be slightly overweight. Please check your Body Composition')
      } else {
        setMessage('Please check your Body Composition')
      }
    }
  }
 
 
  let reload = () => {
    window.location.reload()
  }
 
  return (
    <div className="bmi">
    <div className='container-1'>
      <h2 className='center'>BMI Calculator</h2>
      <form onSubmit={calcBmi}>
 
        <div>
          <label>Weight (lbs)</label>
          <input value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
 
        <div>
          <label>Height (in)</label>
          <input value={height} onChange={(event) => setHeight(event.target.value)} />
        </div>
 
        <div>
          <button className='btn' type='submit'>Submit</button>
          <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
        </div>
      </form>
 
      <div className='center'>
        <h3>Your BMI is: {bmi}</h3>
        <p>{message}</p>
      </div>
      <div>
    <h3 className='bc'>Check Body Composition <strong onClick={() => navigate("/BodyCompCal")}>here</strong></h3>
     </div>
    </div>
  </div>
  );
}

export default BmiForm
