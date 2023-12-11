import { React, useState, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header2.css";
// import { animation, faqs, home, logo, quizzes, setting } from "../assets/images";

// Images Imports
import animation from "../assets/images/Animation.png";
import faqs from "../assets/images/FAQs-Icon.png";
import aboutUs from "../assets/images/AboutUs.png";
import home from "../assets/images/Home-Icon.png";
import logo from "../assets/images/Logo.png";
import quizzes from "../assets/images/Create-Quizzes-Logo.png";
import setting from "../assets/images/Settings-Icon.png";
import AboutUs from "../assets/images/FAQs-Icon.png";
import { useRef } from "react";
import { useEffect } from "react";

// function to triggered and close the modal on outside click
function useOutsideAlerter(ref, setX) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
}
//function end

const SecondHeader = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef();
  useOutsideAlerter(modalRef, setIsMobile);

  const GoToHomePage = useCallback(() => {
    navigate("/instructor/home/");
  }, [navigate]);

  return (
    <div className="main">
      <div className="Header2Container">
        {/* Logo */}
        <Link to="/instructor/home/">
          <button className="logo-button z-10">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <span>
                Data
                <span>Wiz.</span>
              </span>
            </div>
          </button>
        </Link>

        <button
          className="header-icon-button"
          onClick={() => setIsMobile(!isMobile)}
          // Add an event handler to toggle the mobile menu
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#663d75">
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
          <NavLink to="/instructor/home/" className="nav_link">
            <img
              src={home}
              alt="Menu Icon 3"
              style={{ maxWidth: "30px", height: "auto", marginBottom: "-1px", marginTop: "1px" }}
            />
            <span className="menu_top">Home</span>
          </NavLink>

          <NavLink to="/AnimationIntroductionPage" className="nav_link">
            <img
              src={animation}
              alt="Menu Icon 3"
              style={{ maxWidth: "30px", height: "auto", marginBottom: "-1px", marginTop: "1px" }}
            />
            <span className="menu_top">Animation</span>
          </NavLink>

          <NavLink to={"/instructor/quiz/home/"} className="nav_link">
            <img
              src={quizzes}
              alt="Menu Icon 3"
              style={{
                maxWidth: "21px",
                height: "auto",
                marginBottom: "-2.1px",
                marginTop: "1px",
              }}
            />
            <span className="menu_top_quiz">Quizzes</span>
          </NavLink>

          <NavLink to="/FaqsPage" className="nav_link">
            <img
              src={faqs}
              alt="Menu Icon 3"
              style={{ maxWidth: "43px", height: "auto", marginBottom: "-1px", marginTop: "1px" }}
            />
            <span className="menu_top">FAQs</span>
          </NavLink>

          <NavLink to="/AboutUsPage" className="nav_link">
            <img
              src={aboutUs}
              alt="Menu Icon 3"
              style={{ maxWidth: "32px", height: "auto", marginBottom: "-1px", marginTop: "1px" }}
            />
            <span className="menu_top">About Us</span>
          </NavLink>


          <NavLink to="/AccountSettingsPage" className="nav_link">
            <img
              src={setting}
              alt="Menu Icon 3"
              style={{ maxWidth: "30px", height: "auto", marginBottom: "-1px", marginTop: "1px" }}
            />
            <span className="menu_top">Settings</span>
          </NavLink>
        </div>



        {/* Mobile Menu */}
        {isMobile ? (
          <div className="overlay">
            <div className="fixed_panel" ref={modalRef}>
              <div className="mobile_logo">
                <img src={logo} alt="Logo" />
                <span>
                  Data
                  <span>Wiz.</span>
                </span>
              </div>
              <div className="menu_container">
                <NavLink to="/instructor/home/" className="mobile_nav_link">
                  <img
                    src={home}
                    alt="Menu Icon 3"
                    style={{
                      maxWidth: "21px",
                      height: "auto",
                      marginBottom: "-1px",
                      marginTop: "1px",
                    }}
                  />
                  <span>Home</span>
                </NavLink>

                <NavLink to="/AnimationIntroductionPage" className="mobile_nav_link">
                  <img
                    src={animation}
                    alt="Menu Icon 3"
                    style={{
                      maxWidth: "21px",
                      height: "auto",
                      marginBottom: "-1px",
                      marginTop: "1px",
                    }}
                  />
                  <span>Animation</span>
                </NavLink>

                <NavLink to="/QuizzesIntroductionPage" className="mobile_nav_link">
                  <img
                    src={quizzes}
                    alt="Menu Icon 3"
                    style={{
                      maxWidth: "16px",
                      height: "auto",
                      marginBottom: "-1px",
                      marginTop: "1px",
                      marginLeft: "3px",
                    }}
                  />
                  <span>Quizzes</span>
                </NavLink>

                <NavLink to="/FaqsPage" className="mobile_nav_link">
                  <img
                    src={faqs}
                    alt="Menu Icon 3"
                    style={{
                      width: "26px",
                      height: "auto",
                      marginBottom: "-1px",
                      marginTop: "1px",
                      marginLeft: "-1.5px",
                    }}
                  />
                  <span style={{ marginLeft: "9px" }}>FAQs</span>
                </NavLink>

                <NavLink to="/AboutUsPage" className="mobile_nav_link" >
                  <img
                    src={aboutUs}
                    alt="Menu Icon 3"
                    style={{
                      maxWidth: "30px",
                      height: "auto",
                      marginBottom: "-1px",
                      marginTop: "1px",
                      marginLeft: "0px",
                    }}
                  />
                  <span style={{ marginLeft: "12px" }}>About Us</span>
                </NavLink>

                <NavLink to="/AccountSettingsPage" className="mobile_nav_link">
                  <img
                    src={setting}
                    alt="Menu Icon 3"
                    style={{
                      maxWidth: "21px",
                      height: "auto",
                      marginBottom: "-1px",
                      marginTop: "1px",
                    }}
                  />
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
