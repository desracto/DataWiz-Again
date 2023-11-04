import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";

// Component Imports
import Header1 from '../../../global_components/Header1';

// Image Imports
import HiddenEye  from '../../../assets/images/clarityeyehideline.svg'
import GoogleLogo from '../../../assets/images/google-account-login.svg'
import LeftArrow from '../../../assets/images/left-arrow.png';

<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

const Signup = () => {
  const navigate = useNavigate();

  const onSigninButtonClick = useCallback(() => {
    navigate("/LoginPage");
  }, [navigate]);

  const onBackArrowContainer1Click = useCallback(() => {
    navigate("/LandingPage");
  }, [navigate]);

  return (
    <>
      <Header1/>
        <div className="signup-container">
            <div className="signup-card">

                <div className="Return-Landing-SignUp1" onClick={onBackArrowContainer1Click}>
                    <div className="Return-Landing-SignUp-Circle2">
                        <img 
                            src={LeftArrow}
                            alt=""
                            className="Return-Landing-SignUp-left">
                        </img>
                    </div>
                </div>


                <div className="welcome-to-datawiz-container">
                    Welcome to <span className ="data">Data</span>Wiz
                </div>
                <div className="signup1">
                    Sign Up
                </div>

                <div className="signup-info">
                    <div className="input-label">
                        Full name
                    </div>
                    <input
                        className="textbox1"
                        placeholder="Enter your full name"
                        type="text"
                    />

                    <div className="input-label">Username</div>
                    <input 
                        className="textbox1" 
                        placeholder="Enter your username" 
                        type="text" 
                    />

                    <div className="input-label">Email</div>
                    <input
                        className="textbox1"
                        placeholder="Enter your email"
                        type="email"
                    />

                    <div className="input-label">Password</div>
                    <input 
                        className="textbox1" 
                        type="password"
                        placeholder="**********" 
                    />

                    <div className="checkbox-pair">
                        <div className="input-label2">Account Type</div>
                        <div className="input-label2">Gender</div>
                    </div>

                    <div className = "checkbox-pair">
                        <div className="checkbox-group1">
                            <div className ="checkbox-group2">
                                <input
                                    className="checkbox"
                                    id="learner check"
                                    type="radio"
                                    name="checkbox-accounttype"
                                />
                                <label className="checkbox-label">Learner</label>
                            </div>
                        
                            <div className ="checkbox-group2">
                                <input
                                    className="checkbox"
                                    id="instructor check"
                                    type="radio"
                                    name="checkbox-accounttype"
                                />
                                <label className="checkbox-label">Instructor</label>
                            </div>
                        </div>

                        <div className="checkbox-group1">
                            <div className ="checkbox-group2">
                                <input
                                    className="checkbox"
                                    id="learner check"
                                    type="radio"
                                    name="checkbox-gender"
                                />
                                <label className="checkbox-label">Female</label>
                            </div>
                            
                            <div className ="checkbox-group2">
                                <input
                                    className="checkbox"
                                    id="instructor check"
                                    type="radio"
                                    name="checkbox-gender"
                                />
                                <label className="checkbox-label">Male</label>
                            </div>
                        </div>
                    </div>

                    <button className="signin-button" onClick={onSigninButtonClick}>
                        <div className="button-text">Signup</div>
                    </button>

                    <div className="or-continue-with">or continue with</div>
                    <a href="#" className="google-account-login">
                        <img
                        alt="GoogleAccount"
                        src={GoogleLogo}
                        />
                    </a>
                
                    <div className="already-have-an">Already have an account?
                        <Link className="text-button" to="/LoginPage">
                            Login
                        </Link>
                    </div>           
                </div>
            </div>
        </div>
    </>
  );
};

export default Signup;

