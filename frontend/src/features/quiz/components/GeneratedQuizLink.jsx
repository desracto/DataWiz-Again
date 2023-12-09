import React from "react";
import { FaRegCheckCircle} from "react-icons/fa";
import {FaCopy } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import "./GeneratedQuizLink.css";

function GeneratedQuizLinkComp({ onClose, quizID, linkGenerated }) {
  const link = window.location.host + "/quiz/attempt-quiz/" + quizID;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <RxCross2 className="close-icon" size={30} onClick={onClose} />
        </div>
        <FaRegCheckCircle className="check-icon" size={70} color="#4CAF50" />
        <span className="title">Generated Quiz Link</span>
        <div className="link-container">
          <input type="text" className="link" value={link} />
          </div>
          <FaCopy className="copy-icon" size={25} onClick={handleCopyClick} />
        
      </div>
    </div>
  );
}

export default GeneratedQuizLinkComp;
