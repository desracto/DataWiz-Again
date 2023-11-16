import { useCallback } from "react";
import "./LogoutConfirmationPopUp.css";

const LogoutConfirmationPopUp = ({ onClose }) => {
  const onSaveLeaveButtonClick = useCallback(() => {
    // Please sync "Landing Page " to the project
  }, []);

  return (
    <div className="logout-confirmation-pop-up">
      <div className="delete-confirmation-pop-up">
        <div className="back-card" />
        <div className="you-have-unsaved">
          {" "}
          Are you sure you want to Log out from this profile?
        </div>
        <div className="query-animation-title">
          <div className="leave-animation-page">Log out?</div>
        </div>
        <div className="save-leave-button" onClick={onSaveLeaveButtonClick}>
          <div className="save-leave-button-child" />
          <div className="button-text1">Log out</div>
        </div>
        <button className="cancel" onClick={onClose}>
          <div className="cancel-child" />
          <div className="cancel1">Cancel</div>
        </button>
      </div>
    </div>
  );
};

export default LogoutConfirmationPopUp;
