import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import "./GeneratedQuizLink.css";

// Define the GeneratedQuizLinkComp functional component
function GeneratedQuizLinkComp({ onClose, quizID, linkGenerated }) {
    // Construct the quiz link based on the current window location and quizID
    const link = window.location.host + "/quiz/attempt-quiz/" + quizID;

    // Function to handle the click event for copying the quiz link to the clipboard
    const handleCopyClick = () => {
        navigator.clipboard.writeText(link);
    };

    return (
        <div className="overlay">
            <div className="modal">
                {/* Modal header with close icon */}
                <div className="modal-header">
                    <RxCross2 className="close-icon" size={30} onClick={onClose} />
                </div>

                {/* Checkmark icon indicating successful link generation */}
                <FaRegCheckCircle className="check-icon" size={70} color="#4CAF50" />

                {/* Title indicating the purpose of the modal */}
                <span className="title">Generated Quiz Link</span>

                {/* Container for displaying and copying the generated quiz link */}
                <div className="link-container">
                    <input type="text" className="link" value={link} />
                </div>

                {/* Copy icon for copying the quiz link to the clipboard */}
                <FaCopy className="copy-icon" size={25} onClick={handleCopyClick} />
            </div>
        </div>
    );
}

export default GeneratedQuizLinkComp;
