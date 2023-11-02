import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/global.css';

// Page Imports
import LandingPage from './features/general/pages/LandingPage'
import SignUpPage from './features/signup/pages/SignUpPage';
import LoginPage from './features/login/pages/LoginPage';
import ResetPassword from './features/login/pages/ResetPasswordPage';
import InstructorHomePage from './features/general/pages/InstructorHomePage';
import QuizzesIntroductionPage from './features/general/pages/QuizzesIntroductionPage';
 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} /> {/* Root URL when the app is accessed*/}
          <Route path="/LandingPage" element={<LandingPage />} /> {/* To make sure this path is also valid, without the root path*/}
          <Route path="/SignUpPage" element={<SignUpPage />} /> {/* To make sure this path is also valid, without the root path*/}
          <Route path="/LoginPage" element={<LoginPage />} /> {/* To make sure this path is also valid, without the root path*/}
          <Route path="/ResetPasswordPage" element={<ResetPassword />} /> {/* To make sure this path is also valid, without the root path*/}
          <Route path="/InstructorHomePage" element={<InstructorHomePage />} /> {/* To make sure this path is also valid, without the root path*/}
          <Route path="/QuizzesIntroductionPage" element={<QuizzesIntroductionPage />} /> {/* To make sure this path is also valid, without the root path*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
