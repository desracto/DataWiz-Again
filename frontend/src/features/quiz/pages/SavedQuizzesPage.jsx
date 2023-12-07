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
    const [quizData, setQuizData] = useState([])

    const quizzes = [
        {
            "id": "quiz_2",
            "quiz_name": "Quiz 2",
            "start_time": "12/07/2023 - 12:40:00",
            "description": "A test Quiz",
            "responses": [
                {
                    "question_number": 1,
                    "problem": "List all the students with their email addresses.",
                    "answer": "SELECT FirstName, LastName, Email FROM Student;",
                    "user_answer": "SELECT first_name, last_name, Email_addr FROM Students;",
                },
                {
                    "question_number": 2,
                    "problem": "Find the total number of students enrolled in each course.",
                    "answer": "SELECT CourseID, COUNT(StudentID) AS NumberOfStudents FROM Enrollment GROUP BY CourseID;",
                    "user_answer": "SELECT CourseID, COUNT(StudentID) AS NumberOfStudents FROM Enrollment ORDER BY CourseID;",
                },
                {
                    "question_number": 3,
                    "problem": "Provide the names of instructors along with the courses they teach.",
                    "answer": "SELECT i.InstructorName, c.CourseName FROM Instructor i JOIN Course c ON i.InstructorID = c.InstructorID GROUP BY CourseID ORDER BY CourseID;",
                    "user_answer": "SELECT i.InstructorName, c.CourseName FROM Instructors i LEFT JOIN Courses c ON i.InstructorID = c.InstructorID",
                },
                {
                    "question_number": 4,
                    "problem": "Retrieve all blogger names and their email addresses.",
                    "answer": "SELECT BloggerName, Email FROM Blogger;",
                    "user_answer": "SELECT BloggerName, Email FROM Blogger;",
                },
                {
                    "question_number": 5,
                    "problem": "List all blog posts along with their corresponding blogger names.",
                    "answer": "SELECT b.BloggerName, bp.Title, bp.Conte FROM Blogger b JOIN BlogPost bp ON b.BloggerID = bp.Blogg;",
                    "user_answer": "SELECT b.BloggerName, bp.Title FROM Blogger b JOIN BlogPost bp ON b.BloggerID = bp.Blogg;",
                },
            ]
        },
        {
            "id": "quiz_1",
            "quiz_name": "Quiz 1",
            "start_time": "12/07/2023 - 12:40:00",
            "description": "A test Quiz",
            "responses": [
                {
                    "question_number": 1,
                    "problem": "What are the names and job titles of all employees?",
                    "answer": "SELECT Name, Job_Title FROM Employee;",
                    "user_answer": "SELECT Name, JobTitle FROM Employees;",
                },
                {
                    "question_number": 2,
                    "problem": "Which departments have a budget greater than a certain amount?",
                    "answer": "SELECT Dept_name FROM Department WHERE Budget > 100;",
                    "user_answer": "SELECT Dept_id, Dept_name FROM Department WHERE Budget > 100;",
                },
                {
                    "question_number": 3,
                    "problem": "List the names of the projects along with the names of the employees working on them.",
                    "answer": "SELECT p.Project_name, e.Name FROM Project p JOIN Employee e ON p.Project_id = e.Project_id;",
                    "user_answer": "SELECT p.prject_namee, e.Name FROM Project p LEFT JOIN Employee e ON p.Project_id = e.Project_id;",
                },
                {
                    "question_number": 4,
                    "problem": "How many employees are there in each department?",
                    "answer": "SELECT Dept_id, COUNT() as NumberOfEmployees FROM Employee GROUP BY Dept_id;",
                    "user_answer": "SELECT Dept_id, COUNT() as NumberOfEmployees FROM Employee GROUP BY Dept_id;",
                },
                {
                    "question_number": 5,
                    "problem": "Find the department with the maximum number of employees.",
                    "answer": "SELECT Dept_id, COUNT() as NumberOfEmployees FROM Employee GROUP BY Dept_id ORDER BY NumberOfEmployees DESC LIMIT 1;",
                    "user_answer": "SELECT Dept_name, COUNT() as NumberOfEmployees FROM Employee GROUP BY Dept_id ORDER BY NumberOfEmployees DESC",
                },
                {
                    "question_number": 6,
                    "problem": "Get the details of employees who do not have a phone number listed.",
                    "answer": "SELECT * FROM Employee WHERE Phone_no IS NULL;",
                    "user_answer": "SELECT * FROM Employee WHERE Phone_no IS NULL;",
                },
                {
                    "question_number": 7,
                    "problem": "What is the contact information for all patients?",
                    "answer": "SELECT FirstName, LastName, Email, Phone_no FROM Patient;",
                    "user_answer": "SELECT first_name, last_name, email_addr, Phone_no FROM Patient ORDER BY last_name;",
                },
                {
                    "question_number": 8,
                    "problem": "How can we find the number of appointments per doctor?",
                    "answer": "SELECT DoctorID, COUNT() AS NumberOfAppointments FROM Appointment GROUP BY DoctorID;",
                    "user_answer": "SELECT DoctorID, COUNT() AS NumberOfAppointments FROM Appointment GROUP BY DoctorID;",
                },
                {
                    "question_number": 9,
                    "problem": "Which patients are currently assigned to a room?",
                    "answer": "SELECT * FROM Patient WHERE RoomID IS NOT NULL;",
                    "user_answer": "SELECT * FROM Patient WHERE RoomID IS NOT NULL;",
                },
                {
                    "question_number": 10,
                    "problem": "What are the details of doctors along with their specialties?",
                    "answer": "SELECT DoctorName, Specialty FROM Doctor;",
                    "user_answer": "SELECT doc_naame, Specialties FROM Doctor;",
                },
                {
                    "question_number": 11,
                    "problem": "List all the students with their email addresses.",
                    "answer": "SELECT FirstName, LastName, Email FROM Student;",
                    "user_answer": "SELECT first_nname, last_name_, email_addr FROM Student;",
                },
                {
                    "question_number": 12,
                    "problem": "Find the total number of students enrolled in each course.",
                    "answer": "SELECT CourseID, COUNT(StudentID) AS NumberOfStudents FROM Enrollment GROUP BY CourseID;",
                    "user_answer": "SELECT CourseID, COUNT(StudentID) AS NumberOfStudents FROM Enrollment GROUP BY CourseID;",
                },
                {
                    "question_number": 13,
                    "problem": "Provide the names of instructors along with the courses they teach.",
                    "answer": "SELECT i.InstructorName, c.CourseName FROM Instructor i JOIN Course c ON i.InstructorID = c.InstructorID;",
                    "user_answer": "SELECT i.InstructorName, c.CourseName FROM Instructor i JOIN Course c ON i.InstructorID = c.InstructorID;",
                },
                {
                    "question_number": 14,
                    "problem": "Display the courses along with the names of students enrolled and their enrollment dates.",
                    "answer": "SELECT c.CourseName, s.FirstName, s.LastName, e.EnrollmentDat FROM Course c JOIN Enrollment e ON c.CourseID = e.CourseID JOIN Student s ON e.StudentID = s.StudentID;",
                    "user_answer": "SELECT c.CourseName, s.FirstName, s.LastName, e.EnrollmentDat FROM Course c JOIN Enrollment e ON c.CourseID = e.CourseID JOIN Student s ON e.StudentID = s.StudentID;",
                },
            ]
        }
        
        
    ]

    // on render
    useEffect(() => {
        // request({
        //     url: "api/quiz/retrieve-quizzes",
        //     method: "get"
        // })
        // .then(response => {
        //     // console.log(response.data)
        //     setQuizData(response.data)
        // })
        // .catch(error => {
        //     console.error(error)
        // })
        setQuizData(quizzes)


    }, [])

    // Print the updated quizData
    useEffect(() => {
        console.log(quizData)
    }, [quizData])

    
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
  
    const goToCompletedQuiz = () => {
        navigate("/CompletedQuizPage");
    };

    const goToCompletedQuiz2 = () => {
        navigate("/CompletedQuizPage2");
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
            
            <div key={"quiz_2"} className="content_card">
                <div className="button-div completed "> 
                    <span> Quiz 2 </span>
                    <small>Date: 12/07/2023</small>
                    <small>Time: 12:40:00</small> 
                    <span3>UNATTEMPTED</span3> 
                </div>
                
                <FaChevronRight style={{cursor:"pointer"}} onClick={() => goToCompletedQuiz()}/>
            </div>

            <div key={"quiz_1"} className="content_card">
                <div className="button-div completed "> 
                    <span> Quiz 1 </span>
                    <small>Date: 12/07/2023</small>
                    <small>Time: 12:40:00</small> 
                    <span3>UNATTEMPTED</span3> 
                </div>
                
                <FaChevronRight style={{cursor:"pointer"}} onClick={() => goToCompletedQuiz()}/>
            </div>            
        </div>
    </div>
    </>
  );
}

export default SavedQuizzes;
