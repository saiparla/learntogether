// // App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SignInCard from './signside/SignInCard';
import SignUpCard from './signupcard/SignUpCard';
import Content from "./signside/Content";
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import CommunicationPage from './signside/CommunicationPage';
import Home from "./Home";
import './App.css';
import Profile from './Profile';
import Notification from './Notification'


function App() {
  const navigate = useNavigate();
  const login = localStorage.getItem('id');
  const [isLoggedIn, setIsLoggedIn] = useState(!!login);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/signin');
  };

  const toggleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="right-side">
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Redirect logged-in users from /signin and /signup to /content */}
        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to="/content" /> : <SignInCard toggleSignUp={toggleSignUp} />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/content" /> : <SignUpCard />}
        />

        <Route
          path="/content"
          element={isLoggedIn ? <Content onLogout={handleLogout} /> : <Navigate to="/signin" />}
        />
        <Route path="/contact" element={isLoggedIn ? <ContactUs /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile/> : <Navigate to="/signin" />} />
        <Route path="/about" element={isLoggedIn ? <AboutUs /> : <Navigate to="/signin" />} />
        <Route path="/com" element={isLoggedIn ? <CommunicationPage /> : <Navigate to="/signin" />} />
        <Route path="/notify" element={isLoggedIn ? <Notification /> : <Navigate to="/signin" />} />

        
      </Routes>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
