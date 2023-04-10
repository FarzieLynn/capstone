import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { createContext, useState, useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import cookie from "cookie";

export const AppContext = createContext({});

function App() {
  const [user, setUser] = useState({});

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
      .then((userData) => setUser(userData[0]));
  }, []);

  return (
    <>
      <AppContext.Provider value={{ user, setUser }}>
        <div className="App"></div>
        <div>Logged in as {user ? user.username : 'Guest'}</div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
