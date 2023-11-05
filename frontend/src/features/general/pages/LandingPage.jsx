import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './LandingPage.css';

// Component Imports
import LCarousel from '../components/LCarousel';
import ICarousel from '../components/ICarousel';
import Header1 from '../../../global_components/Header1';



// Image Imports
import dataWizLogoImage from '../../../assets/images/DataWiz-Logo.png';
import TehamiImage from '../../../assets/images/TehamiChar.png';
import HibaImage from '../../../assets/images/HibaChar.png';
import RidaImage from '../../../assets/images/RidaChar.png';
import EjazImage from '../../../assets/images/EjazChar.png';
import NihalImage from '../../../assets/images/NihalChar.png';





function LandingPage() {
  return (
    <>
    <div className='HeaderTop'>
        <Header1 />
    </div>
{/* ----------------------Introduction----------------------- */}

        <div className="IntroCard">

            <div className='IntroSection1Container'>
                <div className="UnleashThePowerOfSqlLearning">Unleash the<br />power of SQL Learning</div>
                    <div className="Description">
                    DataWiz is your gateway to mastering SQL effortlessly. Whether you're a curious learner or an educator looking for efficient teaching tools, DataWiz has something for everyone. Explore the world of interactive query animation and auto-grading quizzes for an engaging learning experience.
                </div>

                <div className="SignupAndLoginButtons">
                    <Link to="/LoginPage" className="LoginButton">
                    <div className="ButtonText">Login</div>
                    </Link>

                    <Link to="/SignUpPage" className="SignUpButton">
                    <div className="ButtonText">Sign Up</div>
                    </Link>
                </div>

                <div className="Ellipse1">
                    <img
                        src={dataWizLogoImage}
                        alt="DataWiz."
                        className="LogoImage"
                    />
                </div>
            </div>

        </div>
        <div className="TopFeaturesContainer">
            <div className="LFeatures">
                Features.
            </div>
            <div className="ForLearners">
                For Learners.
            </div>
        </div>
{/* ----------------------Features--------------------------- */}

            <div className="IntroCard">

                <div className="UnleashThePowerOfSqlLearning">Unleash the<br />power of SQL Learning</div>
                    <div className="Description">
                    DataWiz is your gateway to mastering SQL effortlessly. Whether you're a curious learner or an educator looking for efficient teaching tools, DataWiz has something for everyone. Explore the world of interactive query animation and auto-grading quizzes for an engaging learning experience.
                </div>

                <div className="SignupAndLoginButtons">
                    <Link to="/LoginPage" className="LoginButton">
                    <div className="ButtonText">Login</div>
                    </Link>

                    <Link to="/SignUpPage" className="SignUpButton">
                    <div className="ButtonText">Sign Up</div>
                    </Link>
                </div>

            </div>
            <div className="Ellipse1">
                <img
                    src={dataWizLogoImage}
                    alt="DataWiz."
                    className="LogoImage"
                />
            </div>
            <div className="TopFeaturesContainer">
                <div className="LFeatures">
                    Features.
                </div>
                <div className="ForLearners">
                    For Learners.
                </div>
            </div>
        {/* ----------------------Features--------------------------- */}

            <div className="AnimationFeatureCarousel">
                <LCarousel />
            </div>

            <div className="BottomFeaturesContainer">
                <div className="ForInstructors">
                    For Instructors.
                </div>
            </div>

            <div className="AutoGradingFeatureCarousel">
                <ICarousel />
            </div>
                
        {/* ----------------------Meet The Team---------------------- */}

            <div className="MeetTheTeamContainer">
                <div className="MeetTheTeamCard">
                    <div className='MTTTop'>
                        <div className='BarL'></div>
                        <div className='MeetTheTeamTitle'>
                            Meet The Team
                        </div>
                        <div className='BarR'></div>
                    </div>
                    <div className='TopRowIcons'>
                        <div className="Tehami">
                            <div className="Ellipse2">
                                <img src={TehamiImage} alt="TehamiImage" className="TehamiImageIcon"/>
                            </div>
                            <div className="TehamiName">Muhammad Tehami Nadeem</div>
                        </div>
                        <div className="Hiba">
                            <div className="Ellipse3">
                                <img src={HibaImage} alt="HibaImage" className="HibaImageIcon"/>
                            </div>
                            <div className="HibaName">Hiba Gohar</div>
                        </div>
                        <div className="Rida">
                            <div className="Ellipse4">
                                <img src={RidaImage} alt="RidaImage" className="RidaImageIcon"/>
                            </div>
                            <div className="RidaName">Rida Asif</div>
                        </div>
                    </div>

                    <div className='BottomRowIcons'>
                        <div className="Ejaz">
                            <div className="Ellipse5">
                                <img src={EjazImage} alt="EjazImage" className="EjazImageIcon"/>
                            </div>
                            <div className="EjazName">Mohmmad Ejaz Chowdhury</div>
                        </div>
                        <div className="Nihal">
                            <div className="Ellipse6">
                                <img src={NihalImage} alt="NihalImage" className="NihalImageIcon"/>
                            </div>
                            <div className="NihalName">Mohmmad Nihal Kattakath</div>
                        </div>
                    </div>

                </div>
            </div>


        </>
        );
}

export default LandingPage;




