import { useCallback,useState } from "react";
import "./UNCompletedQuiz.css";
import pdfimg from "../../../assets/images/pdf.png";
import schemaImg from "../../../assets/images/image-14@2x.png";
import GeneratedQuizLinkComp from "../components/GeneratedQuizLink";
import { useParams } from 'react-router-dom';
import SecondHeader from "../../../global_components/SecondHeader";

const UNCompletedQuiz = () => {
  const onDataWizTextClick = useCallback(() => {
    // Please sync "Instructor Home Page" to the project
  }, []);

  const { quizId } = useParams();

  const onAnimationTextClick = useCallback(() => {
    // Please sync "Animation Introduction Page" to the project
  }, []);

  const onQuizzesTextClick = useCallback(() => {
    // Please sync "Quizzes Introduction Page" to the project
  }, []);

  const onSettingsTextClick = useCallback(() => {
    // Please sync "Account Setting Page " to the project
  }, []);

  const onFAQsTextClick = useCallback(() => {
    // Please sync "FAQ Page" to the project
  }, []);

  const onAnimationRemovebgPreview1ImageClick = useCallback(() => {
    // Please sync "Animation Introduction Page" to the project
  }, []);

  const onScreenshot20230929135459RIconClick = useCallback(() => {
    // Please sync "Instructor Home Page" to the project
  }, []);

  const onCreateQuizzesLogo23IconClick = useCallback(() => {
    // Please sync "Quizzes Introduction Page" to the project
  }, []);

  const onScreenshot20230929133935RImageClick = useCallback(() => {
    // Please sync "FAQ Page" to the project
  }, []);

  const onSettingsLogoClick = useCallback(() => {
    // Please sync "Account Setting Page " to the project
  }, []);

  const onLogoContainerClick = useCallback(() => {
    // Please sync "Instructor Home Page" to the project
  }, []);

  const [showGeneratedQuizLink, setShowGeneratedQuizLink] = useState(false);
  const handleGenerateQuizLinkClick = () => {
    setShowGeneratedQuizLink(true); // Show the popup
  };


  return (
    <>
    <SecondHeader/>
    <div className="main_Page">
      
      
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
