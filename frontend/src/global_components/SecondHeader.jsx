import React from "react";
import { NavLink } from "react-router-dom";
import "./Header2.css";
// import { animation, faqs, home, logo, quizzes, setting } from "../assets/images";


// Images Imports
import animation from "../assets/images/Animation.png";
import faqs from "../assets/images/FAQs-Icon.png";
import home from "../assets/images/Home-Icon.png";
import logo from "../assets/images/Logo.png";
import quizzes from "../assets/images/Create-Quizzes-Logo.png";
import setting from "../assets/images/Settings-Icon.png";


const SecondHeader = () => {

    const [isMobile, setIsMobile] = React.useState(false);

    return (
        <div className="main">
            <div className="Header2Container">
                {/* Logo */}
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <span>
                    Data
                    <span>Wiz.</span>
                    </span>
                </div>
                <button
                    onClick={() => setIsMobile(!isMobile)}
                    // Add an event handler to toggle the mobile menu
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    color="#663d75"
                    >
                    <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                </button>

                {/* Menu */}
                <div className="menu_list">

                    <NavLink to="/InstructorHomePage" className="nav_link">
                    <img src={home} alt="Menu Icon 3"style={{ maxWidth: '30px', height: 'auto', marginBottom:'-1px', marginTop:'1px' }} />
                    <span className="menu_top">Home</span>
                    </NavLink>

                    <NavLink to="/AnimationIntroductionPage" className="nav_link">
                    <img src={animation} alt="Menu Icon 3" style={{ maxWidth: '30px', height: 'auto', marginBottom:'-1px', marginTop:'1px' }} />
                    <span className="menu_top">Animation</span>
                    </NavLink>

                    <NavLink to={"/QuizzesIntroductionPage"} className="nav_link">
                    <img src={quizzes} alt="Menu Icon 3" style={{ maxWidth: '21px', height: 'auto', marginBottom:'-2.1px', marginTop:'1px' }}/>
                    <span className="menu_top_quiz">Quizzes</span>
                    </NavLink>

                    <NavLink href="#" className="nav_link">
                    <img src={faqs} alt="Menu Icon 3" style={{ maxWidth: '43px', height: 'auto', marginBottom:'-1px', marginTop:'1px' }}/>
                    <span className="menu_top">FAQs</span>
                    </NavLink>

                    <NavLink href="#" className="nav_link">
                    <img src={setting} alt="Menu Icon 3" style={{ maxWidth: '30px', height: 'auto', marginBottom:'-1px', marginTop:'1px' }}/>
                    <span className="menu_top">Settings</span>
                    </NavLink>

                </div>

                {/* Mobile Menu */}
                {isMobile ? (
                    <div className="overlay">
                        <div className="fixed_panel">
                            <div className="mobile_logo">
                                <img src={logo} alt="Logo" />
                                <span>
                                    Data
                                    <span>Wiz.</span>
                                </span>
                            </div>
                            <div className="menu_container">

                                <NavLink to="/InstructorHomePage" className="mobile_nav_link">
                                    <img src={home} alt="Menu Icon 3" style={{ maxWidth: '21px', height: 'auto', marginBottom:'-1px', marginTop:'1px' }}/>
                                    <span>Home</span>
                                </NavLink>

                                <NavLink to="/AnimationIntroductionPage" className="mobile_nav_link">
                                    <img src={animation} alt="Menu Icon 3" style={{ maxWidth: '21px', height: 'auto', marginBottom:'-1px', marginTop:'1px' }}/>
                                    <span>Animation</span>
                                </NavLink>

                                <NavLink to="/QuizzesIntroductionPage" className="mobile_nav_link">
                                    <img src={quizzes} alt="Menu Icon 3" style={{ maxWidth: '16px', height: 'auto', marginBottom:'-1px', marginTop:'1px', marginLeft:'3px'}}/>
                                    <span>Quizzes</span>
                                </NavLink>

                                <NavLink href="#" className="mobile_nav_link">
                                    <img src={faqs} alt="Menu Icon 3" style={{ maxWidth: '30px', height: 'auto', marginBottom:'-1px', marginTop:'1px' ,marginLeft:'-3px'}}/>
                                    <span style={{ marginLeft: '14px' }}>FAQs</span>
                                </NavLink>

                                <NavLink href="#" className="mobile_nav_link">
                                    <img src={setting} alt="Menu Icon 3"  style={{ maxWidth: '21px', height: 'auto', marginBottom:'-1px', marginTop:'1px' }}/>
                                    <span>Settings</span>
                                </NavLink>

                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SecondHeader;
