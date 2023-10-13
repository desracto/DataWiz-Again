import { useState, useCallback } from "react";
import PasswordResetPopUp from "../components/PasswordResetPopUp";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";
import Header1 from '../../../global_components/Header1';

const ResetPassword = () => {
  const [isPasswordResetPopUpOpen, setPasswordResetPopUpOpen] = useState(false);
  const navigate = useNavigate();

  const openPasswordResetPopUp = useCallback(() => {
    setPasswordResetPopUpOpen(true);
  }, []);

  const closePasswordResetPopUp = useCallback(() => {
    setPasswordResetPopUpOpen(false);
  }, []);

  const onRectangle1Click = useCallback(() => {
    navigate("/LoginPage");
  }, [navigate]);

  const onBackArrowContainer1Click = useCallback(() => {
    navigate("/LoginPage");
  }, [navigate]);

  const onArrowCircle1Click = useCallback(() => {
    navigate("/LoginPage");
  }, [navigate]);

  return (
    <>
      <div className="reset-password1">
        <div className="login-page">
            <Header1/>
          <div className="login-card">
            <div className="login-card-child" />
            <div className="card-info">
              <button
                className="send-code-button"
                onClick={openPasswordResetPopUp}
              >
                <div
                  className="send-code-button-child"
                  onClick={onRectangle1Click}
                />
                <div className="button-text2">Send Code</div>
              </button>
              <div className="emailfield1" />
              <div className="reset-your-password">Reset your Password</div>
              <div className="enter-your-email-container">
                <p className="enter-your-email">{`Enter your email address below, and we'll send you `}</p>
                <p className="enter-your-email">
                  instructions to reset your password
                </p>
              </div>
            </div>
          </div>
          <div className="email-address">Email Address</div>
          <input
            className="textbox5"
            placeholder="Enter the linked email address"
            type="email"
          />
          <div className="back-arrow">
            <div className="arrow-circle1">
              <div className="arrow-circle-inner">
                <div className="group-child" />
              </div>
              <div className="vuesaxlineararrow-left">
                <div className="arrow-circle-inner">
                  <div className="arrow-circle-inner">
                    <img className="vector-icon1" alt="" src="/vector1.svg" />
                    <img className="vector-icon2" alt="" src="/vector2.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="back-arrow1" onClick={onBackArrowContainer1Click}>
            <div className="arrow-circle-inner">
              <div className="group-item" />
            </div>
            <div className="arrow-circle2" onClick={onArrowCircle1Click}>
              <div className="vuesaxlineararrow-left">
                <div className="arrow-circle-inner">
                  <div className="arrow-circle-inner">
                    <img className="vector-icon3" alt="" src="/vector3.svg" />
                    <img className="vector-icon4" alt="" src="/vector2.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
