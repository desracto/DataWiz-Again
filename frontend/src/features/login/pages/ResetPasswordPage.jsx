import { useState, useCallback } from "react";
import PasswordResetPopUp from "../components/PasswordResetPopUp";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";

// Component Imports
import Header1 from '../../../global_components/Header1';

// Image Imports
import LeftArrow from '../../../assets/images/left-arrow.png';

const ResetPassword = () => {
  const [isPasswordResetPopUpOpen, setPasswordResetPopUpOpen] = useState(false);
  const navigate = useNavigate();

  const openPasswordResetPopUp = useCallback(() => {
    setPasswordResetPopUpOpen(true);
  }, []);

  const closePasswordResetPopUp = useCallback(() => {
    setPasswordResetPopUpOpen(false);
  }, []);

  const onBackArrowContainer1Click = useCallback(() => {
    navigate("/LoginPage");
  }, [navigate]);

  return (
    <>
        <Header1/>
        <div className="Reset-Password-Container">
            <div className="Reset-Password-Card">
                <div className="back-arrow1" onClick={onBackArrowContainer1Click}>
                    <div className="group-item">
                        <img 
                            src={LeftArrow}
                            className="vuesaxlineararrow-left">
                        </img>
                    </div>
                </div>

                <div className="reset-password-title">
                    Reset your Password
                </div>

                <p className="reset-password-text">
                    Enter your email address below, and we'll 
                    send you instructions to reset your password
                </p>

                <div className="email-address-title">
                    Email Address
                </div>
                <input
                    className="email-address-field"
                    placeholder="Enter the linked email address"
                    type="email"
                />

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

{/* ------------------------------- */}


      {isPasswordResetPopUpOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePasswordResetPopUp}
        >
          <PasswordResetPopUp onClose={closePasswordResetPopUp} />
        </PortalPopup>
      )}

    </>
  );
};

export default ResetPassword;
