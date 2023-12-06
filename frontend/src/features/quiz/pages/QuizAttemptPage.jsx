import { useCallback,useState } from "react";
import "./QuizAttemptPage.css";
import pdfimg from "../../../assets/images/pdf.png";
import schemaImg from "../../../assets/images/image-14@2x.png";
import SubmitQuiz from "../components/SubmitQuizPopup";
import { useParams } from 'react-router-dom';
import SecondHeader from "../../../global_components/SecondHeader";
import { useNavigate} from "react-router-dom";

const QuizAttempt = () => {
    const navigate = useNavigate();

  const [showSubmitQuizPopup, setshowSubmitQuizPopup] = useState(false);
  const handleSubmitQuizButtonClick = () => {
    setshowSubmitQuizPopup(true); // Show the popup
  };

  const handleBackClick = useCallback(() => {
    navigate("/SavedQuizzesPage");
}, [navigate]);

const ViewButtonClick = useCallback(() => {
    navigate("/AllAttemptsPage");
}, [navigate]);

  return (
    <>
    <SecondHeader/>


    <div className="main_Page">
      <div className={" max-w-7xl QuizAttempt-content_container_bgcolor mx-auto h-auto rounded-2xl z-10"}>
        <div className="px-20 mt-[80px]">
          
          <div className=" text-xl py-14 font1">CSCIT278_Week4_Quiz</div>
          <div className={" py-5"}>
            
            <div className={"rounded-2xl bg-white p-10"}>
              <ul className={"youWillHaveASpecificAmoun"}>
                <li className={"youWillHave"}>
                  You will have a specific amount of time to complete the quiz.
                  Ensure you start the quiz with enough time to finish within
                  the allocated period
                </li>
              </ul>
              <p className={"blankLine"}>&nbsp;</p>
              <ul className={"youWillHaveASpecificAmoun"}>
                <li className={"youWillHave"}>
                  The quiz may contain a variety of question types, including
                  multiple-choice, true/false, and short-answer questions. Read
                  each question carefully and select the appropriate response.
                </li>
              </ul>
              <p className={"blankLine"}>&nbsp;</p>
              <ul className={"youWillHaveASpecificAmoun"}>
                <li>
                  Once you have completed all the quiz questions, review your
                  answers to ensure accuracy. On completion, click the “Submit”
                  button to upload your quiz.
                </li>
              </ul>
            </div>
          </div>

          
            <div className={"innerheading"}>Schema:</div>
            <div className="bg-white rounded-2xl margin_bottom ">
              <img
                className={"w-full max-h-96 object-contain"}
                alt=""
                src={schemaImg}
              />
            </div>
          

          <div className={"pb-10 z-10"}>
            <div className={"innerheading"}>Question - 1</div>
            <div className={" bg-white rounded-2xl p-5"}>
              <div className={"inputLabel font1"}>Problem:</div>
              <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                <div className={"inputLabel"}>
                  Write an SQL query to find the total number of orders for each
                  customer in the "Orders" table.
                </div>
              </div>

              <div className={"font1"}>Answer:</div>
                  <textarea className={"answer-textarea w-full"}
                     placeholder="Answer"
                     rows={4}
                     style={{ resize: "none" }}
                  />
                  
                
             
            </div>
          </div>

          <div className={"pb-10 z-10"}>
            <div className={"innerheading"}>Question - 2</div>
            <div className={" bg-white rounded-[0.6rem] p-5 z-10"}>
              <div className={"font1"}>Problem:</div>
              <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                <div className={"inputLabel"}>
                  Write an SQL query to retrieve the highest salary from the
                  "Employees" table.
                </div>
              </div>

              <div className={"font1"}>Answer:</div>
              <textarea className={"answer-textarea w-full"}
                     placeholder="Answer"
                     rows={4}
                     style={{ resize: "none" }}
                  />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-10">
            <button 
              className="SubmitQuizButton md:w-[15%] items-center justify-center" // Add your button styles here
              onClick={handleSubmitQuizButtonClick}
            >
              Submit Quiz
            </button>
          </div>
      {/* Popup component */}
      {showSubmitQuizPopup && (
        <SubmitQuiz onClose={() => setshowSubmitQuizPopup(false)} />
      )}
    </div>
    </>
  );
};

export default QuizAttempt;
