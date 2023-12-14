import { useCallback, useEffect, useState } from "react";
import "./QuizTemplate.css";
import pdfimg from "../../../assets/images/pdf.png";
import schemaImg from "../../../assets/images/employee schema.png";
import GeneratedQuizLinkComp from "../components/GeneratedQuizLink";
import { useParams } from 'react-router-dom';
import SecondHeader from "../../../global_components/SecondHeader";
import Footer from '../../../global_components/Footer';
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../../global_components/Loading"
import Cookies from "js-cookie";
import vector from '../../../assets/images/vector.svg';

import DateTimePickerValue from '../components/DateTimePicker';


const QuizTemplate = ({request}) => {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const { id } = useParams(); // quiz ID from url params
    const [showGeneratedQuizLink, setShowGeneratedQuizLink] = useState(false);

    // holds quiz information -> initalized to empty quiz
    const [quiz, setQuizData] = useState({
        id: "00",
        quiz_name: "",
        userid: "",
        description: "",
        questions: [{
            qaid: "000",
            problem: "",
            answer: "",
            question_number: 0,
            quiz_id: ""
        }],
        start_time: "",
        link_generated: false
    }); 

    // holds dyanmic quiz information
    const [inputValues, setInputValues] = useState({
        description: quiz.description,
        questions: quiz.questions.map((question) => ({
            problem: question.problem,
            answer: question.answer,
            question_number: question.question_number,
            qaid: question.qaid
        }))
    });

    const handleInputChange = (field, value, questionIndex) => {
        setQuizData((prevQuiz) => {
            // Use the spread operator to create a shallow copy of the previous state
            const updatedQuiz = { ...prevQuiz };
    
            // If dealing with a question field, update the questions array
            if (questionIndex !== undefined) 
            {
                const updatedQuestions = [...updatedQuiz.questions];
                updatedQuestions[questionIndex][field] = value;
                updatedQuiz.questions = updatedQuestions;
            } 
            else if (field === 'start_time') 
            {
                updatedQuiz[field] = value.$D + '/' + value.$M + "/" + value.$y + " - " + value.$H + ":" + value.$M + ":" + value.$s;
            }
            else 
            {
                // If not a question field, update the top-level field directly
                updatedQuiz[field] = value;
            }
    
            // Return the updated state
            return updatedQuiz;
        });

        console.log(quiz)
    };    

    // function for saving changes
    const handleSaveChanges = (e) => {
        e.preventDefault();

        request({
            url: "api/quiz/edit-quiz/",
            method: "put",
            data: quiz,
            headers: {
                'X-CSRF-TOKEN': Cookies.get('csrf_access_token')
            }
        })
        .then(response => {
            console.log(response)
            setEditMode(false)
            navigate("/instructor/quiz/" + quiz.id + "/overview/")
        })
        .catch(error => {
            console.error(error)
        })

        console.log(quiz)
    };

    const startEditMode = (e) => {
        e.preventDefault();
        setEditMode(true)

        console.log(editMode)
    }

    // API Call to retrieve the quiz object
    useEffect(() => {
        request({
            url: "api/quiz/retrieve-quiz/" + id,
            methods: 'get'
        })
        .then(response => {
            // console.log(response.data)
            setQuizData(response.data)
        })
        .catch(error => {
            console.error(error)
        })
    }, []);

    // Print quiz object every time it's been redefined
    useEffect(() => {
        console.log(quiz)
    }, [quiz])

    // Navigate button handler functions
    const handleBackClick = useCallback(() => {
        navigate("/instructor/quiz/quizzes/");
    }, [navigate]);

    const ViewButtonClick = useCallback(() => {
        navigate("/AllAttemptsPage");
    }, [navigate]);

    // Pop up handler function for generating quiz link
    const handleGenerateQuizLinkClick = () => {
        request({
            url: "/api/quiz/change-link-generated/",
            method: 'put',
            data: {
                "quiz_id": id
            },
            headers: {
                'X-CSRF-TOKEN': Cookies.get('csrf_access_token')
            }
        })
        .then(response => {
            console.log(response)
            setShowGeneratedQuizLink(true); // Show the popup
        })
        .catch(error => {
            console.error(error)
        })
    };

    // handler to delete quiz
    const handleDeleteQuiz = () => {
        request({
            url: "api/quiz/delete-quiz",
            method: "delete",
            data: {"quiz_id": id},
            headers: {
                'X-CSRF-TOKEN': Cookies.get('csrf_access_token')
            },
        })
        .then(response => {
            navigate("/instructor/quiz/quizzes")
        })
        .catch(error => {
            console.error(error)
        })
    };

    // style declaration
    const styles = {
        cursor: quiz.link_generated ? 'not-allowed' : 'pointer'
    }


    // PAGE CODE
    if (quiz.id === "00")
    {
        return (
            <LoadingComponent />
        )
    }

    return (
        <>
            <SecondHeader />

            <div className="main_Page">
                <div
                    className={
                        " max-w-7xl content_container_bgcolor mx-auto h-auto rounded-2xl z-10 relative mt-20"
                    }
                >
                    {/* Back arrow button */}
                    <button onClick={handleBackClick} className="completedquiz-back-arrow-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <div className="px-20">
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

                <form>
                    <div className="content-container">
                        
                        {/* Title Holder Section*/}
                        <div className="title-holder">
                            <div className="quiz-title">
                                {quiz.quiz_name}
                            </div>

                            <div className="edit-button-holder">
                                <button 
                                    className= {quiz.link_generated ? 'settings-edit-button-noedit' : 'settings-edit-button-noedit'}
                                    title = {quiz.link_generated ? 'Link already generated!' : 'Edit Quiz'}
                                    id="edit-button"
                                    onClick = {(e) => {startEditMode(e)}}
                                    disabled = {quiz.link_generated}
                                    style={styles}
                                >
                                    <img src={vector} alt="Edit-button" />
                                </button>  
                            </div>
                        </div>
                        {/* Title Holder Section*/}

                        {/* Quiz Details Section*/}
                        <div className="quiz-details-card">

                            {/* Quiz Description */}
                            <div className="quiz-description">
                                <input  className={editMode ? 'textbox-edit' : "textbox-noedit"}
                                        defaultValue={quiz.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                            </div>
                            {/* Quiz Description */}

                            {/* Quiz Start Tiime */}
                            <div className="start-time-holder">
                                <DateTimePickerValue className = {editMode ? 'start-time-edit' : 'start-time-noedit'}
                                                     quizStartTime= {quiz.start_time}
                                                     onChange = {handleInputChange} 
                                                     disabled = {quiz.link_generated} 
                                />
                            </div>

                            {/* Quiz Start Tiime */}

                            {/* Quiz Schema */}
                            <div className="schema-title">
                                    Schema:
                            </div>
                            <div className="quiz-schema">
                                <img className={"w-full max-h-96 object-contain"} alt="" src={schemaImg} />
                            </div>
                            {/* Quiz Schema */}

                            {/* Quiz Questions Section */}
                            <div className="questions">
                                {quiz.questions.map((question, index) => (
                                    <div className={"pb-10 z-10"} id = {question.qaid}>
                                        <div className={"innerheading"}>Question - {question.question_number}</div>
                                        <div className={"question-holder"}>
                                            <div className={"font1"}>Problem:</div>
                                            <div className={editMode ? '' : 'cursor-notAllowed'}>
                                                <input  className={editMode ? 'textbox-edit' : "textbox-noedit"}
                                                        defaultValue={question.problem}
                                                        onChange={(e) => handleInputChange('problem', e.target.value, index)}
                                                />
                                            </div>

                                            <div className={"font1"}>Answer:</div>
                                            <div className={editMode ? '' : 'cursor-notAllowed'}>
                                                <input  className={editMode ? 'textbox-edit' : "textbox-noedit"}
                                                        defaultValue={question.answer}
                                                        onChange={(e) => handleInputChange('answer', e.target.value, index)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Quiz Questions Section */}

                        </div>
                        {/* Quiz Details Section*/}

                        {!quiz.link_generated && (
                            <div className="button-holder">
                                <button
                                    className="submitChangesButton" // Add your button styles here
                                    onClick = {(e) => {handleSaveChanges(e)}}
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}

                    </div>
                </form>

                <div className="flex justify-center pb-10 space-x-10">
                    <button
                        className="generateQuizButton md:w-[15%] items-center justify-center" // Add your button styles here
                        onClick={handleGenerateQuizLinkClick}
                    >
                        {quiz.link_generated ? 'View Link' : 'Generate Quiz Link'}

                    </button>
                    <button
                        className="deleteQuizButton md:w-[15%] items-center justify-center" // Add your button styles here
                        onClick={handleDeleteQuiz}
                    >
                        Delete Quiz
                    </button>
                </div>


                {/* Popup component */}
                {showGeneratedQuizLink && (
                    <GeneratedQuizLinkComp linkGenerated = {quiz.link_generated} quizID = {id} onClose = {() => setShowGeneratedQuizLink(false)} />
                )}
            </div>
            <Footer/>
        </>
    );
};

export default QuizTemplate;
