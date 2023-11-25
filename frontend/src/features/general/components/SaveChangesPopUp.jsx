import React,{ useCallback } from "react";
import "./SaveChangesPopUp.css";

const SaveChangesPopUp = ({ onConfirm, onCancel }) => {
  return (
    <div className="save-changes-pop-up-container">
      <div className="save-changes-pop-up-card">
        <div className="save-changes1">Save Changes?</div>
        <div className="are-you-sure"> Are you sure you want to save these changes ? </div>
        
        <button className="confirm-button" onClick={onConfirm}>
          Ok
        </button>
        <button className="save-changes-pop-up-cancelButton" onClick={onCancel}>  
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SaveChangesPopUp;
