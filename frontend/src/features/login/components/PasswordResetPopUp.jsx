import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordResetPopUp.css";

// Functional component for the password reset pop-up
const PasswordResetPopUp = () => {
    // Using the useNavigate hook from react-router-dom to enable navigation
    const navigate = useNavigate();

    // Callback function to handle the click event on the "Close" button
    const onLeaveWithoutSavingButtonClick = useCallback(() => {
        // Navigating to the "/LoginPage" route when the button is clicked
        navigate("/LoginPage");
    }, [navigate]);

    // Rendering the password reset pop-up component
    return (
        <div className="password-reset-pop-up-container">
            {/* Container for the password reset pop-up card */}
            <div className="password-reset-pop-up-card">
                {/* Title for the password reset pop-up */}
                <div className="reset-password-title">Reset Password</div>

                {/* Container for informational text about the password reset */}
                <div className="if-your-email-container">
                    {/* First paragraph of the informational text */}
                    <p className="password-reset-pop-up-text1">
                        If your email address is registered with us, you will receive an email
                        with password reset instructions shortly.
                    </p>

                    {/* Second paragraph of the informational text */}
                    <p className="password-reset-pop-up-text2">
                        Please check your inbox (and your spam folder) for further details.
                    </p>
                </div>

                {/* Button to close the password reset pop-up */}
                <button
                    className="leave-without-saving-button-child"
                    onClick={onLeaveWithoutSavingButtonClick}
                >
                    {/* Container for the button text */}
                    <div className="leave-without-saving-BT">Close</div>
                </button>
            </div>
        </div>
    );
};

export default PasswordResetPopUp;
