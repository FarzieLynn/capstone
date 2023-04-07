import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { createContext, useState, useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";

export const AppContext = createContext({});

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/`, {
      method: "GET",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userData) => console.log(userData));
  }, []);

  return (
    <>
      <AppContext.Provider value={{ user, setUser }}>
        <div className="App"></div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;

// fetch(`http://localhost:8080/fetch-user`, {
//   method: "POST",
//   credentials: "include",
// })
//   .then((response) => response.json())
//   .then((userData) => setUser(userData));
