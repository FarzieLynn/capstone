import React, { useContext } from "react";
import "./stylesheets/Mentorship.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import ProfessionalsTable from "../components/ProfessionalsTable";


/* change the onClick to a list of Mentors line 64*/

function Mentorship() {
 const navigate = useNavigate()
 const { user } = useContext(AppContext);
 
  return (
    <div className="mentorship">
      <aside className="finance-aside">
          <h3 className="title-aside">Quick Links</h3>
          <h5 className="finq" onClick={() => navigate("/finance")}>Financial Management Questionnaire</h5>
          <h5 className="fincal" onClick={() => navigate("/finance/calculator")}>Retirement Calculator</h5>
          <h5 className="bmical" onClick={() => navigate("/BMICal")}>BMI Calculator</h5>
          <h5 className="bccal" onClick={() => navigate("/BodyCompCal")}>Body Composition Calculator</h5>
          <h5 className="mentque" onClick={() => navigate("/mentalhealth")}>Mental Health Questionnaire</h5>
          <h5 className="homep" onClick={() => navigate("/")}>Home Page</h5>
        </aside>
      <div className="mentorTitles">
        <span className="mentorTitleLg">Mentorship</span>

        <img
          className="mentorImg"
          src="https://modernmoney.ca/wp-content/uploads/2021/01/shutterstock_556392739-scaled.jpg"
          width={900}
          height={600}
          alt=""
        />
      </div>
      <div className="mentorBlurb text-center">
        <p>
          Mentorship is about building relationships and creating a supportive
          community. At its core, mentorship involves a relationship between a
          mentor - an experienced and knowledgeable guide - and a mentee -
          someone who is seeking guidance and support in their personal or
          professional life. Whether you are a mentee looking for guidance or a
          mentor looking to give back, on Military Anonymous, we have provided a
          networking forum to help you get started. From there, you will find
          several opportunities to connect with others and build meaningful
          relationships.
        </p>

        <aside className="mentee">
          <h3 className="grow">G. R. O. W.</h3>
          <h6>Tips for the Mentee</h6>
          <p>
            <strong>G - Goals: </strong>Set clear goals and expectations for
            your mentoring relationship
          </p>
          <p>
            <strong>R - Responsibility: </strong> Take responsibility for your
            own progress and development. Follow through on commitments, and be
            honest about any challenges or obstacles you encounter.
          </p>
          <p>
            <strong>O - Open-mindedness: </strong>Listen and
            consider your mentor's advice and feedback. Keep an open mind and be
            willing to learn from their experience and expertise.
          </p>
          <p>
            <strong>W - Willingness: </strong>Be willing to take action and
            make changes to achieve your goals.
          </p>
        </aside>

        <aside className="mentor">
          <h3 className="lead">L. E. A. D.</h3>
          <h6>Tips for the Mentor</h6>
          <p>
            <strong>L - Listen: </strong>Listen carefully to your mentee's
            concerns, questions, and goals. Allow them to express themselves
            freely without interrupting or judging.
          </p>
          <p>
            <strong>E - Empower: </strong>Empower your mentee to take ownership
            of their growth and development. Encourage your mentee to take
            risks, learn from their mistakes, and grow in their personal and
            professional lives. Help them set realistic goals, and celebrate
            their successes along the way.
          </p>
          <p>
            <strong>A - Advise: </strong>Offer guidance and advice based on your
            own experiences and expertise. Help your mentee identify their
            strengths, weaknesses, and opportunities for growth.
          </p>
          <p>
            <strong>D - Develop: </strong>Help your mentee develop new skills,
            knowledge, and perspectives.
          </p>
        </aside>
      </div>
      <div className="d-flex flex-column align-items-center proftable">
        {user.publicData !== undefined ? <h3>Chat with a professional</h3> : null}
        {user.publicData !== undefined ? <ProfessionalsTable type={'Mentor'}/> : null}
      </div>
    </div>
  );
}

export default Mentorship;

/* change the onClick to a list of Mentors line 64*/
