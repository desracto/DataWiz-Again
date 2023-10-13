import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordResetPopUp.css";

const PasswordResetPopUp = () => {
  const navigate = useNavigate();

  const onLeaveWithoutSavingButtonClick = useCallback(() => {
    navigate("/LoginPage");
  }, [navigate]);

  return (
    <div className="password-reset-pop-up">
      <div className="password-reset-pop-up-child" />
      <div className="query-animation-title">
        <div className="reset-password">Reset Password</div>
      </div>
      <img
        className="circle-check-regular-2-1"
        alt=""
        src="/circlecheckregular-2-1.svg"
      />
      <div className="if-your-email-container">
        <p className="if-your-email">
          If your email address is registered with us, you will receive an email
          with password reset instructions shortly.
        </p>
        <p className="if-your-email">
          Please check your inbox (and your spam folder) for further details.
        </p>
      </div>
      <div
        className="leave-without-saving-button"
        onClick={onLeaveWithoutSavingButtonClick}
      >
        <button className="leave-without-saving-button-child" />
        <div className="leave-without-saving">Close</div>
      </div>
    </div>
  );
};

export default PasswordResetPopUp;
