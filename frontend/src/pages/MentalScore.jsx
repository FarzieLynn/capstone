import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './stylesheets/MentalHealth.css'



const MentalScore = () => {
  const navigate = useNavigate()

  
  return (
      <div>
      <span>Thanks for Completing the survey! Click the button to chat with a professional.</span>
      <button className='btn btn-dark pageBtn m-2' onClick={() => navigate('/chat')}>Chat With a Pro</button>
      </div>
    )
}

export default MentalScore;
