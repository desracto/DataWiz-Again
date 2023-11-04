import { useCallback } from "react";
import "./QuizzesIntroductionPage.css";
import BlurryRectange from '../../../assets/images/blurryRectangle.svg';
import vector64 from '../../../assets/images/vector-64.svg';
import vector31 from '../../../assets/images/vector-31.svg';
import vector7 from '../../../assets/images/vector-7.svg';
import vector71 from '../../../assets/images/vector-71.svg';
import savedQuizzes from '../../../assets/images/QuizIntro- saved quizes icon.svg';
import QuizzIntro_Icon from '../../../assets/images/QuizIntro-icon.svg';
import CreateQuizIcon from '../../../assets/images/QuizIntro- createQuizzesIcon.svg';


const QuizzesIntroductionPage = () => {
  const onQuizIntroCreateAQuizButtonClick = useCallback(() => {
    // Please sync "Schema Selection Page" to the project
  }, []);

  const onQuizIntroViewQuizzesButtonClick = useCallback(() => {
    // Please sync "Schema Selection Page" to the project
  }, []);

  return (
    <div className="quizzes-introduction-page">
      <div className="quizzes-introduction-page-child" />
      <img
        className="quizzes-introduction-page-item"
        alt=""
        src={BlurryRectange}
      />
      <div className="vector-group">
        <img className="group-child2" alt="" src={vector64} />
        <div className="embark-on-a">{`Embark on a Knowledge Quest `}</div>
        <div className="craft-quizzes-grade">
          Craft Quizzes, Grade with Precision, and Educate Effortlessly.
        </div>
      </div>
      <div className="vector-container">
        <img className="group-child3" alt="" src={vector31} /> {/* check if this got renered - yellow shape */}

        <div className="rectangle-div" />
        <div className="quizintro-create-a-quiz-button-parent">
          <button
            className="quizintro-create-a-quiz-button"
            onClick={onQuizIntroCreateAQuizButtonClick}
          >
            <div className="quizintro-create-a-quiz-button-child" />
            <div className="create-a-quiz">Create a Quiz</div>
          </button>
          <img className="group-child4" alt="" src={vector7} />
          <div className="create-quiz-container">
            <p className="create-quiz1">{`Create Quiz & Add Auto-Grading Filters`}</p>
          </div>
          <div className="craft-engaging-quizzes">
            Craft engaging quizzes effortlessly with our intuitive quiz creation
            tool. Add, edit, and structure quiz questions and solutions to
            tailor the learning experience. Leverage our powerful "Configure
            Filters" feature to fine-tune the quiz....
          </div>
        </div>
      </div>
      <div className="rectangle-container">
        <div className="group-child5" />
        <img
          className="add-files-rafiki-1-1"
          alt=""
          src={savedQuizzes}
        />
        <div className="group-div">
          <img className="group-child6" alt="" src={vector71} />
          <div className="saved-quizzes1">Saved Quizzes</div>
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
            <div className="quizintro-create-a-quiz-button-child" />
            <div className="view-saved-quizzes">View Saved Quizzes</div>
          </button>
        </div>
      </div>
      <img className="grades-cuate-1-icon" alt="" src={QuizzIntro_Icon} />
      <img
        className="new-entries-cuate-1"
        alt=""
        src={CreateQuizIcon}
      />
    </div>
  );
};

export default QuizzesIntroductionPage;

