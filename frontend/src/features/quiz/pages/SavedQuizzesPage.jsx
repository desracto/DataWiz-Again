import React from "react";
import { FaChevronRight, FaSlash, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./SavedQuizzes.css";
import UNCompletedQuiz from "./CompletedQuizPage.jsx"
import SecondHeader from '../../../global_components/SecondHeader';
import axios from 'axios';
import { useState, useEffect } from "react";



const SavedQuizzes = ({request}) => {
    const [quizData, setQuizData] = useState([]);
    const navigate = useNavigate();

    // retrieve recent most quiz objects
    // if the key does not exist, make an empty array
    const recentQuizzesJSON = localStorage.getItem('quizzes');
    const recentQuizzes = recentQuizzesJSON ? JSON.parse(recentQuizzesJSON) : [];
    
    // Fetch all quizzes from API on render
    useEffect(() => {
        request({
            url: "api/quiz/retrieve-quizzes",
            method: "get"
        })
        .then(response => {
            // console.log(response.data)
            setQuizData(response.data)
        })
        .catch(error => {
            console.error(error)
        })

    }, [])

    // Print the updated quizData
    useEffect(() => {
        console.log(quizData)
    }, [quizData])

    const goToCompletedQuiz = (quizID) => {
        navigate('/instructor/quiz/' + quizID + '/overview/');
    };

    const updateRecentQuiz = (quiz) => {
        // check if the quiz already exists
        let recentQuizExists = false;
        let recentQuizFoundIndex = -1;
        recentQuizzes.map((recentQuiz, index) => {
            if (recentQuiz.id === quiz.id) 
            {
                recentQuizExists = true;
                recentQuizFoundIndex = index;
            }
        })

        // if the quiz doesnt already exist in the array
        // add it
        // otherwise, move the quiz to the very top
        if (!recentQuizExists)
        {
            recentQuizzes.unshift(quiz)
        }
        else 
        {
            // move quiz to the top of the array
            const movedElement = recentQuizzes.splice(recentQuizFoundIndex, 1)[0];
            recentQuizzes.unshift(movedElement);
        }

        // remove the last quiz of the array
        if (recentQuizzes.length > 4) 
        {
            recentQuizzes.pop();
        }

        // put the array back into local storage
        localStorage.setItem('quizzes', JSON.stringify(recentQuizzes))
    };

    return (
        <div>
            <SecondHeader/>
            <div className="maincontainer">
                <div className="headingcontainer">
                    <div className="headingsubcontainer">
                        <h1>Saved Quizzes</h1>
                    </div> 
                </div>

                
                <div className="contentcontainer ">

                    {/* Recent Quizzes */}
                    <div className="recent-quizzes">
                        <div className="content_heading">
                            <span>Recent Quizzes </span>
                        </div>

                        {recentQuizzes.map((quiz, index) => (
                            <div key={quiz.id} className="content_card">
                                <div className="button-div completed "> 
                                    <span> {quiz.quiz_name}</span>
                                    <small>Date: {quiz.start_time.split(" - ")[0]}</small>
                                    <small>Time: {quiz.start_time.split(" - ")[1]}</small> 
                                    <span3>UNATTEMPTED</span3> 
                                </div>
                                
                                <FaChevronRight style={{cursor:"pointer"}} 
                                                onClick={() => {updateRecentQuiz(quiz); goToCompletedQuiz(quiz.id)}} 
                                />
                            </div>
                        ))}




                    </div> 
                    {/* Recent Quizzes */}

                    <div className="all-quizzes">
                        <div className="content_heading">
                            <span1>All Quizzes</span1>
                        </div>

                        {quizData.map((quiz, index) => (
                            <div key={quiz.id} className="content_card">
                                <div className="button-div completed "> 
                                    <span> {quiz.quiz_name}</span>
                                    <small>Date: {quiz.start_time.split(" - ")[0]}</small>
                                    <small>Time: {quiz.start_time.split(" - ")[1]}</small> 
                                    <span3>UNATTEMPTED</span3> 
                                </div>
                                
                                <FaChevronRight style={{cursor:"pointer"}} 
                                                onClick={() => {updateRecentQuiz(quiz); goToCompletedQuiz(quiz.id)}} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  );
}

export default SavedQuizzes;
