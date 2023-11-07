import { useCallback } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [userInfo, setUserInfo] = useState();

    const onSubmit = (data) => {
        setUserInfo(data);
        console.log(data);
    }

    const onSigninButtonClick = useCallback(() => {
      //navigate("/LoginPage");
    }, [navigate]);

    const onBackArrowContainer1Click = useCallback(() => {
      navigate("/LandingPage");
    }, [navigate]);

    console.log(errors);
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
                    <form onSubmit = {handleSubmit(onSubmit)}>
                        <div className="input-label">
                            Full name
                        </div>
                        <input
                            className="textbox1"
                            placeholder="Enter your full name"
                            type="text"
                             {...register("FullName", { required: "Full Name is required", pattern : {value:/^[A-Za-z ]+$/i, message: "Full name must contain only letters and spaces"}})}
                        />
                         <p className = "ErrorMessages">{errors.FullName?.message}</p>

                        <div className="input-label">Username</div>
                        <input 
                            className="textbox1" 
                            placeholder="Enter your username" 
                            type="text" 
                             {...register("Username", { required: "Username is required", pattern : {value:/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: "Username must be between 6 and 20 characters ,include at least 1 uppercase letter and 1 numeric digit"} })}
                        />
                        <p className = "ErrorMessages">{errors.Username?.message}</p>

                        <div className="input-label">Email</div>
                        <input
                            className="textbox1"
                            placeholder="Enter your email"
                            type="email"
                             {...register("Email", { required: "Email is required",  pattern : {value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email address"}})}
                        />
                        <p className = "ErrorMessages">{errors.Email?.message}</p>

                        <div className="input-label">Password</div>
                        <input 
                            className="textbox1" 
                            type="password"
                            placeholder="**********" 
                             {...register("password", { required: "Password is required", pattern : {value:/^(?=.*[!@#\$%^&*()\-_=+\[\]{}|;:'",.<>?\/\\]).{8,64}$/, message: "Password must be between 8 and 64 characters and contain at least one special character"}})}
                        />
                        <p className = "ErrorMessages">{errors.password?.message}</p>

                        <div className="checkbox-pair">
                            <div className="input-label2">Account Type</div>
                            <div className="input-label2">Gender</div>
                        </div>

                        <div className="error-checkbox-pair">
                        <p className = "ErrorMessages-accounttype">{errors.accountType?.message}</p>
                        <p className = "ErrorMessages-gender">{errors.gender?.message}</p>
                        </div>


                        <div className = "checkbox-pair">
                            <div className="checkbox-group1">
                                <div className ="checkbox-group2">
                               
                                    <input
                                        className={`checkbox ${errors['accountType'] ? 'error' : ''}`}
                                        id="learner check"
                                        type="radio"
                                        name="accountType"
                                        value = "learner"
                                         {...register("accountType", { required: "Please select an account type" })}
                                    />
                                    <label className="checkbox-label">Learner</label>
                                </div> 
                                <div className ="checkbox-group2">
                                    <input
                                        className={`checkbox ${errors['accountType'] ? 'error' : ''}`}
                                        id="instructor check"
                                        type="radio"
                                        name="accountType"
                                        value="instructor"
                                        {...register("accountType", { required: "Please select an account type" })}
                                    />
                                    <label className="checkbox-label">Instructor</label>
                                </div>
                                
                            </div>
                            
                            <div className="checkbox-group1">
                                <div className ="checkbox-group2">
                                    <input
                                        className={`checkbox ${errors['gender'] ? 'error' : ''}`}
                                        id="Female check"
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        {...register("gender", { required: "Please select a gender" })}
                                    />
                                    <label className="checkbox-label">Female</label>
                                </div>
                                
                                <div className ="checkbox-group2">
                                    <input
                                        className={`checkbox ${errors['gender'] ? 'error' : ''}`}
                                        id="Male check"
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        {...register("gender", { required: "Please select a gender" })}
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
                    </form>           
                </div>
                
            </div>
        </div>
    </>
  );
};

export default Signup;

