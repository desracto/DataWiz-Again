import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./DeleteConfirmationPopUp.css";

// Define the DeleteConfirmationPopUp functional component, taking in props
const DeleteConfirmationPopUp = ({ onClose, onDeleteConfirmed }) => {
  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  // Define a memoized callback function for handling the confirmation button click
  const onConfirmButtonContainerClick = useCallback(() => {
    // Navigate to the "/LandingPage" route when the confirm button is clicked
    onDeleteConfirmed();
  }, [navigate]);

  return (
    // Outer container for the delete confirmation pop-up
    <div className="deleteConfirm-pop-up-container">
      {/* Card containing the delete confirmation content */}
      <div className="deleteConfirm-pop-up-card">
        {/* Title indicating confirmation of deletion */}
        <div className="confirm-deletion">Confirm Deletion</div>
        {/* Message asking the user to confirm the deletion */}
        <div className="are-you-sure-2">
          Are you sure you want to delete this profile from the database? This action cannot be undone.
        </div>

        {/* Button for confirming the deletion, with an onClick handler */}
        <button className="confirm-delete-button" onClick={onConfirmButtonContainerClick}>
          Delete
        </button>
        
        {/* Button for canceling the deletion, with an onClick handler */}
        <button className="deleteConfirm-pop-up-cancelButton" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopUp;
