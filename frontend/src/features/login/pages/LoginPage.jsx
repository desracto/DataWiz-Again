import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

// Component Imports
import Header1 from '../../../global_components/Header1';

// Images Imports
import HiddenEye  from '../../../assets/images/clarityeyehideline.svg'
import GoogleLogo from '../../../assets/images/google-account-login.svg'
import LeftArrow from '../../../assets/images/left-arrow.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const onForgotPasswordClick = useCallback(() => {
    navigate("/ResetPasswordPage");
  }, [navigate]);

  const onRegisterButtonClick = useCallback(() => {
    navigate("/SignUpPage");
  }, [navigate]);

  const onBackArrowContainer1Click = useCallback(() => {
    navigate("/LandingPage");
  }, [navigate]);

  return (
    <>
        <Header1/>
        <div className="login-card-container">
            <div className="login-card-item">
                <div className="Return-Landing-Login1" onClick={onBackArrowContainer1Click}>
                    <div className="Return-Landing-Login-Circle">
                        <img 
                            src={LeftArrow}
                            alt=""
                            className="Return-Landing-Login-left">
                        </img>
                    </div>
                </div>

                <div className="welcome-back-to">
                    Welcome back to DataWiz.
                </div>
                <div className="Login-header">
                    Login
                </div>
                <div className="EmailSection">
                    <div className="input-label1">
                        Email
                    </div>
                    <input
                        className="Login-emailField"
                        name="Login-email"
                        placeholder="xyz@gmail.com"
                        type="email"
                    />
                </div>

                <div className="PasswordSection">
                    <div className="Login-Password-inputLabel">
                        Password
                    </div>
                    <input
                        className="Login-Password-inputField"
                        placeholder="*******"
                        name="login-password"
                        type="password"
                    />
                    {/* <img
                        className="Login-HideEyeIcon"
                        alt="hidden eye"
                        src={HiddenEye}
                    /> */}
                    <label className="Login-forgotPassword-label" onClick={onForgotPasswordClick}>
                        <div className="Login-forgotPassword-text">
                            Forgot Password?
                        </div>
                    </label>
                </div>

                <button className="Login-signinButton">
                    <div className="Login-signinButton-Text">
                        Sign in
                    </div>
                </button>
                <div className="GoogleContainer">
                    <div className="Login-or-continue-with">
                        or continue with
                    </div>
                    <img
                    className="LoginPage-google-account-login"
                    alt=""
                    src={GoogleLogo}
                    />
                </div>

                <div className="dont-have-an-account-yet-parent">
                    <div className="dont-have-an">
                        Don’t have an account yet?
                    </div>
                    <label className="Login-register-button" onClick={onRegisterButtonClick}>
                        <div className="Login-register-text">
                            Register for free
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </>
  );
};

export default LoginPage;
