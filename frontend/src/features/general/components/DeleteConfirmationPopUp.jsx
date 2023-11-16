import "./DeleteConfirmationPopUp.css";

const DeleteConfirmationPopUp = ({ onClose }) => {
  return (
    <div className="delete-confirmation-pop-up1">
      <div className="back-card2" />
      <div className="you-have-unsaved1">
        {" "}
        Are you sure you want to delete this profile from the database? This
        action cannot be undone.
      </div>
      <div className="query-animation-title2">
        <div className="leave-animation-page-container">
          <p className="confirm-deletion">Confirm Deletion</p>
        </div>
      </div>
      <div className="save-leave-button1">
        <div className="save-leave-button-item" />
        <div className="button-text3">Delete</div>
      </div>
      <button className="cancel4" onClick={onClose}>
        <div className="cancel-inner" />
        <div className="cancel5">Cancel</div>
      </button>
    </div>
  );
};

export default DeleteConfirmationPopUp;
