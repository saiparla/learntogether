import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure the correct import for React 18
import './index.css';  // You can add global styles here if needed
import reportWebVitals from './reportWebVitals';  // Optional for performance reporting
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignInCard from './signside/SignInCard';
import SignUpCard from './signupcard/SignUpCard';
import Content from "./signside/Content";
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import CommunicationPage from './signside/CommunicationPage';
import Home from "./Home";
import './App.css';
import Profile from './Profile';
import NotificationsPage from './Notification';
import Forgot from './forgot';

// Ensure you are calling ReactDOM.createRoot from the correct import
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUpCard />} />
      <Route path="/login" element={<SignInCard />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/com" element={ <CommunicationPage/>} />
      <Route path="/notify" element={<NotificationsPage />} />
      <Route path='/content' element={<Content/>}></Route>
      <Route path='/forgot' element={<Forgot/>}></Route>

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (e.g., reportWebVitals(console.log)) or send to an analytics endpoint.
reportWebVitals();
