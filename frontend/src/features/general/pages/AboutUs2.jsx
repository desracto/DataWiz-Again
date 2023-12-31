import React, { useEffect } from "react";
import "./AboutUs.css";
import AboutUsHeroImg from "../../../assets/images/AboutUsHeroImg.jpg";
import AboutUsGlobe from "../../../assets/images/AboutUs-Globe.png";
import SchemaSelection from "../../../assets/images/Schema-Selection.png";
import Animation from "../../../assets/images/Animation.png";
import SavedAnimations from "../../../assets/images/Saved-Animations.png";
import SavedQuizzes from "../../../assets/images/Saved-Quizzes.png";
import CreateQuizzesLogo from "../../../assets/images/Create-Quizzes-Logo.png";
import AutoGradingIcon from "../../../assets/images/Auto-grading_Icon.png"
import SecondHeader from "../../../global_components/SecondHeader";
//import Footer from "../components/Footer.jsx";

import svgImage from '../../../assets/images/vector-31.svg';
import svgImage2 from '../../../assets/images/blob-haikei.svg';

const AboutUsPage = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            bottom: 0,
            behavior: 'instant'
        })
    })

    const animationData = [
        { image: SchemaSelection, title: "Schema Selection for Query Animation", text: "Embark on your SQL learning adventure by choosing from a diverse set of schemas. Craft your query, and witness the magic as DataWiz animates the intricate steps taken within the database to reach the final result. Select, query, animate, and grasp SQL concepts visually and interactively." },
        { image: Animation, title: "Query Animation", text: "Explore the intricate steps behind SQL queries with our Query Animation. Select from a range of schemas, craft your query, and witness a captivating animation that unveils how the database processes your query to derive the final result. An interactive and visual learning experience like never before." },
        { image: SavedAnimations, title: "Saved Query Animations", text: "Never lose your valuable query animations with our efficient saving system. Access and manage all your previously animated queries in one organized location. Re-view and analyze previous animations, and if any adjustments or updates, editing is just a click away. Once satisfied, re-save or download the animation for your records." }
    ];

    const quizData = [
        { image: SavedQuizzes, title: "Saved Quizzes", text: "Manage all your quizzes in one convenient hub. Access, review, and update quizzes with ease. Make necessary adjustments, revisit questions, and improve the learning experience. Save time and streamline your teaching process by having all your quizzes organized and accessible, enabling a seamless teaching and assessment workflow." },
        { image: CreateQuizzesLogo, title: "Quiz Creation", text: 'Craft engaging quizzes effortlessly with our intuitive quiz creation tool. Add, edit, and structure quiz questions and solutions to tailor the learning experience. Leverage our powerful "Configure Filters" feature to fine-tune the quiz, providing a personalized assessment that aligns with your unique teaching approach.' },
        { image: AutoGradingIcon, title: "Auto Grading", text: "Simplify the grading process with our Auto Grading feature. The system utilizes a relational algebra tree to accurately assess student answers against the instructor's solution. Instant feedback enhances the learning journey and enabling a deeper understanding of SQL concepts. Streamline assessment and focus on what matters most—learning and growth." }
    ];

    return (
        <>
            <SecondHeader />
            <div className="AboutUs-Main">
                <div className="Hero-Section">
                    <div className="Hero-Overlay">
                        <div className="Hero-AboutUs-Text">
                            <h1 className="Hero-AboutUs-Text-Header">
                                Learn SQL.
                            </h1>
                            <div className="Solid-Vector" />
                            <h2 className="Hero-AboutUs-Text-SubHeader">Anywhere, Anytime.</h2>
                            <div className="Solid-Black-Line" />
                            <p className="Hero-AboutUs-Text-Paragraph">
                                Embark on a journey with DataWiz, where boundless <br />
                                knowledge meets interactive quizzes and animated <br />
                                queries. Elevate your learning experience today!
                            </p>
                        </div>
                    </div>
                    <img className="Hero-Image" src={AboutUsHeroImg} alt="" />
                </div>
                <div className="AboutUs-Section1">
                    <div className="AboutUs-Section1-Text">
                        <h1 className="AboutUs-Section1-Title">Interactive quizzes, <br /> animated queries –
                            limitless learning adventures <br />
                            <span className="Bold-Text"> await you. <div className="Solid-Vector2" /></span>
                        </h1>
                        <div className="Solid-Black-Line2" />
                        <p className="AboutUs-Section1-Content">Initiated in April 2023, DataWiz embodies the expertise <br /> of Hiba Gohar,
                            Rida Asif, Mohammed Ejaz Choudhary, <br /> Mohammed Nihal, and Tehami Nadeem. Mastering Big <br /> Data, Cybersecurity, and
                            Game Development, DataWiz <br /> sets new standards in the realm of SQL applications.</p>
                    </div>
                    <img className="AboutUs-Section1-Image" src={AboutUsGlobe} alt="" />
                </div>
                <div className="AboutUs-Section2">
                    <div className="AboutUs-Section2-Text">
                        <h1 className="AboutUs-Section2-Title">Transform your learning with a suite <br />
                            <span className="Bold-Text"> of exciting and enhanced features. <div className="Solid-Vector3" /></span>
                        </h1>
                        <div className="Solid-Black-Line3" />
                    </div>
                    <h1 className="AboutUs-Section2-Sub-Title">Animation Module</h1>
                    {animationData.map((item) => {
                        return (
                            <div className="AboutUs-Section2-Container">
                                <div className="AboutUs-Section2-Image-Container">
                                    <img className="AboutUs-Section2-Image" src={item.image} alt="" />
                                </div>
                                <div className="AboutUs-Section2-Text-Container">
                                    <h1 className="AboutUs-Section2-Card-Title">{item.title}</h1>
                                    <p className="AboutUs-Section2-Content">{item.text}</p>
                                </div>
                            </div>
                        );
                    }
                    )}
                    <h1 className="AboutUs-Section2-Sub-Title">Auto-Grading Module</h1>
                    {quizData.map((item) => {
                        return (
                            <div className="AboutUs-Section2-Container2">
                                <div className="AboutUs-Section2-Text-Container Quiz-Cont">
                                    <div className="AboutUs-Section2-Card-Title-Quiz-Cont">{item.title}</div>
                                    <p className="AboutUs-Section2-Content Quiz-Cont">{item.text}</p>
                                </div>
                                <div className="AboutUs-Section2-Image-Container">
                                    <img className="AboutUs-Section2-Image" src={item.image} alt="" />
                                </div>
                            </div>
                        );
                    }
                    )}
                </div>
                <div className="AboutUs-Section3">
                    <div className="AboutUs-Section3-Container">
                        <div className="AboutUs-Section3-Header">
                            <h1 className="AboutUs-Section3-Title">Behind the scenes of<br />
                                <span className="Bold-Text"> DataWiz. <div className="Solid-Vector4" /></span>
                            </h1>
                            <div className="Solid-Black-Line4" />
                        </div>
                        <div className="AboutUs-Section3-Body">
                        <div className="AboutUs-Section3-Text">
                                <p className="AboutUs-Section3-Content">In the intricate dance of data education, DataWiz stands at the intersection of innovation and technology. 
                                Behind every animation and auto-grading feature lies a meticulous tech tapestry. 
                                Node.js paves the way, React shapes the interfaces, and the recent shift to MySQL and SQLite ensures scalability and efficiency.
                                </p>
                                <p className="AboutUs-Section3-Content">DataWiz is not just about code; it's a collective effort. 
                                Our passionate team collaborates seamlessly, infusing creativity into every feature. 
                                From the animated Query Animation to the precise Auto-Grading, each line of code is a step toward redefining how SQL is learned and mastered. 
                                Step behind the scenes, where collaboration meets innovation, and witness the evolution of DataWiz—a living project, 
                                continuously shaped by your feedback and the commitment to making SQL education both informative and captivating.
                                </p>
                            </div>
                            <img className="AboutUs-Section3-Image" src={AboutUsGlobe} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default AboutUsPage;
