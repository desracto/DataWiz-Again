import { useCallback, useEffect, useState } from "react";
import "./QuizAttemptTemplate.css";
import pdfimg from "../../../assets/images/pdf.png";
import schemaImg from "../../../assets/images/image-14@2x.png";
import SubmitQuiz from "../components/SubmitQuizPopup";
import { useParams } from 'react-router-dom';
import SecondHeader from "../../../global_components/SecondHeader";
import { useNavigate } from "react-router-dom";

const QuizAttemptTemplate = ({ request }) => {
    const navigate = useNavigate();

    // holds quiz information -> initalized to empty quiz
    const [quiz, setQuizData] = useState({
        id: "",
        quiz_name: "",
        description: "",
        questions: [{
            qaid: "000",
            problem: "",
            question_number: 0,
        }],
        start_time: "",
    });

    const [responses, setResponseData] = useState({
        quiz_id: quiz.id,
        response: []
    })

    // update the response quiz_id when the quiz object loads in
    useEffect(() => {
        // This effect will run when the quiz state changes
        setResponseData((prevResponses) => {
            // Update only the quiz_id field
            return {
                ...prevResponses,
                quiz_id: quiz.id,
            };
        });
    }, [quiz.id]);

    // handles the input changes for the answer textareas
    const handleInputChange = (qaid, answer, questionIndex) => {
        setResponseData((prevResponses) => {
            // Use the spread operator to create a shallow copy of the previous state
            const updatedResponses = { ...prevResponses };

            // Find the index of the response with the matching qaid
            const responseIndex = updatedResponses.response.findIndex(
                (response) => response.qaid === qaid
            );

            // If response with the qaid is found, update it; otherwise, add a new response
            if (responseIndex !== -1) {
                updatedResponses.response[responseIndex].answer = answer;
            }
            else {
                updatedResponses.response.push({
                    qaid: qaid,
                    answer: answer
                });
            }

            // Return the updated state
            return updatedResponses;
        });

        console.log(responses);
    };


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

    // retrieve quiz object
    const { id } = useParams(); // quiz ID from url params
    useEffect(() => {
        request({
            url: "/api/quiz/retrieve-filtered-quiz/" + id + "/",
            methods: "get"
        })
            .then(response => {
                setQuizData(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])


    useEffect(() => {
        console.log(quiz)
    }, [quiz])


    if (quiz.id == "00") {
        return <></>
    }

    return (
        <>
            <SecondHeader />

            <div className="main_Page">
                <div className={"max-w-7xl QuizAttempt-content_container_bgcolor mx-auto h-auto rounded-2xl z-10"}>
                    <div className="px-20 mt-[80px]">

                        {/* Title Holder */}
                        <div className="text-xl py-14 font1">
                            {quiz.quiz_name}3
                        </div>
                        <div className={"py-5"}>
                            {/* Title Holder */}

                            {/* Descritpion Holder */}
                            <div className={"description"}>
                                {quiz.description}
                            </div>
                        </div>
                        {/* Descritpion Holder */}

                        {/* Schema Holder */}
                        <div className={"innerheading"}>Schema:</div>
                        <div className="bg-white rounded-2xl margin_bottom ">
                            <img
                                className={"w-full max-h-96 object-contain"}
                                alt=""
                                src={schemaImg}
                            />
                        </div>
                        {/* Schema Holder */}

                        {/* Questions Holder */}
                        <div className="questions-holder">
                            {quiz.questions.map((question, index) => (
                                <div className="question" id={question.qaid}>

                                    {/* QN Number Holder */}
                                    <div className="question_number">Question - {question.question_number}</div>
                                    {/* QN Number Holder */}

                                    {/* Dynamic Question Holder */}
                                    <div className="question-holder">

                                        {/* Problem Holder */}
                                        <div className="problem-title">Problem:</div>
                                        <div className="problem-holder">
                                            {question.problem}
                                        </div>
                                        {/* Problem Holder */}

                                        {/* Answer Holder */}
                                        <div className="answer-title">Answer: </div>
                                        <textarea
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                            className="answer-input-holder"
                                            onChange={(e) => handleInputChange(question.qaid, e.target.value)}
                                        />
                                        {/* Answer Holder */}

                                    </div>
                                    {/* Dynamic Question Holder */}
                                </div>
                            ))}
                        </div>
                        {/* Questions Holder */}
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

export default QuizAttemptTemplate;
