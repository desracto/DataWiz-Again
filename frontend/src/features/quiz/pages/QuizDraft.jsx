import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaTrash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink and useHistory
import "./QuizDraft.css";
import SecondHeader from '../../../global_components/SecondHeader';

// Define the QuizDraft functional component
function QuizDraft() {
    // Use React Router hook for navigation
    const navigate = useNavigate();

    // State for storing draft quizzes
    const [drafts, setDrafts] = useState([]);

    // useEffect to load drafts from local storage on component mount
    useEffect(() => {
        // Load drafts from local storage
        const savedDrafts = JSON.parse(localStorage.getItem('drafts') || '[]');

        // Remove duplicate drafts based on 'id'
        const uniqueDrafts = removeDuplicateDrafts(savedDrafts);

        // Set the state with unique drafts
        setDrafts(uniqueDrafts);
    }, []);

    // Function to filter out duplicate drafts based on 'id'
    const removeDuplicateDrafts = (drafts) => {
        const unique = {};
        drafts.forEach(draft => {
            unique[draft.id] = draft; // Assuming each draft has a unique 'id'
        });
        return Object.values(unique);
    };

    // Function to delete the most recent draft
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

    // Function to handle draft card click and redirect to the CreateQuiz page with draft data
    const handleDraftClick = (draft) => {
        navigate('/instructor/quiz/create/', { state: { draft } });
    };

    // Render the QuizDraft component
    return (
        <>
            {/* Include the SecondHeader component */}
            <SecondHeader />

            {/* Main container */}
            <div className="main_container">
                {/* Heading container */}
                <div className="heading_container">
                    {/* Heading sub-container */}
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

                    {/* Create Quiz button */}
                    <div className="button">
                        <NavLink to={"/instructor/quiz/create/"} className="navlink">
                            Create Quiz
                        </NavLink>
                    </div>

                    {/* Saved Quizzes button */}
                    <div className="SavedQuizzes-button">
                        <NavLink to={"/instructor/quiz/quizzes"} className="SavedQuizzes-button-navlink">
                            Saved Quizzes
                        </NavLink>
                    </div>
                </div>

                {/* Content container */}
                <div className="content_container">
                    {/* Content heading */}
                    <div className="content_heading">
                        <span>Drafts</span>
                        {/* Trash icon for deleting the most recent draft */}
                        {drafts.length > 0 ? (
                            <FaTrash color="#98989F" size={24} style={{ cursor: "pointer" }} onClick={deleteMostRecentDraft} />
                        ) : (
                            <FaTrash color="#98989F" size={24} style={{ cursor: "not-allowed", opacity: 0.5 }} />
                        )}
                    </div>

                    {/* Draft cards */}
                    {drafts.map((draft, index) => (
                        <div className="content_card" key={index} onClick={() => handleDraftClick(draft)}>
                            {/* Draft details */}
                            <div className=" button-div">
                                <span>{draft.name}</span>
                                <small>Date: {draft.date}</small>
                                <small>Time: {draft.time}</small>
                            </div>

                            {/* Chevron icon for navigation */}
                            <FaChevronRight style={{ cursor: "pointer" }} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default QuizDraft;