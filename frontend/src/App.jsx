import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { createContext, useState, useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import FitnessPage from "./pages/FitnessPage";
import HomePage from './pages/MainPage';
import NotFoundPage from "./pages/NotFoundPage";
import MentalHealth from "./components/MentalHealth";
<<<<<<< HEAD
=======
import NavBar from "./components/NavBar";
import cookie from "cookie";
>>>>>>> 587246708e82c85265a243ee27530f0b05301fdc
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
<<<<<<< HEAD
          <Route path="*" element={<NotFoundPage />}/>
          <Route path="/mentalhealth" element={<MentalHealth />}/>
=======
          <Route path="/mentalhealth" element={<MentalHealth />}/>
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="*" element={<NotFoundPage />} />
>>>>>>> 587246708e82c85265a243ee27530f0b05301fdc
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
