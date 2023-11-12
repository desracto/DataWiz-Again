import { useCallback } from "react";
import "./QuizzesIntroductionPage.css";

// Image Imports
import vector64 from '../../../assets/images/vector-64.svg';
import vector7 from '../../../assets/images/vector-7.svg';
import vector71 from '../../../assets/images/vector-71.svg';
import savedQuizzes from '../../../assets/images/QuizIntro- saved quizes icon.svg';
import QuizzIntro_Icon from '../../../assets/images/QuizIntro-icon.svg';
import CreateQuizIcon from '../../../assets/images/QuizIntro- createQuizzesIcon.svg';
import stackedWaves1 from '../../../assets/images/stacked-waves-haikei.svg'
import stackedWaves3 from '../../../assets/images/stacked-waves-haikei-red.svg'
import stackedWaves2 from '../../../assets/images/stacked-waves-haikei-green.svg'


import SecondHeader from "../../../global_components/SecondHeader";

const QuizzesIntroductionPage = () => {
  const onQuizIntroCreateAQuizButtonClick = useCallback(() => {
    // Please sync "Schema Selection Page" to the project
  }, []);

  const onQuizIntroViewQuizzesButtonClick = useCallback(() => {
    // Please sync "Schema Selection Page" to the project
  }, []);

  return (
    <>
        <SecondHeader/>

        <div className="Quiz-Intro-Sec1">
            <div className="Quiz-Intro-Sec1-Text">
                <img 
                    className="Quiz-Intro-Sec1-Vec1" 
                    alt="" 
                    src={vector64} 
                />
                <div className="embark-on-a">
                    Embark on a Knowledge Quest
                </div>
                <div className="craft-quizzes-grade">
                    Craft Quizzes, Grade with Precision, and Educate Effortlessly.
                </div>
            </div>
            <img 
                className="Quiz-Intro-Sec1-Image" 
                alt="" 
                src={QuizzIntro_Icon} 
            />

        </div>

        <div className="Quiz-Intro-Sec2">
            
            <img
                className="Quiz-Intro-Sec2-Image"
                alt=""
                src={CreateQuizIcon}
            />
            <div className="Quiz-Intro-Sec2-Text">
                <img 
                    className="Quiz-Intro-Sec2-Vec1" 
                    alt="" src={vector7} 
                />
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

        <div className="Quiz-Intro-Sec3">

            <div className="Quiz-Intro-Sec3-Text">
                <img 
                    className="Quiz-Intro-Sec3-Vec1" 
                    alt="" 
                    src={vector71} 
                />
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
                    <div className="view-saved-quizzes">View Saved Quizzes</div>
                </button>
            </div>
            <img
                className="Quiz-Intro-Sec3-Image"
                alt=""
                src={savedQuizzes}
            />
        </div>
    </>
  );
};

export default QuizzesIntroductionPage;

