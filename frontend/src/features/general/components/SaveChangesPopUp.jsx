import React, { useCallback } from "react";
import "./SaveChangesPopUp.css";

// Define the SaveChangesPopUp functional component
const SaveChangesPopUp = ({ onConfirm, onCancel }) => {
    return (
        // Outer container for the save changes pop-up
        <div className="save-changes-pop-up-container">
            {/* Card containing the save changes confirmation content */}
            <div className="save-changes-pop-up-card">
                {/* Title indicating confirmation to save changes */}
                <div className="save-changes1">Save Changes?</div>
                {/* Message asking the user to confirm saving changes */}
                <div className="are-you-sure">
                    Are you sure you want to save these changes?
                </div>

                {/* Button for confirming the save changes, with an onClick handler */}
                <button className="confirm-button" onClick={onConfirm}>
                    Ok
                </button>

                {/* Button for canceling the save changes, with an onClick handler */}
                <button className="save-changes-pop-up-cancelButton" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SaveChangesPopUp;