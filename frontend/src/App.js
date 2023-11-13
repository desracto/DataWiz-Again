import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/global.css';

// General Pages Imports
import LandingPage from './features/general/pages/LandingPage'
import SignUpPage from './features/signup/pages/SignUpPage';
import LoginPage from './features/login/pages/LoginPage';
import ResetPassword from './features/login/pages/ResetPasswordPage';
import InstructorHomePage from './features/general/pages/InstructorHomePage';
import QuizzesIntroductionPage from './features/general/pages/QuizzesIntroductionPage';
import AnimationIntroductionPage from './features/general/pages/AnimationIntroductionPage';

// Animation Pages
import SchemaSelectionPage from './features/animation/pages/SchemaSelectionPage'
import QueryAnimationPage from './features/animation/pages/QueryAnimationPage'

//Quizz Pages
import CreateQuiz from './features/quiz/pages/CreateQuiz';
import QuizHome from './features/quiz/pages/QuizHome';
import SavedQuizzes from './features/quiz/pages/SavedQuizzesPage';
import UNCompletedQuiz from './features/quiz/pages/UNCompletedQuiz';

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
          <Route path="/AnimationIntroductionPage" element={<AnimationIntroductionPage />} /> {/* To make sure this path is also valid, without the root path*/}
          <Route path="/SchemaSelectionPage" element={<SchemaSelectionPage />} /> 
          <Route path="/QueryAnimationPage" element={<QueryAnimationPage />} /> 
          <Route path="/QuizHomePage" element={<QuizHome />} />
          <Route path="/CreateQuizPage" element={<CreateQuiz />} />
          <Route path="/saved_quizzes" element={<SavedQuizzes />}/>
          <Route path="/UncompletedQuizPage" element={<UNCompletedQuiz />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
