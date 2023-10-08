import React from 'react';
import Header1 from '../../../global_components/Header1';
import './LandingPage.css';
import dataWizLogoImage from '../../../assets/images/DataWiz-Logo.png';

function LandingPage() {
  return (
    <>
        <Header1 />
        <div className="StyleVector1"></div>
        <div className="IntroCard">

            <div className="UnleashThePowerOfSqlLearning">Unleash the<br />power of SQL Learning</div>
                <div className="Description">
                DataWiz is your gateway to mastering SQL effortlessly. Whether you're a curious learner or an educator looking for efficient teaching tools, DataWiz has something for everyone. Explore the world of interactive query animation and auto-grading quizzes for an engaging learning experience.
            </div>

            <div className="SignupAndLoginButtons">
                    <button className="LoginButton">
                    <div className="ButtonText">Login</div>
                    </button>

                    <button className="SignUpButton">
                    <div className="ButtonText">Sign Up</div>
                    </button>
            </div>

        </div>
        <div className="Ellipse1">
            <img
                src={dataWizLogoImage}
                alt="DataWiz."
                className="LogoImage"
            />
        </div>
    </>
  );
}

export default LandingPage;
