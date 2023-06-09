import React, { useState, useContext } from "react";
import "./stylesheets/MentalHealthInfo.css";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ProfessionalsTable from "../components/ProfessionalsTable";
import { AppContext } from "../App";


function MentalHealthInfo() {
  const navigate = useNavigate();
  const [mentalHealthVisited, setMentalHealthVisited] = useState(false);
  const { user } = useContext(AppContext);

  return (
    <>
      <div className="mental">
        {!mentalHealthVisited ? <Alert className='text-center mt-4'>
          If you or someone you know is having an especially hard time, please consider reaching out to the Suicide Hotline at 800-273-TALK(8255).
          <Button onClick={() => setMentalHealthVisited(true)}>Close</Button>
        </Alert> : null}

        <div>
          <aside className="mental-aside">
            <h3 className="title-aside">Quick Links</h3>
            <h5 className="mentque" onClick={() => navigate("/mentalhealth")}>Mental Health Questionnaire</h5>
            <h5 className="finq" onClick={() => navigate("/finance")}>Financial Management Questionnaire</h5>
            <h5 className="fincal" onClick={() => navigate("/finance/calculator")}>Retirement Calculator</h5>
            <h5 className="bmical" onClick={() => navigate("/BMICal")}>BMI Calculator</h5>
            <h5 className="bccal" onClick={() => navigate("/BodyCompCal")}>Body Composition Calculator</h5>
            <h5 className="homep" onClick={() => navigate("/")}>Home Page</h5>
          </aside>
          <div className="mentalTitles d-flex flex-column align-items-center">
            <span className="mentalTitleLg">Mental Health</span>

            <img
              className="mentalImg"
              src="https://givingmd.com/wp-content/uploads/2020/10/practice-head.png"
              width={500}
              height={500}
              alt=""
            />
          </div>
          <div className="d-flex flex-column mentalBlurb text-center align-items-center">
            <p>
              Welcome to our Mental Health page. We are here to provide support for
              individuals who may be struggling with mental health challenges,
              especially those who have served or are currently serving in the
              military. We understand that military service can be rewarding, but it
              also comes with unique challenges that can affect your mental health.
            </p>
            <p>
              One of the most common military stressors is unfairness amongst peers.
              It can be challenging when you feel like you're putting in the same
              effort as your peers, but you're not getting the recognition you
              deserve. Inequality can also be a significant stressor, especially
              when it comes to promotions, assignments, and pay.
            </p>
            <p>
              We understand that there are stigmas surrounding bipolar syndrome, but
              it's important to remember that seeking help is not a sign of
              weakness. It takes strength to recognize that you need assistance, and
              we are here to support you in your journey towards healing and
              recovery.
            </p>
            <p>
              Post-traumatic stress disorder (PTSD) is another common military
              stressor that affects many service members. PTSD can be triggered by
              traumatic events, and symptoms can include nightmares, flashbacks,
              anxiety, and depression. We want to remind you that PTSD is a
              treatable condition, and there is help available.
            </p>
            <p>
              We also understand the importance of work-home-life balance. It can be
              challenging to balance the demands of military service with family
              obligations and personal time. It's essential to take care of yourself
              and make time for activities that bring you joy and relaxation.
            </p>
            <p>
              Depression is another mental health challenge that affects many
              people, including those who have served in the military. Depression
              can be caused by a variety of factors, including financial loss, loss
              of a family member, and other life stressors. It's crucial to seek
              help if you are experiencing symptoms of depression, such as feelings
              of sadness, hopelessness, or lack of energy.
            </p>
            <p>
              We want to remind you that seeking help is a sign of strength, not
              weakness. We have resources available to help you cope with the unique
              challenges of military service, and we encourage you to reach out if
              you need support. If you are struggling with suicidal thoughts, please
              call the Suicide Information Line to talk to someone who understands
              and can help you through this difficult time. If you have attempted
              suicide, please call 911 immediately.
            </p>
            <p>
              We also have an online chat available for you to talk to a certified
              mental health professional. This service is available to anyone who
              needs someone to talk to about what may be troubling them. Remember,
              taking care of your mental health is crucial. We're here to support
              you, and we hope you find the resources on our page helpful.
            </p>
            {user.publicData !== undefined ? <h3>Chat with a professional</h3> : null}
            {user.publicData !== undefined ? <ProfessionalsTable type={'Chaplain'}/> : null}
          </div>
        </div>

      </div>
    </>
  )
}

export default MentalHealthInfo;
