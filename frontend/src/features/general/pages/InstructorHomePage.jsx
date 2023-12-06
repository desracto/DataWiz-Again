import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./InstructorHomePage.css";
import SecondHeader from "../../../global_components/SecondHeader";


// Image Imports
import stackedWaves from '../../../assets/images/stacked-waves-haikei.svg'
import MainIcon from '../../../assets/images/InstrHome-MainIcon.svg'
import SchemaIcon from '../../../assets/images/Schema-Selection.png';
import SavedAnimationIcon from '../../../assets/images/Saved-Animations.png';
import SavedQuizzesIcon from '../../../assets/images/Saved-Quizzes.png';
import CreateQuizzIcon from '../../../assets/images/Create-Quizzes-Logo.png';

const request = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true,
    timeout: 300000
})
const InstructorHomePage = () => {
    const location = useLocation()
    console.log(location)

    useEffect(() => {
        request({
            url: "/api/user/load_user",
            method: "get"
        }).then(response => {
            const user_details = response.data
            console.log(user_details)

        }).catch(error => {
            console.error(error)
        })
    }, [])

    const navigate = useNavigate();

    const onExploreAnimationButtonClick = useCallback(() => {
        navigate("/SchemaSelectionPage");
    }, [navigate]);

    const onTryOutQuizzesButtonClick = useCallback(() => {
        navigate("/QuizHomePage");
    }, [navigate]);

    const onSchemaSelectionCardClick = useCallback(() => {
        navigate("/SchemaSelectionPage");
    }, [navigate]);

    const onCreateQuizButtonClick = useCallback(() => {
        navigate("/QuizHomePage");
    }, [navigate]);

    const onSavedQueryAnimationCardClick = useCallback(() => {
    // Please sync "Saved Animation Page" to the project
    }, []);

    const onSavedQuizzesCardClick = useCallback(() => {
        navigate("/SavedQuizzesPage");
    }, [navigate]);

  return (
    <>
    <SecondHeader/>
    <img
        className="Stacked-Waves"
        alt=""
        src={stackedWaves}
    />
    <div className="Top-Section">

        <div className="IHome-Page-Cont1">

            <div className="your-gateway-to">
                {`Your Gateway to Mastering SQL Queries with Query Visualization, and Effortless Query Grading. `}
            </div>
            <div className="unleash-the-power">
                Unleash the Power of Data with Ease.
            </div>

            <div className="HomePageButtons">
                <button
                    className="explore-animation-button"
                    onClick={onExploreAnimationButtonClick}
                    >
                    <div className="explore-animations">Explore Animations</div>
                </button>

                <button
                    className="try-out-quizzes-button"
                    onClick={onTryOutQuizzesButtonClick}
                    >
                    <div className="try-out-quizzes">Try Out Quizzes</div>
                </button>
            </div>
        </div>

        <div className="ImageContainer1">
            <img className="ServerDude-Image" alt="" 
                src={MainIcon} 
            />
        </div>

    </div>
    
    <div className="Features-Card">

        <div className="Features-Card-Title">
            Explore DataWiz Features
        </div>

        <div className="Top-Features">
            <button            
                className="schema-selection-button"
                onClick={onSchemaSelectionCardClick}
            >
                <img
                    className="Schema-Selection-Image"
                    alt=""
                    src={SchemaIcon}
                />

                <div className="schema-selection-for">
                    Schema Selection for Query Animation
                </div>

                <div className="Schema-Selection-Description">
                    <p className="query-animation">
                        Choose from 5 schemas and witness interactive SQL query animation.
                    </p>
                </div>

            </button>

            <button 
                className="create-quiz-button" 
                onClick={onCreateQuizButtonClick}
            >

                <img
                    className="Create-Quizzes-Image"
                    alt=""
                    src={CreateQuizzIcon}
                />

                <div className="create-quiz">
                    Create Quiz
                </div>

                <div className="Create-Quiz-Description">
                    Never lose your valuable query animations with our efficient saving system.
                </div>
            </button>
        </div>

            <div className="Bottom-Features">
                <button
                    className="Saved-Query-Animation-button"
                    onClick={onSavedQueryAnimationCardClick}
                >
                    <img
                        className="Saved-Query-Animation-Image"
                        alt=""
                        src={SavedAnimationIcon}
                    />

                    <div className="saved-query-animations">
                        Saved Query Animations
                    </div>

                    <div className="Saved-Query-Animation-Description">
                        Never lose your valuable query animations with our efficient saving system.
                    </div>
                </button>

                <button 
                    className="Saved-Quizzes-button" 
                    onClick={onSavedQuizzesCardClick}
                >
                    <img
                        className="Saved-Quizzes-Image"
                        alt=""
                        src={SavedQuizzesIcon}
                    />
                    <div className="saved-quizzes">
                        Saved Quizzes
                        </div>
                    <div className="Saved-Quizzes-Description">
                        Manage your saved quizzes in one convenient location, ensuring easy access & review.
                    </div>

                </button>
            </div>
        </div>
    </>
  );
};

export default InstructorHomePage;
