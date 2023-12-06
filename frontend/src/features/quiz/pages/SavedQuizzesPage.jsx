import React from "react";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./SavedQuizzes.css";
import UNCompletedQuiz from "./CompletedQuizPage.jsx"
import SecondHeader from '../../../global_components/SecondHeader';
import axios from 'axios';
import { useState, useEffect } from "react";



const SavedQuizzes = ({request}) => {
    const [quizInfo, setQuizInfo] = useState({ name: '', startTime: '' });

    // on render
    useEffect(() => {
        request({
            url: "api/quiz/retrieve-quizzes",
            method: "get"
        })
        .then(response => {
            const quizData = response.data; 
            setQuizInfo({ name: quizData.quiz_name, startTime: quizData.start_time });
            console.log(response.data)
        })
        .catch(error => {
            console.error(error)
        })

    }, [])

    
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
  
  const goToCompletedQuiz = (quizId) => {
    // Navigate to the UNCompletedQuiz page with the quiz ID as a parameter
    navigate("/CompletedQuizPage");
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
            {savedQuizzes.length > 0 ? (
        <FaTrash 
            color="#98989F" 
            size={24} 
            style={{ cursor: "pointer" }}
            onClick={deleteMostRecentQuiz}
        />
    ) : (
        <FaTrash 
            color="#98989F" 
            size={24} 
            style={{ cursor: "not-allowed", opacity: 0.5 }}
        />
        )}
            
            </div>
            {savedQuizzes.map((quiz, index) => (
            <div key={quiz.id} className="content_card">
            <div className="button-div completed ">
                    
                <span> {quizInfo.name}</span>
                <small>Date: {quiz.date}</small>
                <small>Time: {quizInfo.startTime}</small> 
                {quiz.isAttempted ? 
                <span2>ATTEMPTED</span2> : 
                <span3>UNATTEMPTED</span3>
                } 
            
                </div>
                
            <FaChevronRight style={{cursor:"pointer"}} 
            onClick={() => goToCompletedQuiz(quiz.id)}
            />
            
            </div>
            ))}
            
            
            <div className="content_heading">
            <span1>All Quizzes</span1>
            </div>

            {savedQuizzes.map((quiz, index) => (
            <div key={quiz.id} className="content_card">
            <div className="button-div completed ">
                    
            <span> {quizInfo.name}</span>
                <small>Date: {quiz.date}</small>
                <small>Time: {quizInfo.startTime}</small> 
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
