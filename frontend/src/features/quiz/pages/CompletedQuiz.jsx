import { useCallback } from "react";
import "./UNCompletedQuiz.css";
import pdfimg from "../../../assets/images/pdf.png";
import schemaImg from "../../../assets/images/image-14@2x.png";


const CompletedQuiz = () => {
  const onDataWizTextClick = useCallback(() => {
    // Please sync "Instructor Home Page" to the project
  }, []);

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

  const handleFilteredAutoGradButtonClick = () => {
    // Define the action to be taken when the button is clicked
    // For example, you can navigate to another page or perform some other action.
    console.log("Button clicked!");
    // Add your code logic here.
  };

  const handleUnFilteredAutoGradButtonClick = () => {
    // Define the action to be taken when the button is clicked
    // For example, you can navigate to another page or perform some other action.
    console.log("Button clicked!");
    // Add your code logic here.
  };

  return (
    <div className="main_Page">
      
      <div
        className={
          "filteredGradeToolbar grid md:grid-cols-2 grid-cols-1 mx-auto max-w-5xl rounded-xl relative shadow-lg items-center"
        }
      >
        {/* <div className={"card rounded-2xl bg-gray-100 shadow-lg"} /> */}
        <div className={" px-5"}>
          <div className="flex items-center ml-12 " onClick={handleFilteredAutoGradButtonClick} style={{ cursor: 'pointer' }}>
            
            <img className={"w-7 h-7 "} alt="" src={pdfimg}  />
            <div className={"ps-5 font1"}>Filtered Auto-Grading Results</div>
          </div>
        </div>
        <div className={" px-5"}>
          <div className="flex items-center justify-end mr-12" onClick={handleUnFilteredAutoGradButtonClick} style={{ cursor: 'pointer' }}>
            <img className={"w-7 h-7"} alt="" src={pdfimg} />
            <div className={"ps-5 font1"}>Unfiltered Auto-Grading Results</div>
          </div>
        </div>
      </div>
      <div className={" max-w-5xl content_container_bgcolor mx-auto h-auto rounded-2xl z-10"}>
        <div className="px-20 mt-[60px]">
          
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
    </div>
  );
};

export default CompletedQuiz;
