import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DoctorList from "./components/DoctorList";

// Pages
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import MyAppointments from "./pages/MyAppointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

import "./css/style.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
   const userData = localStorage.getItem("user");

if (userData && userData !== "undefined") {
  try {
    setUser(JSON.parse(userData));
  } catch (error) {
    console.error("User data error", error);
    localStorage.removeItem("user");
  }
}
     
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route 
              path="/booking/:doctorId" 
              element={user ? <Booking /> : <Login onLoginSuccess={handleLoginSuccess} />} 
            />
            <Route 
              path="/my-appointments" 
              element={user ? <MyAppointments /> : <Login onLoginSuccess={handleLoginSuccess} />} 
            />
           <Route
  path="/profile"
  element={
    user ? (
      <Profile appUser={user} setAppUser={setUser} />
    ) : (
      <Login onLoginSuccess={handleLoginSuccess} />
    )
  }
/>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}