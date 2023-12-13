import SecondHeader from "../../../global_components/SecondHeader";
import Footer from '../../../global_components/Footer';
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import "./AllAttemptsPage.css";
import pdf from '../../../assets/images/pdf.png';

// Define the AllAttempts functional component
const AllAttempts = () => {
    // Use React Router hook for navigation
    const navigate = useNavigate();

    // Callback function for handling the back button click
    const ViewBackButtonClick = useCallback(() => {
        navigate("/CompletedQuizPage");
    }, [navigate]);

    return (
        <>
            {/* Include the SecondHeader component */}
            <SecondHeader />

            {/* Main content container */}
            <div className="main_Page">
                {/* Back arrow button */}
                <button onClick={ViewBackButtonClick} className="back-arrow-button">
                    {/* SVG icon for the back arrow */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Container for All Attempts content */}
                <div className={"max-w-7xl AllAttempts-content_container_bgcolor mx-auto h-auto rounded-2xl z-10"}>
                    <div className="px-20 mt-[80px]">
                        {/* Title for All Attempts section */}
                        <div className="All-attempts-textt">All Attempts</div>

                        <div className={"py-5"}>
                            {/* Container for attempts list */}
                            <div className={"All-attempts-Inner-Container"}>
                                {/* Attempt item */}
                                <li className={"Attempts-List"}>
                                    Name: Hiba Gohar
                                    <span className="Auto-Grading-Results-Text">
                                        {/* PDF icon */}
                                        <img src={pdf} alt="PDF" className="PDF-Icon" />
                                        Auto-Grading Results
                                    </span>
                                </li>

                                {/* Add a blank line */}
                                <p className={"blankLine"}>&nbsp;</p>

                                {/* Another attempt item */}
                                <li className={"Attempts-List"}>
                                    Name: Hiba Gohar
                                    <span className="Auto-Grading-Results-Text">
                                        {/* PDF icon */}
                                        <img src={pdf} alt="PDF" className="PDF-Icon" />
                                        Auto-Grading Results
                                    </span>
                                </li>

                                {/* Add a blank line */}
                                <p className={"blankLine"}>&nbsp;</p>

                                {/* Yet another attempt item */}
                                <li className={"Attempts-List"}>
                                    Name: Tehami
                                    <span className="Auto-Grading-Results-Text">
                                        {/* PDF icon */}
                                        <img src={pdf} alt="PDF" className="PDF-Icon" />
                                        Auto-Grading Results
                                    </span>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllAttempts;
