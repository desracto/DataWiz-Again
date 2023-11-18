import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SaveChangesPopUp.css";

const SaveChangesPopUp = ({ onClose }) => {
  const navigate = useNavigate();

  const onConfirmButtonContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="save-changes-pop-up-container">
      <div className="save-changes-pop-up-card">
        <div className="save-changes1">Save Changes?</div>
        <div className="are-you-sure"> Are you sure you want to save these changes ? </div>
        
        <button className="confirm-button" onClick={onConfirmButtonContainerClick}>
          Ok
        </button>
        <button className="save-changes-pop-up-cancelButton" onClick={onClose}>  
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SaveChangesPopUp;
