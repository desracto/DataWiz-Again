import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutConfirmationPopUp.css";

// Define the LogoutConfirmationPopUp functional component, taking in props
const LogoutConfirmationPopUp = ({ onClose }) => {
    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Define a memoized callback function for handling the confirmation button click
    const onConfirmButtonContainerClick = useCallback(() => {
        // Navigate to the "/LandingPage" route when the confirm button is clicked
        navigate("/LandingPage");

        // Scroll to the top of the page
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    }, [navigate]);

    return (
        // Outer container for the logout confirmation pop-up
        <div className="Logout-pop-up-container">
            {/* Card containing the logout confirmation content */}
            <div className="Logout-pop-up-card">
                {/* Title indicating confirmation of logout */}
                <div className="confirm-Logout">Log out?</div>
                {/* Message asking the user to confirm the logout */}
                <div className="are-you-sure-3">
                    Are you sure you want to Log out from this profile?
                </div>

                {/* Button for confirming the logout, with an onClick handler */}
                <button className="confirm-Logout-button" onClick={onConfirmButtonContainerClick}>
                    Log out
                </button>

                {/* Button for canceling the logout, with an onClick handler */}
                <button className="Logout-pop-up-cancelButton" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LogoutConfirmationPopUp;
