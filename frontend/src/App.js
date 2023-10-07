import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/global.css';

// Page Imports
import LandingPage from './features/general/pages/LandingPage'
 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} /> {/* Root URL when the app is accessed*/}
          <Route path="/LandingPage" element={<LandingPage />} /> {/* To make sure this path is also valid, without the root path*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
