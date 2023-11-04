import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Cookies from 'js-cookie';
import "./LoginPage.css";

// Component Imports
import Header1 from '../../../global_components/Header1';

// Images Imports
import HiddenEye  from '../../../assets/images/clarityeyehideline.svg'
import GoogleLogo from '../../../assets/images/google-account-login.svg'

const LoginPage = () => {
    const navigate = useNavigate();

    // email hooks
    const [emailFieldValue, setEmailFieldValue] = useState('')
    const handleEmailFieldChange = (event) => {
        setEmailFieldValue(event.target.value);
    }

    // password hooks
    const [passwordFieldValue, setPasswordFieldValue] = useState('')
    const handlePasswordFieldChange = (event) => {
        setPasswordFieldValue(event.target.value)
    }

    // log in
    const logInHandler = (event) => {
        // console.log(emailFieldValue, passwordFieldValue)
        const requestObject = {
            headers: {
                'Content-Type': 'application/json',
                'Server': 'Werkzeug/3.0.0 Python/3.11.5'
            },
            data: {
                "email": emailFieldValue,
                "password": passwordFieldValue
            }
        }

        console.log("Logging in: " + emailFieldValue + " " + passwordFieldValue)
        axios.post("http://127.0.0.1:5000/api/user/login/", requestObject.data)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })


        
    }

    const onForgotPasswordClick = useCallback(() => {
    navigate("/ResetPasswordPage");
    }, [navigate]);

    const onRegisterButtonClick = useCallback(() => {
    navigate("/SignUpPage");
    }, [navigate]);

    return (
    <>
        <Header1/>
        <div className="login-card-container">
            <div className="login-card-item">
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
                        value={emailFieldValue}
                        onChange={handleEmailFieldChange}
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
                        value={passwordFieldValue}
                        onChange={handlePasswordFieldChange}
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
                    <div className="Login-signinButton-Text"
                         onClick={logInHandler}>
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
            </div>
        </div>
    </>
    );
};

export default LoginPage;
