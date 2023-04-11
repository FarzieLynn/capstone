import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { createContext, useState, useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import FitnessPage from "./pages/FitnessPage";
import FinancePage from "./pages/FinancePage";
import HomePage from './pages/MainPage';
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";
import cookie from "cookie";
import FinanceAdvanced from "./pages/FinanceAdvanced";
import FinanceBeginner from "./pages/FinanceBeginner";
import FinanceIntermediate from "./pages/FinanceIntermediate";

export const AppContext = createContext({});

function App() {
  const [user, setUser] = useState({});
  const [url, setUrl] = useState("http://localhost:8080");

  useEffect(() => {
    const token = cookie.parse(document.cookie).access_token;
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

    fetch(`http://localhost:8080/fetch-login`, obj)
      .then((response) => response.json())
      .then((userData) => setUser(userData));
  }, []);

  return (
    <>
      <AppContext.Provider value={{ user, setUser, url}}>
        <div className="App">
          <NavBar />
        </div>
        <div>Logged in as {user.publicData ? user?.publicData.username : 'guest'}</div>
        <Routes>
          <Route path='/home' element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="/finance/advanced" element={<FinanceAdvanced />} />
          <Route path="/finance/beginner" element={<FinanceBeginner />} />
          <Route path="/finance/intermediate" element={<FinanceIntermediate />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
