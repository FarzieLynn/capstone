import React, { useState } from 'react'
import "../pages/stylesheets/BodyCompForm.css";

function BodyCompForm() {
    const [heights, setHeights] = useState(0)
    const [waist, setWaist] = useState(0)
    const [bodyComp, setBodyComp] = useState('')
  const [message, setMessage] = useState('')
 
  let calcBc = (event) => {
    //prevent submitting to the server
    event.preventDefault()

    if (waist === 0 || heights === 0) {
        alert('Please enter a valid waist measurement and height')
      } else {
        let bodyComp = (waist / heights)
        setBodyComp(bodyComp.toFixed(1))

        // Logic for message

        if (bodyComp < 0.55) {
            setMessage('Meets standard! Talk to a Fitness & Nutrition Coach!')
          } else {
            setMessage("Standard not met. Talk to a Fitness & Nutrition Coach!")
          }
      } 
  }

  let reload = () => {
    window.location.reload()
  }

  return (
    <div className='bc'>
        <div className='bc-cont'>
            <h2 className='center bc-2'>Body Composition Calculator</h2>
            <form onSubmit={calcBc}>
                <div>
                    <label>Waist (in)</label>
                    <input value={waist} onChange={(e) => setWaist(e.target.value)} />
                </div>

                <div>
                    <label>Height (in)</label>
                    <input
                    value={heights}
                    onChange={(event) => setHeights(event.target.value)} />
                </div>
                <div>
            <button className="btn-2" type="submit">
              Submit
            </button>
            <button className="btn-2 btn-outline btn-3" onClick={reload} type="submit">
              Reload
            </button>
          </div>
            </form>

            <div className='center bc-2'>
                <h3>Your Body Composition is: {bodyComp}</h3>
                <p>{message}</p>
            </div>
        </div>
        </div>
  )
}

export default BodyCompForm;