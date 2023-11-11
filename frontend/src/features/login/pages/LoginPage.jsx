import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    const [userInfo, setUserInfo] = useState();

    const onForgotPasswordClick = useCallback(() => {
        navigate("/ResetPasswordPage");
    }, [navigate]);
        
    const onRegisterButtonClick = useCallback(() => {
        navigate("/SignUpPage");
    }, [navigate]);
        
    const onBackArrowContainer1Click = useCallback(() => {
        navigate("/LandingPage");
    }, [navigate]);

    const onLogInButtonClick = useCallback(() => {
        //to the home page
    }, [navigate])

    
    const onSubmit = (data) => {
        console.log(data);
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
                                {...register("email", { required: "Email is required"})}
                            />
                            <p className = "ErrorMessages">{errors.email?.message}</p>
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
                                {...register("password", { required: "Password is required"})}
                            />
                            <p className = "ErrorMessages">{errors.password?.message}</p>
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
                            <div className="Login-signinButton-Text" onClick={onLogInButtonClick}>
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
                                Don’t have an account yet?
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


// const LoginPage = () => {
//     const navigate = useNavigate();

//     // email hooks
//     const [emailFieldValue, setEmailFieldValue] = useState('')
//     const handleEmailFieldChange = (event) => {
//         setEmailFieldValue(event.target.value);
//     }

//     // password hooks
//     const [passwordFieldValue, setPasswordFieldValue] = useState('')
//     const handlePasswordFieldChange = (event) => {
//         setPasswordFieldValue(event.target.value)
//     }

//     // log in
//     const logInHandler = (event) => {
//         // DEBUGGING PRINT - DELETE
//         console.log("Logging in: " + emailFieldValue + " " + passwordFieldValue)
//         request({
//             url: "api/user/login/",
//             method: "post",
//             data: {
//                 "email": emailFieldValue,
//                 "password": passwordFieldValue
//             }
//         }).then(response => {
//             // console.log(response)
//             const user_details = response.data.user;

//             // redirect user to home page after login
//             // and transfer their details with it
//             navigate("/InstructorHomePage", { state: user_details })
            
//         }).catch(error => {
//             console.error(error.response)
//         })
    
//     }

//     const onForgotPasswordClick = useCallback(() => {
//     navigate("/ResetPasswordPage");
//     }, [navigate]);

//     const onRegisterButtonClick = useCallback(() => {
//     navigate("/SignUpPage");
//     }, [navigate]);

//   const onBackArrowContainer1Click = useCallback(() => {
//     navigate("/LandingPage");
//   }, [navigate]);

//   return (
//     <>
//         <Header1/>
//         <div className="login-card-container">
//             <div className="login-card-item">
//                 <div className="Return-Landing-Login1" onClick={onBackArrowContainer1Click}>
//                     <div className="Return-Landing-Login-Circle">
//                         <img 
//                             src={LeftArrow}
//                             alt=""
//                             className="Return-Landing-Login-left">
//                         </img>
//                     </div>
//                 </div>

//                 <div className="welcome-back-to">
//                     Welcome back to DataWiz.
//                 </div>
//                 <div className="Login-header">
//                     Login
//                 </div>
//                 <div className="EmailSection">
//                     <div className="input-label1">
//                         Email
//                     </div>
//                     <input
//                         className="Login-emailField"
//                         name="Login-email"
//                         placeholder="xyz@gmail.com"
//                         type="email"
//                         value={emailFieldValue}
//                         onChange={handleEmailFieldChange}
//                     />
//                 </div>

//                 <div className="PasswordSection">
//                     <div className="Login-Password-inputLabel">
//                         Password
//                     </div>
//                     <input
//                         className="Login-Password-inputField"
//                         placeholder="*******"
//                         name="login-password"
//                         type="password"
//                         value={passwordFieldValue}
//                         onChange={handlePasswordFieldChange}
//                     />
//                     {/* <img
//                         className="Login-HideEyeIcon"
//                         alt="hidden eye"
//                         src={HiddenEye}
//                     /> */}
//                     <label className="Login-forgotPassword-label" onClick={onForgotPasswordClick}>
//                         <div className="Login-forgotPassword-text">
//                             Forgot Password?
//                         </div>
//                     </label>
//                 </div>

//                 <button className="Login-signinButton">
//                     <div className="Login-signinButton-Text"
//                          onClick={logInHandler}>
//                         Log In
//                     </div>
//                 </button>
//                 <div className="GoogleContainer">
//                     <div className="Login-or-continue-with">
//                         or continue with
//                     </div>
//                     <img
//                     className="LoginPage-google-account-login"
//                     alt=""
//                     src={GoogleLogo}
//                     />
//                 </div>

//                 <div className="dont-have-an-account-yet-parent">
//                     <div className="dont-have-an">
//                         Don’t have an account yet?
//                     </div>
//                     <label className="Login-register-button" onClick={onRegisterButtonClick}>
//                         <div className="Login-register-text">
//                             Register for free
//                         </div>
//                     </label>
//                 </div>
//             </div>
//         </div>
//     </>
//     );
// };


