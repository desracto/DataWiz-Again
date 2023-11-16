import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SaveChangesPopUp.css";

const SaveChangesPopUp = ({ onClose }) => {
  const navigate = useNavigate();

  const onConfirmButtonContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="save-changes-pop-up">
      <div className="back-card1" />
      <div className="are-you-sure">{` Are you sure you want to save these changes ? `}</div>
      <div className="query-animation-title1">
        <div className="save-changes1">Save Changes?</div>
      </div>
      <div className="confirm-button" onClick={onConfirmButtonContainerClick}>
        <div className="confirm-button-child" />
        <div className="button-text2">Ok</div>
      </div>
      <button className="cancel2" onClick={onClose}>
        <div className="cancel-item" />
        <div className="cancel3">Cancel</div>
      </button>
    </div>
  );
};

export default SaveChangesPopUp;
