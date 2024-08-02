import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(function () {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  });

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        isAuth &&{" "}
        <>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/product/:id" element={<Product />} />
        </>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
