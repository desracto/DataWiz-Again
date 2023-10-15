import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Header1 from '../../../global_components/Header1';
import HiddenEye  from '../../../assets/images/clarityeyehideline.svg'
import GoogleLogo from '../../../assets/images/google-account-login.svg'

const LoginPage = () => {
  const navigate = useNavigate();

  const onForgotPasswordClick = useCallback(() => {
    navigate("/ResetPasswordPage");
  }, [navigate]);

  const onRegisterButtonClick = useCallback(() => {
    navigate("/SignUpPage");
  }, [navigate]);

  return (
    <>
    <div className="login-page1">
      <div className="login-page2">
      <Header1/>
        <div className="login-card1">
          <div className="login-card-item" />
          <div className="welcome-back-to">Welcome back to DataWiz.</div>
          <div className="Login-or-continue-with">or continue with</div>
          <img
            className="LoginPage-google-account-login"
            alt=""
            src={GoogleLogo}
          />
          <button className="Login-signinButton">
            <div className="Login-signinButton-child" />
            <div className="Login-signinButton-Text">Sign in</div>
          </button>
          <label className="Login-forgotPassword-label" onClick={onForgotPasswordClick}>
            <div className="Login-forgotPassword-text">Forgot Password?</div>
          </label>
          <div className="dont-have-an-account-yet-parent">
            <div className="dont-have-an">Don’t have an account yet?</div>
            <label className="Login-register-button" onClick={onRegisterButtonClick}>
              <div className="Login-forgotPassword-text">Register for free</div>
            </label>
          </div>
          <div className="login-info">
            <div className="Login-passwordfield">
              <div className="Login-Password-inputLabel">Password</div>
              <input
                className="Login-Password-inputField"
                name="login-password"
                type="password"
              />
            </div>
            <img
              className="Login-HideEyeIcon"
              alt="hidden eye"
              src={HiddenEye}
            />
            <div className="login_emailfield">
              <div className="input-label1">Email</div>
              <input
                className="Login-emailField"
                name="Login-email"
                placeholder="xyz@gmail.com"
                type="email"
              />
            </div>
            <div className="Login-header">Login</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
