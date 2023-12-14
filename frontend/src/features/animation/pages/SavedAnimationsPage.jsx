import React, { useEffect, useState } from "react";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./SavedAnimationsPage.css";
import SecondHeader from '../../../global_components/SecondHeader';

// Import SVG images 
import svgImage from '../../../assets/images/vector-31.svg';
import svgImage2 from '../../../assets/images/blob-haikei.svg';
import { useScrollTrigger } from "@mui/material";

// Define the SavedAnimationsPage functional component
function SavedAnimationsPage({request}) {
    // Use the navigate hook for programmatic navigation
    const navigate = useNavigate();
    const [savedAnimations, setSavedAnimations] = useState([]);

    // on first render, retrieve all the saved animations
    useEffect(() => {
        request({
            url: "api/animation/retrieve_animations/",
            methods: 'get'
        })
        .then(response => {
            console.log(response)
            setSavedAnimations(response.data)
        })
        .catch(error => {
            console.error(error)
        })
    }, [])

    // // Retrieve saved animations from localStorage or initialize an empty array
    // const savedAnimations = JSON.parse(localStorage.getItem('animations') || '[]');

    // // Function to delete the most recent animation
    // const deleteMostRecentAnimation = () => {
    //     if (savedAnimations.length === 0) {
    //         alert("No animations to delete.");
    //         return;
    //     }

    //     // Create a new array excluding the most recent animation
    //     const updatedAnimations = savedAnimations.slice(0, savedAnimations.length - 1);

    //     // Update the animations in localStorage
    //     localStorage.setItem('animations', JSON.stringify(updatedAnimations));

    //     // Refresh the page to update the UI
    //     window.location.reload();
    // };

    // Function to navigate to a saved animation page
    const goToSavedAnimation = (animationId, schemaId, animationName, query) => {
        // Navigate to the UNCompletedQuiz page with the animation ID as a parameter
        navigate(`/QueryAnimationPage`, {
            state: { schemaId: schemaId, animationName: animationName, query: query }});
    };

    return (
        <>
            <SecondHeader />
            {/* SVG Backgrounds */}
            <div className="SVG-CONTAINER">
                <img src={svgImage} alt="SVG Background" className="svg-background" />
                <img src={svgImage2} alt="SVG Background" className="svg-background1" />
            </div>
            {/* Main container for the SavedAnimationsPage */}
            <div className="main-container">
                {/* Heading container for saved animations */}
                <div className="headingcontainer-savedquizzes">
                    <div className="heading-subcontainer">
                        <h1>Saved Animation</h1>
                    </div>
                </div>

                {/* Content container for saved animations */}
                <div className="content-container">
                    {/* Heading for recent animations with a delete button */}
                    <div className="content_heading">
                        <span>Recent Animations </span>
                        <FaTrash
                            color="#98989F"
                            size={24}
                            style={{ cursor: "pointer" }}
                            
                        />
                    </div>

                    {/* Map through and display each saved animation */}


                    {/* Heading for all animations */}
                    <div className="content_heading">
                        <span1>All Animations</span1>
                    </div>

                    {/* Map through and display all saved animations */}
                    {savedAnimations.map((animation, index) => (
                        <div key={animation.id} className="animation-content_card">
                            <div className="content-card-button-div">
                                {/* Display animation details */}
                                <span> {animation.animation_name} </span>
                            </div>

                            {/* Navigate to the saved animation on clicking the right arrow icon */}
                            <FaChevronRight
                                style={{ cursor: "pointer" }}
                                onClick={() => goToSavedAnimation(animation.id, animation.schema_id, animation.animation_name, animation.query)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SavedAnimationsPage;
