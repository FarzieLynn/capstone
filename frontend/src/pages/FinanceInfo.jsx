import React, { useContext } from "react";
import "./stylesheets/FinanceInfo.css";
import { useNavigate } from "react-router-dom";
import ProfessionalsTable from "../components/ProfessionalsTable";
import { AppContext } from '../App'

function FinanceInfo() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext)

  return (
    <div className="finance ">
        <aside className="finance-aside">
          <h3 className="title-aside">Quick Links</h3>
          <h5 className="finq" onClick={() => navigate("/finance")}>Financial Management Questionnaire</h5>
          <h5 className="fincal" onClick={() => navigate("/finance/calculator")}>Retirement Calculator</h5>
          <h5 className="bmical" onClick={() => navigate("/BMICal")}>BMI Calculator</h5>
          <h5 className="bccal" onClick={() => navigate("/BodyCompCal")}>Body Composition Calculator</h5>
          <h5 className="mentque" onClick={() => navigate("/mentalhealth")}>Mental Health Questionnaire</h5>
          <h5 className="homep" onClick={() => navigate("/")}>Home Page</h5>
        </aside>
      <div className="financeTitles d-flex flex-column align-items-center">
        <span className="financeTitleLg">Financial Management</span>

        <img
          className="financeImg"
          src="https://th.bing.com/th/id/R.f4cf610a60b0700d8ccb50c8c6997696?rik=k4AVXFRfx6kt%2bw&riu=http%3a%2f%2fclipart-library.com%2fimage_gallery2%2fFinance-Free-PNG-Image.png&ehk=rR%2b0ZAsx%2bfWmBb9IqI%2fDi37ZURUVEN8EAaAnV16zqeI%3d&risl=&pid=ImgRaw&r=0"
          width={600}
          height={400}
          alt=""
        />
      </div>
      
      <div className="financeBlurb text-center">
        <p>
          Welcome to our Financial Management page, dedicated to supporting
          active duty, reserve, and veteran service members with their financial
          needs. We understand that managing your finances can be challenging,
          especially with the unique circumstances of military life.
        </p>
        <p>
          As a service member, maintaining a healthy financial lifestyle is just
          as important as maintaining physical fitness. Financial freedom and
          security can provide you and your loved ones with the stability and
          peace of mind that you deserve.
        </p>
        <p>
          We, at Military Anonymous, understand the unique challenges that
          service members face when it comes to managing their finances.
          Deployment, relocation, and frequent changes in income can make it
          difficult to create and maintain a solid financial plan. However, by
          taking the financial management questionnaire and connecting with one
          of our experienced Financial Management counselors, you can take the
          first steps towards achieving your financial goals. Whether you need
          help creating a budget, planning for retirement, or managing debt, our
          team of experts are here to support you every step of the way.
        </p>
        <p>
          We believe that financial wellness is a crucial aspect of overall
          well-being, and we're committed to helping you achieve your financial
          goals. With our resources and support, you can feel confident in your
          financial decisions and secure in your financial future.
        </p>
        <p>
          We believe that every service member deserves financial security and
          freedom. By taking control of your finances, you can enjoy a brighter
          future for you and your family. So don't hesitate to connect with us
          today and take the first step towards a healthier financial lifestyle.
          </p>
          <p>
          Thank you for your service, and we look forward to supporting you on
          your financial journey.
        </p>
        <h3>Chat with a professional</h3>
        {user.publicData !== undefined ? <ProfessionalsTable type={'Financial Specialist'}/> : null}
      </div>
    </div>
  );
}

export default FinanceInfo;
