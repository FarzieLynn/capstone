import React, { useContext } from "react";
import "./stylesheets/Fitness.css";
import { useNavigate } from "react-router-dom";
import ProfessionalsTable from "../components/ProfessionalsTable";
import { AppContext } from "../App";


/* change the onClick to a list of Fitness Coaches & Nutritiionists line 73*/

function FitnessPage() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  return (
    <div className="fitness d-flex flex-column align-items-center">
      <div className="fitnessTitles">
        <span className="fitnessTitleLg">Fitness & Nutrition</span>

        <img
          className="fitnessImg"
          src="https://www.armytimes.com/resizer/jKQ6OZT1Ib5auM8cKjYO8K-a77k=/1200x0/filters:quality(100)/arc-anglerfish-arc2-prod-mco.s3.amazonaws.com/public/5DDCQX46TNCMND33WLPUDMOZ4E.jpg"
          width={900}
          height={600}
          alt=""
        />
      </div>
      
      <div className="fitnessBlurb text-center">
        <p>
        <aside className="fitness-aside">
          <h3 className="title-aside">Quick Links</h3>
          <h4 className="bmical" onClick={() => navigate("/BMICal")}>BMI Calculator</h4>
          <h4 className="bccal" onClick={() => navigate("/BodyCompCal")}>Body Composition Calculator</h4>
        </aside>
          Military fitness and nutrition are critical components of the overall
          health and well-being of service members. Whether you are serving on
          active duty or are a veteran, maintaining a healthy and active
          lifestyle is essential to your success in the military and beyond.
        </p>
        <p>
          Military fitness is about more than just physical strength - it's
          about building mental resilience, endurance, and agility. Service
          members must be able to perform under high-stress situations, often in
          challenging environments.
        </p>
        <p>
          Regular exercise and physical training are essential for building the
          physical and mental toughness required to meet these demands.
        </p>
        <p>
        <p>
        A well-rounded fitness program for military members includes strength
        training, cardiovascular exercise, and flexibility training. It's
        important to work with a certified fitness professional who understands
        the unique challenges and requirements of military service. They can
        help you develop a customized fitness plan that is tailored to your
        individual needs and goals.
        </p>
        In addition to regular exercise, nutrition plays a critical role in
        military fitness. A healthy and balanced diet can help you maintain a
        healthy weight, improve your energy levels, and reduce your risk of
        chronic health conditions. For military members, proper nutrition is
        also essential for maintaining optimal performance and mental clarity.
        </p>
        <p>
          A healthy military diet should include a variety of nutrient-dense
          foods, such as lean proteins, whole grains, fruits, and vegetables.
          It's also important to stay hydrated, especially in hot and humid
          environments. When it comes to nutrition, it's important to work with
          a registered dietitian who can help you develop a customized nutrition
          plan that meets your individual needs and goals.
        </p>
        <p>
          In summary, military fitness and nutrition are essential components of
          a healthy and active lifestyle for service members. Regular exercise,
          proper nutrition, and working with qualified professionals can help
          you maintain optimal physical and mental health, and improve your
          performance both in and out of the military. If you're a military
          member looking to improve your fitness and nutrition, there are many
          resources available to help you get started.
        </p>
      </div>
      {user.publicData !== undefined ? <ProfessionalsTable type={'Fitness Trainer'}/> : null}
    </div>
  );
}

export default FitnessPage;

/* change the onClick to a list of Fitness Coaches & Nutritiionists line 73*/