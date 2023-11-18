import React from "react";
import SecondHeader from '../../../global_components/SecondHeader';
import { FaChevronRight, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./QuizHome.css";

// Image Imports
import svgImage from '../../../assets/images/vector-31.svg'; 
import svgImage2 from '../../../assets/images/blob-haikei.svg'; 
import BlobOutline1 from '../../../assets/images/BlobOutline1.png'; 

function QuizHome() {
  return (
    <>
    <SecondHeader />   
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
                <NavLink to={"/create_quiz"} className="navlink">
                    Create Quiz
                </NavLink>
            </div>
        </div>

        <div className="content_container">
            <div className="content_heading">
            <span>Drafts</span>
            <FaTrash color="#98989F" size={24} style={{cursor:"pointer"}}/>
            </div>

            <div className="content_card">
            <div className=" button-div">
                <span>*Quiz CSCT284 Batch - 1*</span>
                <small>Date: 9/11/2023</small>
                <small>Time: 20:43</small>
                
            </div>
            <FaChevronRight style={{cursor:"pointer"}} onSubmit={{}}/>
            </div>

            <div className="content_card">
            <div className=" button-div">
                <span>*Quiz CSCT284 Batch - 2*</span>
                <small>Date: 9/11/2023</small>
                <small>Time: 20:43</small>
            </div>
            <FaChevronRight style={{cursor:"pointer"}} onSubmit={{}}/>
            </div>

            <div className="content_card">
            <div className=" button-div">
                <span>*Quiz CSCT284 Batch - 3*</span>
                <small>Date: 9/11/2023</small>
                <small>Time: 20:43</small>
            </div>
            <FaChevronRight style={{cursor:"pointer"}} onSubmit={{}}/>
            </div>

            <div className="content_card">
            <div className=" button-div">
                <span>*Quiz CSCT284 Batch - 4*</span>
                <small>Date: 9/11/2023</small>
                <small>Time: 20:43</small>
                
            </div>
            <FaChevronRight style={{cursor:"pointer"}} onSubmit={{}}/>
            </div>
        </div>

      <div className="SVG-CONTAINER">
            {/* SVG Background */}
            <img 
                src={svgImage} 
                alt="SVG Background" 
                className="svg-background" 
            />
        </div>

    </div>
    </>
  );
}

export default QuizHome;
