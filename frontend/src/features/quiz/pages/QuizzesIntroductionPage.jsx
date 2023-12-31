import { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/QuizzesIntroductionPage.css";
import SecondHeader from '../../../global_components/SecondHeader';
import Footer from '../../../global_components/Footer';

// Import Images
import vector64 from '../../../assets/images/vector-64.svg';
import vector7 from '../../../assets/images/vector-7.svg';
import vector71 from '../../../assets/images/vector-71.svg';
import savedQuizzes from '../../../assets/images/QuizIntro- saved quizes icon.svg';
import QuizzIntro_Icon from '../../../assets/images/QuizIntro-icon.svg';
import CreateQuizIcon from '../../../assets/images/QuizIntro- createQuizzesIcon.svg';

// Define the QuizzesIntroductionPage functional component
const QuizzesIntroductionPage = () => {
    console.log('Rendering QuizzesIntroductionPage...'); // Log to the console when rendering (for debugging)
    
    // Use React Router hook for navigation
    const navigate = useNavigate();

    // Function to handle the "Create a Quiz" button click
    const onQuizIntroCreateAQuizButtonClick = useCallback(() => {
        navigate("/instructor/quiz/drafts/");
    }, [navigate]);

    // Function to handle the "View Saved Quizzes" button click
    const onQuizIntroViewQuizzesButtonClick = useCallback(() => {
        navigate("/instructor/quiz/quizzes");
    }, [navigate]);

    // Render the QuizzesIntroductionPage component
    return (
        <>
            {/* Include the SecondHeader component */}
            <SecondHeader />

            {/* Section 1 */}
            <div className="Quiz-Intro-Sec1">
                <div className="Quiz-Intro-Sec1-Text">
                    <img className="Quiz-Intro-Sec1-Vec1" alt="" src={vector64} />
                    <div className="embark-on-a">
                        Embark on a Knowledge Quest
                    </div>
                    <div className="craft-quizzes-grade">
                        Craft Quizzes, Grade with Precision, and Educate Effortlessly.
                    </div>
                </div>
                <img className="Quiz-Intro-Sec1-Image" alt="" src={QuizzIntro_Icon} />
            </div>

            {/* Section 2 */}
            <div className="Quiz-Intro-Sec2">
                <img className="Quiz-Intro-Sec2-Image" alt="" src={CreateQuizIcon} />
                <div className="Quiz-Intro-Sec2-Text">
                    <img className="Quiz-Intro-Sec2-Vec1" alt="" src={vector7} />
                    <p className="create-quiz1">
                        Create Quiz & Add Auto-Grading Filters
                    </p>
                    <div className="craft-engaging-quizzes">
                        Craft engaging quizzes effortlessly with our intuitive quiz creation
                        tool. Add, edit, and structure quiz questions and solutions to
                        tailor the learning experience. Leverage our powerful "Configure
                        Filters" feature to fine-tune the quiz....
                    </div>
                    <button
                        className="quizintro-create-a-quiz-button"
                        onClick={onQuizIntroCreateAQuizButtonClick}
                    >
                        <div className="create-a-quiz">Create a Quiz</div>
                    </button>
                </div>
            </div>

            {/* Section 3 */}
            <div className="Quiz-Intro-Sec3">
                <div className="Quiz-Intro-Sec3-Text">
                    <img className="Quiz-Intro-Sec3-Vec1" alt="" src={vector71} />
                    <div className="saved-quizzes1">
                        Saved Quizzes
                    </div>
                    <div className="manage-all-your">
                        Manage all your quizzes in one convenient hub. Access, review, and
                        update quizzes with ease. Make necessary adjustments, revisit
                        questions, and improve the learning experience. Save time and
                        streamline your teaching process...
                    </div>
                    <button
                        className="quizintro-view-quizzes-button"
                        onClick={onQuizIntroViewQuizzesButtonClick}
                    >
                        <div className="view-saved-quizzes">
                            View Saved Quizzes
                        </div>
                    </button>
                </div>
                <img className="Quiz-Intro-Sec3-Image" alt="" src={savedQuizzes} />
            </div>
            <Footer/>
        </>
    );
};

export default QuizzesIntroductionPage;
