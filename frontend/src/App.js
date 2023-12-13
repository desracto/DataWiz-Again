import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/global.css';

import TestPage from './features/quiz/pages/TestPage';

// General Pages Imports
import LandingPage from './features/general/pages/LandingPage'
import SignUpPage from './features/signup/pages/SignUpPage';
import LoginPage from './features/login/pages/LoginPage';
import ResetPassword from './features/login/pages/ResetPasswordPage';
import InstructorHomePage from './features/general/pages/InstructorHomePage';
import QuizzesIntroductionPage from './features/quiz/pages/QuizzesIntroductionPage';
import AnimationIntroductionPage from './features/general/pages/AnimationIntroductionPage';
import AccountSettingsPage from './features/general/pages/AccountSettingsPage';
import FaqsPage from './features/general/pages/FaqsPage';
import AboutUsPage from './features/general/pages/AboutUs';
import AboutUsPage2 from './features/general/pages/AboutUs2';

// Animation Pages
import SchemaSelectionPage from './features/animation/pages/SchemaSelectionPage'
import QueryAnimationPage from './features/animation/pages/QueryAnimationPage'
import SavedAnimationsPage from './features/animation/pages/SavedAnimationsPage';
//import TestAniPage from './features/animation/pages/TestAni';

//Quizz Pages
import CreateQuiz from './features/quiz/pages/CreateQuiz';
import QuizDraft from './features/quiz/pages/QuizDraft';
import SavedQuizzes from './features/quiz/pages/SavedQuizzesPage';
import CompletedQuiz from './features/quiz/pages/CompletedQuizPage';
import AllAttempts from './features/quiz/pages/AllAttemptsPage';
import QuizAttempt from './features/quiz/pages/QuizAttemptPage'; // delete
import QuizAttemptTemplate from './features/quiz/pages/QuizAttemptTemplate';
import QuizTemplate from './features/quiz/pages/QuizTemplate';

import axios from 'axios'

function App() {

    const request = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,
        mode: 'cors',
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

                    {/* Routes accessible to both both students and instrcutors*/}
                    <Route path="/LandingPage" element={<LandingPage />} />
                    <Route path="/SignUpPage" element={<SignUpPage />} />
                    <Route path="/LoginPage" element={<LoginPage />} />
                    <Route path="/ResetPasswordPage" element={<ResetPassword />} />
                    <Route path="/AnimationIntroductionPage" element={<AnimationIntroductionPage />} />
                    <Route path="/SchemaSelectionPage" element={<SchemaSelectionPage />} />
                    <Route path="/QueryAnimationPage" element={<QueryAnimationPage />} />
                    <Route path="/SavedAnimationsPage" element={<SavedAnimationsPage />} />
                    <Route path="/AccountSettingsPage" element={<AccountSettingsPage request={request} />} />
                    <Route path="/FaqsPage" element={<FaqsPage />} />
                    <Route path="/AboutUs" element={<AboutUsPage />} />
                    <Route path="/AboutUs2" element={<AboutUsPage2 />} />


                    <Route path="/instructor/home/" element={<InstructorHomePage />} />

                    {/* Quiz Module Routes */}
                    <Route path="/instructor/quiz/home/" element={<QuizzesIntroductionPage />} />
                    <Route path="/instructor/quiz/drafts/" element={<QuizDraft />} />
                    <Route path="/instructor/quiz/create/" element={<CreateQuiz request={request} />} />
                    <Route path="/instructor/quiz/quizzes/" element={<SavedQuizzes request={request} />} />

                    <Route path="/AllAttemptsPage" element={<AllAttempts />} />
                    <Route path="/QuizAttemptPage" element={<QuizAttempt />} />
                    <Route path="/CompletedQuizPage" element={<CompletedQuiz />} />

                    {/* Template Routes */}
                    <Route path="/instructor/quiz/:id/overview/" element={<QuizTemplate request={request} />} />
                    <Route path="/quiz/attempt-quiz/:id/" element={<QuizAttemptTemplate request={request} />} />



                    {/* Quiz Module Routes */}

                    <Route path="/test-page/" element={<TestPage />} />



                </Routes>
            </BrowserRouter>
        </div >
    );
}

export default App;
