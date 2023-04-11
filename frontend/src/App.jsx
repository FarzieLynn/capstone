import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { createContext, useState, useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import FitnessPage from "./pages/FitnessPage";
import NotFoundPage from "./pages/NotFoundPage";
import MentalHealth from "./components/MentalHealth";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import cookie from "cookie";

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mentalhealth" element={<MentalHealth />}/>
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
