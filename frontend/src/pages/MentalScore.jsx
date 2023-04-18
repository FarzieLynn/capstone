import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './stylesheets/MentalHealth.css'
import './stylesheets/MentalScore.css'

const MentalScore = ({score}) => {
  const navigate = useNavigate()


  const exportPdf = () => {
      window.print()
       
  }
    
    
  
  return (
      <div>
      <span>Thanks for Completing the survey! Your condition is "{`${score}`}". Click the button to chat with a professional.</span>
      <button id="chatBtn" className='btn btn-dark pageBtn m-2' onClick={() => navigate('/chat')}>Chat With a Pro</button>
      <button id="printBtn" className='btn btn-dark pageBtn m-2' onClick={() => exportPdf()}>Print PDF</button>
      </div>
    )
}

export default MentalScore;
