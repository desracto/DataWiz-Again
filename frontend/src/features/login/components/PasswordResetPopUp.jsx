import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordResetPopUp.css";

const PasswordResetPopUp = () => {
  const navigate = useNavigate();

  const onLeaveWithoutSavingButtonClick = useCallback(() => {
    navigate("/LoginPage");
  }, [navigate]);

  return (
    <div className="password-reset-pop-up-container">
        <div className="password-reset-pop-up-card">
            <div className="reset-password-title">
                Reset Password
            </div>
        <div className="if-your-email-container">
            <p className="password-reset-pop-up-text1">
            If your email address is registered with us, you will receive an email
            with password reset instructions shortly.
            </p>
            <p className="password-reset-pop-up-text2">
            Please check your inbox (and your spam folder) for further details.
            </p>
        </div>
            <button 
                className="leave-without-saving-button-child"     
                onClick={onLeaveWithoutSavingButtonClick}>
                <div className="leave-without-saving-BT">
                    Close
                </div>
            </button>
        </div>
    </div>
  );
};

export default PasswordResetPopUp;
