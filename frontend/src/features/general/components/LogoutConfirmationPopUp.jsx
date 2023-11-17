import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutConfirmationPopUp.css";

const LogoutConfirmationPopUp = ({ onClose }) => {
  const navigate = useNavigate();

  const onConfirmButtonContainerClick = useCallback(() => {
    navigate("/LandingPage");
    
    // Scroll to the top of the page
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  }, [navigate]);

  return (
    <div className="Logout-pop-up-container">
      <div className="Logout-pop-up-card">
        <div className="confirm-Logout">Log out?</div>
        <div className="are-you-sure-3">Are you sure you want to Log out from this profile?</div>
        
        <button className="confirm-Logout-button" onClick={onConfirmButtonContainerClick}>
          Log out
        </button>
        <button className="Logout-pop-up-cancelButton" onClick={onClose}>  
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutConfirmationPopUp;
