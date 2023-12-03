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
import AccountSettingsPage from './features/general/pages/AccountSettingsPage';
import FaqsPage from './features/general/pages/FaqsPage';

// Animation Pages
import SchemaSelectionPage from './features/animation/pages/SchemaSelectionPage'
import QueryAnimationPage from './features/animation/pages/QueryAnimationPage'
import SavedAnimationsPage from './features/animation/pages/SavedAnimationsPage';
import TestAniPage from './features/animation/pages/TestAni';

//Quizz Pages
import CreateQuiz from './features/quiz/pages/CreateQuiz';
import QuizHome from './features/quiz/pages/QuizHome';
import SavedQuizzes from './features/quiz/pages/SavedQuizzesPage';
import UNCompletedQuiz from './features/quiz/pages/UNCompletedQuiz';
import CompletedQuiz from './features/quiz/pages/CompletedQuiz';

import axios from 'axios'

function App() {
    const request = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        },
        timeout: 300000
    })

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LandingPage />} /> {/* Root URL when the app is accessed*/}
                    <Route path="/LandingPage" element={<LandingPage />} />
                    <Route path="/SignUpPage" element={<SignUpPage />} />
                    <Route path="/LoginPage" element={<LoginPage />} />
                    <Route path="/ResetPasswordPage" element={<ResetPassword />} />
                    <Route path="/InstructorHomePage" element={<InstructorHomePage />} />
                    <Route path="/QuizzesIntroductionPage" element={<QuizzesIntroductionPage />} />
                    <Route path="/AnimationIntroductionPage" element={<AnimationIntroductionPage />} />
                    <Route path="/SchemaSelectionPage" element={<SchemaSelectionPage />} />
                    <Route path="/QueryAnimationPage" element={<QueryAnimationPage />} />
                    <Route path="/SavedAnimationsPage" element={<SavedAnimationsPage />} />
                    <Route path="/QuizHomePage" element={<QuizHome />} />
                    <Route path="/CreateQuizPage" element={<CreateQuiz />} />
                    <Route path="/SavedQuizzesPage" element={<SavedQuizzes />} />
                    <Route path="/UncompletedQuizPage" element={<UNCompletedQuiz />} />
                    <Route path="/CompletedQuizPage" element={<CompletedQuiz />} />
                    <Route path="/AccountSettingsPage" element={<AccountSettingsPage request={request}/>} />
                    <Route path="/FaqsPage" element={<FaqsPage />} />
                    <Route path="/TestAni" element={<TestAniPage />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
