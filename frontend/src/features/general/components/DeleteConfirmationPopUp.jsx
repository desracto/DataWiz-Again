import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./DeleteConfirmationPopUp.css";

const DeleteConfirmationPopUp = ({ onClose }) => {
  const navigate = useNavigate();

  const onConfirmButtonContainerClick = useCallback(() => {
    navigate("/LandingPage");
  }, [navigate]);

  return (
    <div className="deleteConfirm-pop-up-container">
      <div className="deleteConfirm-pop-up-card">
        <div className="confirm-deletion">Confirm Deletion</div>
        <div className="are-you-sure-2">  Are you sure you want to delete this profile from the database? This action cannot be undone. </div>
        
        <button className="confirm-delete-button" onClick={onConfirmButtonContainerClick}>
          Delete
        </button>
        <button className="deleteConfirm-pop-up-cancelButton" onClick={onClose}>  
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopUp;
