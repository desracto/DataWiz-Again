import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaTrash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Import useHistory
import "./QuizHome.css";
import SecondHeader from '../../../global_components/SecondHeader';


function QuizHome() {

    const navigate = useNavigate();
    const [drafts, setDrafts] = useState([]);
    useEffect(() => {
        // Load drafts from local storage
        const savedDrafts = JSON.parse(localStorage.getItem('drafts') || '[]');
        const uniqueDrafts = removeDuplicateDrafts(savedDrafts);
        setDrafts(uniqueDrafts);
      }, []);
  
      // Function to filter out duplicate drafts
      const removeDuplicateDrafts = (drafts) => {
        const unique = {};
        drafts.forEach(draft => {
          unique[draft.id] = draft; // Assuming each draft has a unique 'id'
        });
        return Object.values(unique);
      };
  
      const deleteMostRecentDraft = () => {
        if (drafts.length === 0) {
          // If there are no drafts, alert the user and exit the function
          alert("There are no drafts to delete.");
          return;
        }
      
        // Assuming the most recent draft is at the start of the array
        const updatedDrafts = drafts.slice(1); // Remove the first element
        setDrafts(updatedDrafts); // Update state
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts)); // Update local storage
      };
      
      const handleDraftClick = (draft) => {
        // Redirect to the CreateQuiz page with the draft data
        navigate('/CreateQuizPage', { state: { draft } });
    };


  return (
    <>
    <SecondHeader/>
    <div className="main_container">
      <div className="heading_container">
        <div className="heading_sub_container">
          <h1>Quiz Creation</h1>
          <span>
            Welcome to the Quiz Creation Page! Here, you can design SQL
            query-based quizzes to test learners' proficiency in SQL. DataWiz
            specializes in relational algebra tree-based auto grading of SQL
            queries. Craft questions that require SQL queries as answers, and
            let DataWiz automatically evaluate and grade the responses,
            providing an efficient and insightful learning experience.
          </span>
        </div>
        <div className="button">
          <NavLink to={"/CreateQuizPage"} className="navlink">
            Create Quiz
          </NavLink>
        </div>
      </div>
      <div className="content_container">
        <div className="content_heading">
          <span>Drafts</span>
          <FaTrash color="#98989F" size={24} style={{cursor:"pointer"}} onClick={deleteMostRecentDraft}/>
        </div>

        {drafts.map((draft, index) => (
        <div className="content_card" key={index}  onClick={() => handleDraftClick(draft)}>
        <div className=" button-div">
            <span>{draft.name}</span>
            <small>Date: {draft.date}</small>
            <small>Time: {draft.time}</small>
            
          </div>
          <FaChevronRight style={{cursor:"pointer"}} onSubmit={{}}/>
        </div>

        
        
        ))}

        
      </div>
      </div>
    
    </>
      
  );
}

export default QuizHome;
