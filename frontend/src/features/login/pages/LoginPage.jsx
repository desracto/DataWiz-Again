import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import axios from 'axios'
import Cookies from 'js-cookie';
import "./LoginPage.css";

// Component Imports
import Header1 from '../../../global_components/Header1';

// Images Imports
import HiddenEye  from '../../../assets/images/clarityeyehideline.svg'
import GoogleLogo from '../../../assets/images/google-account-login.svg'
import LeftArrow from '../../../assets/images/left-arrow.png';


const request = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true,
    timeout: 300000
})

const LoginPage = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors }} = useForm();

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("")


    const onForgotPasswordClick = useCallback(() => {
        navigate("/ResetPasswordPage");
    }, [navigate]);
        
    const onRegisterButtonClick = useCallback(() => {
        navigate("/SignUpPage");
    }, [navigate]);
        
    const onBackArrowContainer1Click = useCallback(() => {
        navigate("/LandingPage");
    }, [navigate]);

    
    const onSubmit = (data) => {
        console.log(data);
        request({
            url: "/api/user/login/",
            method: "post",
            data: data
        }).then(response => {
            console.log(response);

            if (response.status === 200) {
                // Clear any previous errors
                setEmailError("");
                setPasswordError("");

                // Navigate to the instructor page
                navigate("/InstructorHomePage"); 
            }

        }).catch(error => {
            console.error(error.response.data);
            if (error.response.data.message === "INEP01") 
            {
                setEmailError("");
                setPasswordError("Incorrect Email or Password");
            }
            else if (error.response.data.message === "ACNF01")
            {
                setEmailError("Account Not Found");
                setPasswordError("");
            }
            else{
                setEmailError("");
                setPasswordError("");
            }
        })
    };

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
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                {...register("email", { required: "Email is required",  pattern : {value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email address"}})}
                            />
                            <p className = "ErrorMessages">{errors.email?.message}</p>
                            <p className = "ErrorMessages">{emailError}</p>
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
                                {...register("password", { required: "Password is required" })}
                            />

                            <p className = "ErrorMessages">{errors.password?.message}</p>
                            <p className = "ErrorMessages">{passwordError}</p>
                            {/* <img
                                className="Login-HideEyeIcon"
                                alt="hidden eye"
                                src={HiddenEye}
                            /> */}
                        <   label className="Login-forgotPassword-label" onClick={onForgotPasswordClick}>
                            <div className="Login-forgotPassword-text">
                                Forgot Password?
                            </div>
                            </label>
                        </div>

                        <button className="Login-signinButton">
                            <div className="Login-signinButton-Text">
                                    Log In
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
                                Don't have an account yet?
                            </div>
                            <label className="Login-register-button" onClick={onRegisterButtonClick}>
                                <div className="Login-register-text">
                                    Register for free
                                </div>
                            </label>
                        </div>
                    </form>
            </div>
        </div>
    </>
  )
}
export default LoginPage
