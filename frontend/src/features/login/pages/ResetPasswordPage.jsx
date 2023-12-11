import { useState, useCallback } from "react";
import PasswordResetPopUp from "../components/PasswordResetPopUp";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";

// Component Imports
import Header1 from '../../../global_components/Header1';

// Image Imports
import LeftArrow from '../../../assets/images/left-arrow.png';

// ResetPassword component for handling password reset functionality
const ResetPassword = () => {
    // State to manage the visibility of the PasswordResetPopUp
    const [isPasswordResetPopUpOpen, setPasswordResetPopUpOpen] = useState(false);

    // Using the useNavigate hook for navigation
    const navigate = useNavigate();

    // Function to open the PasswordResetPopUp
    const openPasswordResetPopUp = useCallback(() => {
        setPasswordResetPopUpOpen(true);
    }, []);

    // Function to close the PasswordResetPopUp
    const closePasswordResetPopUp = useCallback(() => {
        setPasswordResetPopUpOpen(false);
    }, []);

    // Function to navigate back to the login page
    const onBackArrowContainer1Click = useCallback(() => {
        navigate("/LoginPage");
    }, [navigate]);

    return (
        <>
            <Header1 />

            {/* Main content of the ResetPasswordPage */}
            <div className="Reset-Password-Container">
                <div className="Reset-Password-Card">
                    {/* Button to return to the login page */}
                    <div className="Return-to-Login" onClick={onBackArrowContainer1Click}>
                        <div className="Return-to-Login-Circle">
                            <img
                                src={LeftArrow}
                                alt=""
                                className="arrow-left1">
                            </img>
                        </div>
                    </div>

                    {/* Title and description for the password reset */}
                    <div className="reset-password-title">
                        Reset your Password
                    </div>
                    <p className="reset-password-text">
                        Enter your email address below, and we'll
                        send you instructions to reset your password
                    </p>

                    {/* Input field for the email address */}
                    <div className="email-address-title">
                        Email Address
                    </div>
                    <input
                        className="email-address-field"
                        placeholder="Enter the linked email address"
                        type="email"
                    />

                    {/* Button to initiate sending a reset code */}
                    <button
                        className="send-code-button"
                        onClick={openPasswordResetPopUp}
                    >
                        <div className="Send-Code-Button-Text">
                            Send Code
                        </div>
                    </button>
                </div>
            </div>

            {/* Render PasswordResetPopUp using PortalPopup when isPasswordResetPopUpOpen is true */}
            {isPasswordResetPopUpOpen && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closePasswordResetPopUp}
                >
                    {/* Pass onClose function to PasswordResetPopUp */}
                    <PasswordResetPopUp onClose={closePasswordResetPopUp} />
                </PortalPopup>
            )}

        </>
    );
};

export default ResetPassword;
