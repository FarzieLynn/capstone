import React from "react";
import "./stylesheets/FinanceInfo.css";
import { useNavigate } from "react-router-dom";
import ProfessionalsTable from "../components/ProfessionalsTable";

function FinanceInfo() {
  const navigate = useNavigate();

  return (
    <div className="finance vh-100%">
      <div className="financeTitles">
        <span className="financeTitleLg">Financial Management</span>

        <img
          className="financeImg"
          src="https://th.bing.com/th/id/R.f4cf610a60b0700d8ccb50c8c6997696?rik=k4AVXFRfx6kt%2bw&riu=http%3a%2f%2fclipart-library.com%2fimage_gallery2%2fFinance-Free-PNG-Image.png&ehk=rR%2b0ZAsx%2bfWmBb9IqI%2fDi37ZURUVEN8EAaAnV16zqeI%3d&risl=&pid=ImgRaw&r=0"
          width={600}
          height={400}
          alt=""
        />
      </div>
      <span>
        <h2 className="question">
          <strong>
            Click{" "}
            <span className="link-click" onClick={() => navigate("/finance")}>
              here{" "}
            </span>
            to take the Financial Management Questionnaire
          </strong>
        </h2>
      </span>
      <div className="financeBlurb">
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
      </div>
      <ProfessionalsTable type={'Financial Specialist'}/>
    </div>
  );
}

export default FinanceInfo;
