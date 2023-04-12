import React from "react";
import "./stylesheets/Mentorship.css";
import { useNavigate } from "react-router-dom";

/* change the onClick to a list of Mentors line 64*/

function Mentorship() {
  const navigate = useNavigate();

  return (
    <div className="mentorship vh-100%">
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
      <div className="mentorBlurb">
        <p>
          Mentorship is a valuable tool for personal and professional growth. At
          its core, mentorship involves a relationship between a mentor - an
          experienced and knowledgeable guide - and a mentee - someone who is
          seeking guidance and support in their personal or professional life.
        </p>
        <p>
          Mentorship can take many forms, from informal relationships that
          develop naturally over time to more formal programs that are
          structured and organized. Regardless of the format, mentorship
          provides a wealth of benefits for both the mentor and the mentee.
        </p>
        <p>
          For the mentee, having a mentor can provide a source of inspiration
          and motivation, as well as a sounding board for ideas and feedback. A
          mentor can help to identify strengths and weaknesses, provide guidance
          on career or personal decisions, and offer insights into industry
          trends or best practices.
        </p>
        <p>
          For the mentor, the opportunity to share knowledge and experience can
          be incredibly rewarding. Mentoring allows for a deeper connection with
          the mentee and provides an opportunity to give back to the community.
          It can also help the mentor stay current in their field and learn from
          the mentee's unique perspective.
        </p>
        <p>
          At its core, mentorship is about building relationships and creating a
          supportive community. Whether you are a mentee looking for guidance or
          a mentor looking to give back, there are many resources available to
          help you get started. From online mentorship programs to local
          networking groups, there are many opportunities to connect with others
          and build meaningful relationships.
        </p>
        <p>
          In summary, mentorship is a powerful tool for personal and
          professional growth. Whether you are a mentee seeking guidance or a
          mentor looking to give back, mentorship provides a wealth of benefits
          for all involved. If you are interested in pursuing mentorship, there
          are many resources available to help you get started.
        </p>
        <p className="mentorAlert">
      <strong>Click <span className="linky" onClick={() => navigate('/register')}>here</span> to choose from our list of certified Mentors</strong>
      </p>
      </div>
    </div>
  );
}

export default Mentorship;

/* change the onClick to a list of Mentors line 64*/