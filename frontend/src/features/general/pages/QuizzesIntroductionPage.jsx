import { useCallback } from "react";
import "./QuizzesIntroductionPage.css";

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
        src="/rectangle-2438.svg"
      />
      <div className="vector-group">
        <img className="group-child2" alt="" src="/vector-64.svg" />
        <div className="embark-on-a">{`Embark on a Knowledge Quest `}</div>
        <div className="craft-quizzes-grade">
          Craft Quizzes, Grade with Precision, and Educate Effortlessly.
        </div>
      </div>
      <div className="vector-container">
        <img className="group-child3" alt="" src="/vector-31.svg" />
        <div className="rectangle-div" />
        <div className="quizintro-create-a-quiz-button-parent">
          <button
            className="quizintro-create-a-quiz-button"
            onClick={onQuizIntroCreateAQuizButtonClick}
          >
            <div className="quizintro-create-a-quiz-button-child" />
            <div className="create-a-quiz">Create a Quiz</div>
          </button>
          <img className="group-child4" alt="" src="/vector-7.svg" />
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
          src="/add-filesrafiki-1-1.svg"
        />
        <div className="group-div">
          <img className="group-child6" alt="" src="/vector-71.svg" />
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
      <img className="grades-cuate-1-icon" alt="" src="/gradescuate-1.svg" />
      <img
        className="new-entries-cuate-1"
        alt=""
        src="/new-entriescuate-1.svg"
      />
    </div>
  );
};

export default QuizzesIntroductionPage;

