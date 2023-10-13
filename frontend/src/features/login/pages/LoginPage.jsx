import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Header1 from '../../../global_components/Header1';

const LoginPage = () => {
  const navigate = useNavigate();

  const onForgotPasswordClick = useCallback(() => {
    navigate("/ResetPasswordPage");
  }, [navigate]);

  const onRegisterButtonClick = useCallback(() => {
    navigate("/SignUpPage");
  }, [navigate]);

  return (
    <div className="login-page1">
      <div className="login-page2">
      <Header1/>
        <div className="login-card1">
          <div className="login-card-item" />
          <div className="welcome-back-to">Welcome back to DataWiz.</div>
          <div className="or-continue-with">or continue with</div>
          <img
            className="google-account-login"
            alt=""
            src="/google-account-login1.svg"
          />
          <button className="signin-button">
            <div className="signin-button-child" />
            <div className="button-text2">Sign in</div>
          </button>
          <label className="forgot-password" onClick={onForgotPasswordClick}>
            <div className="text-button1">Forgot Password?</div>
          </label>
          <div className="dont-have-an-account-yet-parent">
            <div className="dont-have-an">Don’t have an account yet?</div>
            <label className="register-button" onClick={onRegisterButtonClick}>
              <div className="text-button1">Register for free</div>
            </label>
          </div>
          <div className="login-info">
            <div className="passwordfield">
              <div className="input-label1">Password</div>
              <input
                className="textbox2"
                name="login-password"
                type="password"
              />
            </div>
            <img
              className="clarityeye-hide-line-icon"
              alt=""
              src="/clarityeyehideline1.svg"
            />
            <div className="emailfield1">
              <div className="input-label1">Email</div>
              <input
                className="textbox3"
                name="Login-email"
                placeholder="xyz@gmail.com"
                type="email"
              />
            </div>
            <div className="login">Login</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
