import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { createContext, useState, useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import FitnessPage from "./pages/FitnessPage";
import FinanceInfo from "./pages/FinanceInfo";
import FinancePage from "./pages/FinancePage";
import FinanceCalculator from "./pages/FinanceCalculator";
import Mentorship from "./pages/Mentorship";
import NotFoundPage from "./pages/NotFoundPage";
import ProfessionalRegisterPage from "./pages/ProfessionalRegisterPage";
import MentalHealth from "./pages/MentalHealth";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import cookie from "cookie";
import FinanceAdvanced from "./pages/FinanceAdvanced";
import FinanceBeginner from "./pages/FinanceBeginner";
import FinanceIntermediate from "./pages/FinanceIntermediate";
import MentalHealthInfo from "./pages/MentalHealthInfo";
import ProfilePage from "./pages/ProfilePage";
import ThreadCreatePage from './pages/ThreadCreatePage';
import Chat from "./pages/ChatPage";
import ProfessionalPrivacyAgreementPage from "./pages/ProfessionalPrivacyAgreementPage";
import ForumSection from "./pages/ForumSection";
import ThreadDisplay from "./components/ThreadDisplay";
import ThreadDisplayPage from "./pages/ThreadDisplayPage";
import BodyCompForm from "./pages/BodyCompForm";
import BmiForm from "./pages/BmiForm";
import ThreadEditPage from "./pages/ThreadEditPage";
import MentalResults from "./pages/MentalResults";


export const AppContext = createContext({});

function App() {
  const [user, setUser] = useState({});
  const [url] = useState("http://localhost:8080");
  const [token, setToken] = useState();

  useEffect(() => {
    const token = cookie.parse(document.cookie).access_token;
    setToken(token);
    let obj = {};

    if (token) {
      obj = {
        method: "POST",
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      obj = {
        method: "POST",
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
      };
    }

    fetch(`${url}/fetch-login`, obj)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
      })
      .catch(err => {
      });
  }, []);

  return (
    <>
      <AppContext.Provider value={{ user, setUser, url, token }}>
        <div className="App">
          <NavBar />
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registerprofessionalagreement" element={<ProfessionalPrivacyAgreementPage />} />
          <Route path="/financeinfo" element={<FinanceInfo />} />
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="/finance/advanced" element={<FinanceAdvanced />} />
          <Route path="/finance/beginner" element={<FinanceBeginner />} />
          <Route path="/finance/intermediate" element={<FinanceIntermediate />} />
          <Route path='/finance/calculator' element={<FinanceCalculator />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/mentalhealthinfo" element={<MentalHealthInfo />}/>
          <Route path="/mentalResults" element={<MentalResults />}/>
          <Route path="/registerpro" element={<ProfessionalRegisterPage />} />
          <Route path="/mentalhealth" element={<MentalHealth />}/>
          <Route path="/mentorship" element={<Mentorship />}/>
          <Route path="/profile/:username" element={<ProfilePage />}/>
          <Route path="/chat" element={<Chat />}/>
          <Route path="/threads/new" element={<ThreadCreatePage />}/>
          <Route path="/threads/:id" element={<ThreadDisplay />}/>
          <Route path="/threads/:id/edit" element={<ThreadEditPage />}/>
          <Route path='/forums/:type' element={<ThreadDisplayPage />}/>
          <Route path="/forums" element={<ForumSection />}/>
          <Route path="/BMICal" element={<BmiForm />}/>
          <Route path="/BodyCompCal" element={<BodyCompForm />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
        
      </AppContext.Provider>
    </>
  );
}

export default App;
