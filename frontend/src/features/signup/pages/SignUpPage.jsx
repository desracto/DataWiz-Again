import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import axios from "axios";

// Component Imports
import Header1 from '../../../global_components/Header1';
import Footer from '../../../global_components/Footer';

// Image Imports
import HiddenEye from '../../../assets/images/clarityeyehideline.svg';
import GoogleLogo from '../../../assets/images/google-account-login.svg';
import LeftArrow from '../../../assets/images/left-arrow.png';

// Importing SVG images
import svgImage from '../../../assets/images/vector-31.svg';
import svgImage2 from '../../../assets/images/blob-haikei.svg';
import BlobOutline1 from '../../../assets/images/BlobOutline1.png';

// Creating an Axios instance for making API requests
const request = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    timeout: 300000
});

// Signup component for handling user registration
const Signup = () => {
    // Using the useNavigate and useForm hooks
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State for user information and error messages
    const [userInfo, setUserInfo] = useState();
    const [emailTakenError, setEmailTakenError] = useState("");
    const [usernameTakenError, setUsernameTakenError] = useState("");

    // Function to handle form submission
    const onSubmit = (data) => {
        setUserInfo(data);
        console.log(data);

        // Making a POST request to register the user
        request({
            url: "api/user/",
            method: "post",
            data: data
        }).then(response => {
            console.log(response);

            if (response.status === 200) {
                // Clearing any previous errors
                setEmailTakenError("");
                setUsernameTakenError("");

                // Navigating to the login page upon successful registration
                navigate("/LoginPage");
            }
        }).catch(error => {
            console.error(error.response.data);
            // Handling errors based on error codes
            if (error.response.data.message === "EUNIDB") {
                setEmailTakenError("");
                setUsernameTakenError("please enter a different username");
            }
            else if (error.response.data.message === "EEMIDB") {
                setEmailTakenError("Please use a different Email");
                setUsernameTakenError("");
            }
            else {
                setEmailTakenError("");
                setUsernameTakenError("");
            }
        })
    };

    // Function to navigate back to the landing page
    const onBackArrowContainer1Click = useCallback(() => {
        navigate("/LandingPage");
    }, [navigate]);

    // Rendering the Signup component
    return (
        <>
            {/* Header for the page */}
            <Header1 />

            {/* Main content of the SignupPage */}
            <div className="signup-container">
                <div className="signup-card">

                    {/* Return Arrow */}
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
                        Welcome to <span className="data">Data</span>Wiz
                    </div>
                    <div className="signup1">
                        Sign Up
                    </div>

                    <div className="signup-info">
                        {/* Form for user registration */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Input field for full name */}
                            <div className="input-label">
                                Full name
                            </div>
                            <input
                                className="textbox1"
                                placeholder="Enter your full name"
                                type="text"
                                {...register("fullName", { required: "Full Name is required", pattern: { value: /^[A-Za-z ]+$/i, message: "Full name must contain only letters and spaces" } })}
                            />
                            <p className="ErrorMessages">{errors.fullName?.message}</p>

                            {/* Input field for username */}
                            <div className="input-label">Username</div>
                            <input
                                className="textbox1"
                                placeholder="Enter your username"
                                type="text"
                                {...register("username", { required: "Username is required", pattern: { value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: "Username must be between 6 and 20 characters ,include at least 1 uppercase letter and 1 numeric digit" } })}
                            />
                            <p className="ErrorMessages">{errors.username?.message}</p>
                            <p className="ErrorMessages">{usernameTakenError}</p>

                            {/* Input field for email */}
                            <div className="input-label">Email</div>
                            <input
                                className="textbox1"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email address" } })}
                            />
                            <p className="ErrorMessages">{errors.email?.message}</p>
                            <p className="ErrorMessages">{emailTakenError}</p>

                            {/* Input field for password */}
                            <div className="input-label">Password</div>
                            <input
                                className="textbox1"
                                type="password"
                                placeholder="**********"
                                {...register("password", { required: "Password is required", pattern: { value: /^(?=.*[!@#\$%^&*()\-_=+\[\]{}|;:'",.<>?\/\\]).{8,64}$/, message: "Password must be between 8 and 64 characters and contain at least one special character" } })}
                            />
                            <p className="ErrorMessages">{errors.password?.message}</p>

                            {/* Checkbox pair for account type and gender */}
                            <div className="checkbox-pair">
                                <div className="input-label2">Account Type</div>
                                <div className="input-label2">Gender</div>
                            </div>

                            {/* Error messages for account type and gender */}
                            <div className="error-checkbox-pair">
                                <p className="ErrorMessages-accounttype">{errors.account_type?.message}</p>
                                <p className="ErrorMessages-gender">{errors.gender?.message}</p>
                            </div>

                            {/* Radio buttons for account type and gender */}
                            <div className="checkbox-pair">
                                <div className="checkbox-group1">
                                    <div className="checkbox-group2">
                                        <input
                                            className={`signup-checkbox ${errors['account_type'] ? 'error' : ''}`}
                                            id="learner check"
                                            type="radio"
                                            name="account_type"
                                            value="learner"
                                            {...register("account_type", { required: "Please select an account type" })}
                                        />
                                        <label className="checkbox-label">Learner</label>
                                    </div>
                                    <div className="checkbox-group2">
                                        <input
                                            className={`signup-checkbox ${errors['account_type'] ? 'error' : ''}`}
                                            id="instructor check"
                                            type="radio"
                                            name="account_type"
                                            value="instructor"
                                            {...register("account_type", { required: "Please select an account type" })}
                                        />
                                        <label className="checkbox-label">Instructor</label>
                                    </div>
                                </div>

                                <div className="checkbox-group1">
                                    <div className="checkbox-group2">
                                        <input
                                            className={`signup-checkbox ${errors['gender'] ? 'error' : ''}`}
                                            id="Female check"
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            {...register("gender", { required: "Please select a gender" })}
                                        />
                                        <label className="checkbox-label">Female</label>
                                    </div>

                                    <div className="checkbox-group2">
                                        <input
                                            className={`signup-checkbox ${errors['gender'] ? 'error' : ''}`}
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

                            {/* Button for submitting the form */}
                            <button className="signin-button">
                                <div className="button-text">Signup</div>
                            </button>

                            {/* Text for continuing with Google account
                            <div className="or-continue-with">or continue with</div>
                            <a href="#" className="google-account-login">
                                <img
                                    alt="GoogleAccount"
                                    src={GoogleLogo}
                                />
                            </a> */}

                            {/* Text for already having an account with a link to the login page */}
                            <div className="already-have-an">Already have an account?
                                <Link className="text-button" to="/LoginPage">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            {/* SVG Backgrounds */}
            <div className="SVG-CONTAINER">
                <img
                    src={svgImage}
                    alt="SVG Background"
                    className="svg-background"
                />
            </div>

            <div className="SVG-CONTAINER">
                <img
                    src={svgImage2}
                    alt="SVG Background"
                    className="svg-background1"
                />
            </div>
            <Footer/>
        </>
    );
};

export default Signup;
