import { useCallback,useState } from "react";
import "./UNCompletedQuiz.css";
import pdfimg from "../../../assets/images/pdf.png";
import schemaImg from "../../../assets/images/image-14@2x.png";
import GeneratedQuizLinkComp from "../components/GeneratedQuizLink";
import { useParams } from 'react-router-dom';
import SecondHeader from "../../../global_components/SecondHeader";
import { useNavigate} from "react-router-dom";

const UNCompletedQuiz = () => {
    const navigate = useNavigate();

  const [showGeneratedQuizLink, setShowGeneratedQuizLink] = useState(false);
  const handleGenerateQuizLinkClick = () => {
    setShowGeneratedQuizLink(true); // Show the popup
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

    <div className="back-arrow-container">
        {/* Back arrow button */}
        <button onClick={handleBackClick} className="back-arrow-button ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        </div>
        
    <div className={" max-w-7xl content_container_bgcolor mx-auto h-auto rounded-2xl z-10"}>
        <div className="px-20 mt-[80px]">
          
          <div className=" view-attempts-text py-10">View All Attempts and Results</div>
          <div className="flex justify-center pb-10">
            <button 
              className="viewAll-Attempts-Button md:w-[35%]" // Add your button styles here
              onClick={ViewButtonClick}
            >
              View
            </button>

          </div>
          </div>
          </div>
      
      
      <div className={" max-w-7xl content_container_bgcolor mx-auto h-auto rounded-2xl z-10"}>
        <div className="px-20 mt-[80px]">
          
          <div className=" text-xl py-14 font1">CSCIT278_Week4_Quiz</div>
          <div className={" py-5"}>
            {/* <div className={"groupItem"} /> */}
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
              <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                <div className={"inputLabel"}>
                  <p className={"blankLine"}>
                    SELECT customer_id, COUNT(order_id) AS total_orders
                  </p>
                  <p className={"blankLine"}>FROM Orders</p>
                  <p className={"blankLine"}>GROUP BY customer_id;</p>
                </div>
              </div>
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
              <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                <div className={"inputLabel"}>
                  <p className={"blankLine"}>
                    SELECT MAX(salary) AS highest_salary FROM Employees;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-10">
            <button 
              className="generateQuizButton md:w-[15%] items-center justify-center" // Add your button styles here
              onClick={handleGenerateQuizLinkClick}
            >
              Generate Quiz Link
            </button>
          </div>
      {/* Popup component */}
      {showGeneratedQuizLink && (
        <GeneratedQuizLinkComp onClose={() => setShowGeneratedQuizLink(false)} />
      )}
    </div>
    </>
  );
};

export default UNCompletedQuiz;
