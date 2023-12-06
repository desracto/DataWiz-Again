import React from "react";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./SavedQuizzes.css";
import UNCompletedQuiz from "./UNCompletedQuiz.jsx"
import SecondHeader from '../../../global_components/SecondHeader';
import axios from 'axios';

// Axios instance
const request = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true
  });


function SavedQuizzes() {
  const navigate = useNavigate();
  const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
  const deleteMostRecentQuiz = () => {
    if (savedQuizzes.length === 0) {
      alert("No quizzes to delete.");
      return;
    }

    const updatedQuizzes = savedQuizzes.slice(0, savedQuizzes.length - 1);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    window.location.reload(); // Refresh the page to update the UI
  };
  
  const goToUncompletedQuiz = (quizId) => {
    // Navigate to the UNCompletedQuiz page with the quiz ID as a parameter
    navigate(`/uncompleted-quiz/${quizId}`);
  };

  return (
    <>
    <SecondHeader/>
    <div className="maincontainer">
        <div className="headingcontainer">
            <div className="headingsubcontainer">
                <h1>Saved Quizzes</h1>
            
            </div>
            
        </div>
        <div className="contentcontainer ">
            <div className="content_heading">
            <span>Recent Quizzes </span>
            <FaTrash 
                    color="#98989F" 
                    size={24} 
                    style={{cursor: "pointer"}}
                    onClick={deleteMostRecentQuiz}
                />
            
            </div>
            {savedQuizzes.map((quiz, index) => (
            <div key={quiz.id} className="content_card">
            <div className="button-div completed ">
                    
                <span> {quiz.name}</span>
                <small>Date: {quiz.date}</small>
                <small>Time: {quiz.time}</small> 
                {quiz.isAttempted ? 
                <span2>ATTEMPTED</span2> : 
                <span3>UNATTEMPTED</span3>
                } 
            
                </div>
                
            <FaChevronRight style={{cursor:"pointer"}} 
            onClick={() => goToUncompletedQuiz(quiz.id)}
            />
            
            </div>
            ))}
            
            
            <div className="content_heading">
            <span1>All Quizzes</span1>
            </div>

            {savedQuizzes.map((quiz, index) => (
            <div key={quiz.id} className="content_card">
            <div className="button-div completed ">
                    
            <span> {quiz.name}</span>
                <small>Date: {quiz.date}</small>
                <small>Time: {quiz.time}</small> 
                <span3>UNATTEMPTED</span3> 
            
            </div>
            
            <FaChevronRight style={{cursor:"pointer"}} onSubmit={{}}/>
            </div>
            ))}
            
        </div>
    </div>
    </>
  );
}

export default SavedQuizzes;
