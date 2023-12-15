import { useCallback, useState } from "react";
import "../styles/CompletedQuizPage.css";
import pdfimg from "../../../assets/images/pdf.png";
import schemaImg from "../../../assets/images/employee schema.png";
import GeneratedQuizLinkComp from "../components/GeneratedQuizLink";
import { useParams } from 'react-router-dom';
import SecondHeader from "../../../global_components/SecondHeader";
import Footer from '../../../global_components/Footer';
import { useNavigate } from "react-router-dom";

// Define the CompletedQuiz functional component
const CompletedQuiz = () => {
    // Use React Router hook for navigation
    const navigate = useNavigate();

    // State to control the visibility of the generated quiz link popup
    const [showGeneratedQuizLink, setShowGeneratedQuizLink] = useState(false);

    // Callback function for handling the "Generate Quiz Link" button click
    const handleGenerateQuizLinkClick = () => {
        setShowGeneratedQuizLink(true); // Show the popup
    };

    // Callback function for handling the back button click
    const handleBackClick = useCallback(() => {
        navigate("/SavedQuizzesPage");
    }, [navigate]);

    // Callback function for handling the "View All Attempts" button click
    const ViewButtonClick = useCallback(() => {
        navigate("/AllAttemptsPage");
    }, [navigate]);

    // Render the CompletedQuiz component
    return (
        <>
            {/* Include the SecondHeader component */}
            <SecondHeader />

            {/* Main content container */}
            <div className="main_Page">
                {/* First content container with back arrow button */}
                <div className={"max-w-7xl content_container_bgcolor mx-auto h-auto rounded-2xl z-10 relative mt-20"}>
                    <button onClick={handleBackClick} className="completedquiz-back-arrow-button">
                        {/* SVG icon for the back arrow */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="px-20">
                        {/* Title and "View All Attempts" button */}
                        <div className="view-attempts-text py-10">View All Attempts and Results</div>
                        <div className="flex justify-center pb-10">
                            <button className="viewAll-Attempts-Button md:w-[35%]" onClick={ViewButtonClick}>
                                View
                            </button>
                        </div>
                    </div>
                </div>

                {/* Second content container with quiz details */}
                <div className={"max-w-7xl content_container_bgcolor mx-auto h-auto rounded-2xl z-10"}>
                    <div className="px-20 mt-[80px]">
                        {/* Quiz title */}
                        <div className="text-xl py-14 font1">CSCIT278_Week4_Quiz</div>
                        <div className={"py-5"}>
                            {/* Quiz instructions */}
                            <div className={"rounded-2xl bg-white p-10"}>
                                {/* Instruction 1 */}
                                <ul className={"youWillHaveASpecificAmoun"}>
                                    You will have a specific amount of time to complete the quiz. Ensure you start
                                    the quiz with enough time to finish within the allocated period
                                </ul>
                                <p className={"blankLine"}>&nbsp;</p>
                                {/* Instruction 2 */}
                                <ul className={"youWillHaveASpecificAmoun"}>
                                    The quiz may contain a variety of question types, including multiple-choice,
                                    true/false, and short-answer questions. Read each question carefully and
                                    select the appropriate response.
                                </ul>
                                <p className={"blankLine"}>&nbsp;</p>
                                {/* Instruction 3 */}
                                <ul className={"youWillHaveASpecificAmoun"}>
                                    <li>
                                        Once you have completed all the quiz questions, review your answers to ensure
                                        accuracy. On completion, click the “Submit” button to upload your quiz.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Schema image */}
                        <div className={"innerheading"}>Schema:</div>
                        <div className="bg-white rounded-2xl margin_bottom pb-3 pt-3">
                            <img className={"w-full max-h-96 object-contain"} alt="" src={schemaImg} />
                        </div>

                        {/* Quiz questions */}
                        <div className={"pb-10 z-10"}>
                            {/* Question 1 */}
                            <div className={"innerheading"}>Question - 1</div>
                            <div className={"bg-white rounded-2xl p-5"}>
                                {/* Problem statement */}
                                <div className={"inputLabel font1"}>Problem:</div>
                                <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                                    <div className={"inputLabel"}>
                                        Write an SQL query to find the total number of orders for each customer in the
                                        "Orders" table.
                                    </div>
                                </div>
                                {/* Answer */}
                                <div className={"font1"}>Answer:</div>
                                <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                                    <div className={"inputLabel"}>
                                        <p className={"blankLine"}>
                                            SELECT customer_id, COUNT(order_id) AS total_orders FROM Orders GROUP BY customer_id;
                                        </p>
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
                                        Write an SQL query to retrieve the highest salary from the "Employees" table.
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

                        <div className={"pb-10 z-10"}>
                            <div className={"innerheading"}>Question - 3</div>
                            <div className={" bg-white rounded-2xl p-5"}>
                                <div className={"inputLabel font1"}>Problem:</div>
                                <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                                    <div className={"inputLabel"}>
                                        Write a SQL query to select all columns from the 'Employees' table
                                    </div>
                                </div>

                                <div className={"font1"}>Answer:</div>
                                <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                                    <div className={"inputLabel"}>
                                        <p className={"blankLine"}>
                                            SELECT * FROM Employees;
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"pb-10 z-10"}>
                            <div className={"innerheading"}>Question - 4</div>
                            <div className={" bg-white rounded-2xl p-5"}>
                                <div className={"inputLabel font1"}>Problem:</div>
                                <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                                    <div className={"inputLabel"}>
                                        Write a SQL query to find all employees who work in the 'IT' department.
                                    </div>
                                </div>

                                <div className={"font1"}>Answer:</div>
                                <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                                    <div className={"inputLabel"}>
                                        <p className={"blankLine"}>
                                            SELECT * FROM Employees WHERE Department = 'IT';
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"pb-10 z-10"}>
                            <div className={"innerheading"}>Question - 5</div>
                            <div className={" bg-white rounded-2xl p-5"}>
                                <div className={"inputLabel font1"}>Problem:</div>
                                <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                                    <div className={"inputLabel"}>
                                        How would you select the first three employees in the 'Employees' table?
                                    </div>
                                </div>

                                <div className={"font1"}>Answer:</div>
                                <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                                    <div className={"inputLabel"}>
                                        <p className={"blankLine"}>
                                            SELECT * FROM Employees LIMIT 3;
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

                {/* "Generate Quiz Link" button */}
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
            <Footer />
        </>
    );
};

export default CompletedQuiz;