import { useNavigate } from 'react-router-dom'
import './stylesheets/MentalHealth.css'
import './stylesheets/MentalScore.css'

const MentalScore = ({score}) => {
  const navigate = useNavigate()

  const nav = () => {
      navigate('/mentalResults') 
  }
    
  
  return (
      <div id="top">
      <span>Thanks for Completing the survey! Your condition is "{`${score}`}". Click the button to chat with a professional.</span>
      <button id="chatBtn" className='btn btn-dark pageBtn m-2' onClick={() => navigate('/chat')}>Chat With a Pro</button>
      <button id="printBtn" className='btn btn-dark pageBtn m-2' onClick={() => nav()}>See Results</button>
      </div>
    )
}

export default MentalScore;
