import React from "react";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./SavedAnimationsPage.css";
import SecondHeader from '../../../global_components/SecondHeader';


function SavedAnimationsPage() {
  const navigate = useNavigate();
  const savedAnimations = JSON.parse(localStorage.getItem('animations') || '[]');
  const deleteMostRecentAnimation = () => {
    if (savedAnimations.length === 0) {
      alert("No animations to delete.");
      return;
    }

    const updatedAnimations = savedAnimations.slice(0, savedAnimations.length - 1);
    localStorage.setItem('animations', JSON.stringify(updatedAnimations));
    window.location.reload(); // Refresh the page to update the UI
  };
  
  const goToSavedAnimation = (animationId) => {
    // Navigate to the UNCompletedQuiz page with the quiz ID as a parameter
    navigate(`/uncompleted-quiz/${animationId}`);
  };

  return (
    <>
    <SecondHeader/>
    <div className="main-container">
        <div className="headingcontainer-savedquizzes">
            <div className="heading-subcontainer">
                <h1>Saved Animation</h1>
            
            </div>
            
        </div>
        <div className="content-container ">
            <div className="content_heading">
            <span>Recent Animations </span>
            <FaTrash 
                    color="#98989F" 
                    size={24} 
                    style={{cursor: "pointer"}}
                    onClick={deleteMostRecentAnimation}
                />
            
            </div>
            {savedAnimations.map((animation, index) => (
            <div key={animation.id} className="animation-content_card">
            <div className="content-card-button-div ">
                    
                <span> {animation.name}</span>
                <small>Date: {animation.date}</small>
                <small>Time: {animation.time}</small> 
               
            
                </div>
                
            <FaChevronRight style={{cursor:"pointer"}} 
            onClick={() => goToSavedAnimation(animation.id)}
            />
            
            </div>
            ))}
            
            
            <div className="content_heading">
            <span1>All Animations</span1>
            </div>

           
            {savedAnimations.map((animation, index) => (
            <div key={animation.id} className="animation-content_card">
            <div className="content-card-button-div ">
                    
                <span> {animation.name}</span>
                <small>Date: {animation.date}</small>
                <small>Time: {animation.time}</small> 
               
            
                </div>
                
            <FaChevronRight style={{cursor:"pointer"}} 
            onClick={() => goToSavedAnimation(animation.id)}
            />
            
            </div>
            ))}

            


           
            
        </div>
    </div>
    </>
  );
}

export default SavedAnimationsPage;
