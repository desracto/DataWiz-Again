import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import Header1 from '../../../global_components/Header1';
import HiddenEye  from '../../../assets/images/clarityeyehideline.svg'
import GoogleLogo from '../../../assets/images/google-account-login.svg'
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
const Signup = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/LoginPage");
  }, [navigate]);

  const onSigninButtonClick = useCallback(() => {
    navigate("/LoginPage");
  }, [navigate]);

  return (
    <div className="signup">
        <Header1/>
      <div className="signup-card" id="SignUp card">
        <div className="signup-card-child" />
        <div className="welcome-to-datawiz-container">
          <span>Welcome to</span>
          <span className="span">{` `}</span>
          <span className="data">Data</span>
          <span>Wiz.</span>
        </div>
        <div
          className="already-have-an-account-parent"
          onClick={onGroupContainerClick}
        >
          <div className="already-have-an">Already have an account?</div>
          <Link className="register-button" to="/login-page">
            <span className="text-button" id="login">
              Login
            </span>
          </Link>
        </div>
        <div className="or-continue-with">or continue with</div>
        <img
          className="google-account-login"
          alt=""
          src={GoogleLogo}
        />
        <button className="signin-button" onClick={onSigninButtonClick}>
          <div className="signin-button-child" />
          <div className="button-text">Signup</div>
        </button>
        <div className="signup-info">
          <div className="account-type-parent">
            <div className="account-type">Account Type</div>
            <input
              className="checkbox"
              id="learner check"
              type="radio"
              name="checkbox-accounttype"
            />
            <div className="learner">Learner</div>
            <div className="instructor">Instructor</div>
            <input
              className="checkbox1"
              id="instructor check"
              type="radio"
              name="checkbox-accounttype"
            />
          </div>
          <div className="gender-parent">
            <div className="account-type">Gender</div>
            <input
              className="radio-button"
              type="radio"
              name="gender radio value"
            />
            <input
              className="radio-button1"
              type="radio"
              name="gender radio value"
            />
            <div className="female">Female</div>
            <div className="male">Male</div>
          </div>
          <div className="passwordfield">
            <div className="input-label">Password</div>
            <input className="textbox" type="password" />
          </div>
          <img
            className="clarityeye-hide-line-icon"
            alt=""
            src={HiddenEye}
          />
          <div className="emailfield">
            <div className="input-label">Email</div>
            <input
              className="textbox1"
              placeholder="xyz@gmail.com"
              type="email"
            />
          </div>
          <div className="usernamefield">
            <div className="input-label">Username</div>
            <input className="textbox1" placeholder="User_2318" type="text" />
          </div>
          <div className="inputfield">
            <div className="input-label">Full name</div>
            <input
              className="textbox1"
              placeholder="Enter your full name"
              type="text"
            />
          </div>
          <div className="signup1">Sign Up</div>
        </div>
      </div>
    </div>

  );
};

export default Signup;
