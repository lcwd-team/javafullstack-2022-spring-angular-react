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
import Store from "./components/Store";
import Cart from "./components/Cart";
import { CartProvider } from "./context";
import Orders from "./components/Orders";
import ViewProduct from "./components/ViewProduct";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/AddProduct";
import ViewProducts from "./pages/admin/ViewProducts";
import ViewCategories from "./pages/admin/ViewCategories";
import AddCategory from "./pages/admin/AddCategory";
import ManageOrder from "./pages/admin/ManageOrder";
import ManageUser from "./pages/admin/ManageUser";

function App() {
  // const [x,setX]=useState(50)

  const sayHello = () => {
    alert("hello , how are you?");
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <ToastContainer position="bottom-center" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/services" element={<Services />} />
          <Route path="/store/:categoryId" element={<Store />} />
          <Route path="/view-product/:productId" element={<ViewProduct />} />

          <Route path="/user" element={<PrivateRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="home" element={<AdminHome/>}/>
            <Route path="add-product" element={<AddProduct/>}/>
            <Route path="products" element={<ViewProducts/>}/>
            <Route path="categories" element={<ViewCategories/>}/>
            <Route path="add-category" element={<AddCategory/>}/>
            <Route path="orders" element={<ManageOrder/>}/>
            <Route path="users" element={<ManageUser/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
