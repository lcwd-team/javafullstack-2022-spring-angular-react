import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./components/About";
import Services from "./components/Services";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./components/PrivateRoutes";
function App() {
  // const [x,setX]=useState(50)

  const sayHello = () => {
    alert("hello , how are you?");
  };

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/services" element={<Services />} />

        <Route path="/user" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
