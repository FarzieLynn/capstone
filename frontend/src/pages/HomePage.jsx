import React, { useContext } from "react";
import "../stylesheets/HomePage.css";
import { AppContext } from "../App";
import { DismissableAlert } from "../components/DismissableAlert";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate;
  const { user } = useContext(AppContext);

  return (
    <div className="homepage d-flex flex-column justify-content-center align-items-center">
      <img
        className="homepage-img"
        src="https://cache.desktopnexus.com/thumbseg/1489/1489087-bigthumbnail.jpg"
        alt="Two hands holding each other"
      ></img>
      <p className="homepage-intro">
        Welcome to our community - a safe and supportive space for military
        members, active duty, reserve and veterans, to seek guidance and support
        from professionals in the fields of mental health, finances, fitness &
        nutrition, and mentorship.
      </p>
      <p className="homepage-p">
        We know that seeking help can be difficult, which is why we've made it
        easy to connect with our team through our user-friendly application. All
        of our services are completely confidential and anonymous, so you can
        feel comfortable sharing your concerns and seeking the support you need.
        At our core, we believe in the importance of building strong and
        supportive communities. We are proud to serve military members and are
        committed to providing the highest level of care and support possible.
        Whether you are just starting your military career or are a veteran, we
        are here to help you navigate life's challenges and achieve your goals.
      </p>
      <p className="homepage-p">
        Here at Military Anonymous, we highly encourage every user, whether
        confidential or anonymous, to <strong className="goregis" onClick={() => navigate('/register')}>create a profile</strong> to experience the full
        use of resources available to include the direct Chat with our certified
        professionals and access to our networking forums. Take this path to register and start your journey towards health, happiness, and success!
      </p>
      <p className="homepage-p">
        Thank you for choosing to be a part of our community! We are happy you're here!
      </p>
    </div>
  );
};

export default HomePage;
