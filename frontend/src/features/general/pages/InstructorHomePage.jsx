import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import "./InstructorHomePage.css";
import slantingRectangle from '../../../assets/images/InstrHome-Rectangle.svg'
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

    // useEffect(() => {
    //     request({
    //         url: "/api/user/load_user",
    //         method: "get"
    //     }).then(response => {
    //         const user_details = response.data
    //         console.log(user_details)

    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }, [])

    const onExploreAnimationButtonClick = useCallback(() => {
    // Please sync "Schema Selection Page" to the project
    }, []);

    const onTryOutQuizzesButtonClick = useCallback(() => {
    // Please sync "Schema Selection Page" to the project
    }, []);

    const onSchemaSelectionCardClick = useCallback(() => {
    // Please sync "Schema Selection Page" to the project
    }, []);

    const onCreateQuizButtonClick = useCallback(() => {
    // Please sync "Quiz Filters Page" to the project
    }, []);

    const onSavedQueryAnimationCardClick = useCallback(() => {
    // Please sync "Saved Animation Page" to the project
    }, []);

    const onSavedQuizzesCardClick = useCallback(() => {
    // Please sync "Saved Quizzes Page" to the project
    }, []);

  return (
    <div className="instructor-home-page">
      <img
        className="instructor-home-page-child"
        alt=""
        src={slantingRectangle}
      />
      <div className="instructor-home-page-item" />
      <div className="explore-datawiz-features">Explore DataWiz Features</div>
      <div className="explore-animation-button-parent">
        <button
          className="explore-animation-button"
          onClick={onExploreAnimationButtonClick}
        >
          <div className="explore-animation-button-child" />
          <div className="explore-animations">Explore Animations</div>
        </button>
        <button
          className="try-out-quizzes-button"
          onClick={onTryOutQuizzesButtonClick}
        >
          <div className="try-out-quizzes-button-child" />
          <div className="try-out-quizzes">Try Out Quizzes</div>
        </button>
        <div className="your-gateway-to">{`Your Gateway to Mastering SQL Queries with Query Visualization, and Effortless Query Grading. `}</div>
        <div className="unleash-the-power">
          Unleash the Power of Data with Ease.
        </div>
      </div>
      <img className="server-rafiki-1-icon" alt="" src={MainIcon} />
      <button
        className="schema-selection-card"
        onClick={onSchemaSelectionCardClick}
      >
        <div className="schema-selection-card-child" />
        <div className="schema-selection-for">
          Schema Selection for Query Animation
        </div>
        <div className="choose-from-5-container">
          <p className="query-animation">{`Choose from 5 schemas and witness interactive SQL `}</p>
          <p className="query-animation">query animation.</p>
        </div>
        <img
          className="screenshot-2023-09-26-143344-r-icon"
          alt=""
          src={SchemaIcon}
        />
      </button>
      <button className="create-quiz-button" onClick={onCreateQuizButtonClick}>
        <div className="schema-selection-card-child" />
        <div className="create-quiz">Create Quiz</div>
        <div className="never-lose-your">{`Never lose your valuable query animations with our efficient saving system. `}</div>
        <img
          className="create-quizzes-logo2-2-icon"
          alt=""
          src={CreateQuizzIcon}
        />
      </button>
      <button
        className="saved-query-animation-card"
        onClick={onSavedQueryAnimationCardClick}
      >
        <div className="schema-selection-card-child" />
        <div className="saved-query-animations">Saved Query Animations</div>
        <div className="never-lose-your1">{`Never lose your valuable query animations with our efficient saving system. `}</div>
        <img
          className="screenshot-2023-09-26-142830-r-icon"
          alt=""
          src={SavedAnimationIcon}
        />
      </button>
      <button className="saved-quizzes-card" onClick={onSavedQuizzesCardClick}>
        <div className="schema-selection-card-child" />
        <div className="saved-quizzes">Saved Quizzes</div>
        <div className="manage-your-saved">{` Manage your saved quizzes in one convenient location, ensuring easy access & review. `}</div>
        <img
          className="screenshot-2023-09-26-142815-r-icon"
          alt=""
          src={SavedQuizzesIcon}
        />
      </button>
    </div>
  );
};

export default InstructorHomePage;
