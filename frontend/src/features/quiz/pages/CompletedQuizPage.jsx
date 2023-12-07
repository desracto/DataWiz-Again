import { useCallback,useState } from "react";
import "./CompletedQuizPage.css";
import pdfimg from "../../../assets/images/pdf.png";
import schemaImg from "../pages/schema.jpeg"
import GeneratedQuizLinkComp from "../components/GeneratedQuizLink";
import { useParams } from 'react-router-dom';
import SecondHeader from "../../../global_components/SecondHeader";
import { useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";

const CompletedQuiz = () => {
    const navigate = useNavigate();

    const [showGeneratedQuizLink, setShowGeneratedQuizLink] = useState(false);
    const handleGenerateQuizLinkClick = () => {
        setShowGeneratedQuizLink(true); // Show the popup
    };

    const handleBackClick = useCallback(() => {
        navigate("/SavedQuizzesPage");
    }, [navigate]);

    const ViewButtonClick = useCallback(() => {
        navigate("/AllAttemptsPage");
    }, [navigate]);

  return (
    
        <>
          <SecondHeader />
    
          <div className="main_Page">
            <div
              className={
                " max-w-7xl content_container_bgcolor mx-auto h-auto rounded-2xl z-10 relative mt-20"
              }
            >
              {/* Back arrow button */}
              <button onClick={handleBackClick} className="completedquiz-back-arrow-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="px-20">
                <div className=" view-attempts-text py-10">View All Attempts and Results</div>
                <div className="flex justify-center pb-10">
                  <button
                    className="viewAll-Attempts-Button md:w-[35%]" // Add your button styles here
                    onClick={ViewButtonClick}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
    
            <div className={" max-w-7xl content_container_bgcolor mx-auto h-auto rounded-2xl z-10"}>
              <div className="px-20 mt-[80px]">
                <div className=" text-xl py-14 font1">Quiz 2</div>
                <div className={" py-5"}>
                  {/* <div className={"groupItem"} /> */}
                  <div className={"rounded-2xl bg-white p-10"}>
                    <ul className={"youWillHaveASpecificAmoun"}>
                        A test quiz 
                    </ul>
                  </div>
                </div>
    
                <div className={"innerheading"}>Schema:</div>
                <div className="bg-white rounded-2xl margin_bottom pb-3 pt-3 ">
                  <img className={"w-full max-h-96 object-contain"} alt="" src={schemaImg} />
                </div>

                <div className={"pb-10 z-10"}>
                    <div className={"innerheading"}>Question - 1</div>
                    <div className={" bg-white rounded-2xl p-5"}>
                        <div className={"inputLabel font1"}>Problem:</div>
                        <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                        List all the students with their email addresses
                        </div>
                        </div>
        
                        <div className={"font1"}>Answer:</div>
                        <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                            <p className={"blankLine"}>
                            SELECT FirstName, LastName, Email FROM Student;
                            </p>
                        
                        </div>
                        </div>
                    </div>
                </div>

                <div className={"pb-10 z-10"}>
                    <div className={"innerheading"}>Question - 2</div>
                    <div className={" bg-white rounded-2xl p-5"}>
                        <div className={"inputLabel font1"}>Problem:</div>
                        <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                        Find the total number of students enrolled in each course
                        </div>
                        </div>
        
                        <div className={"font1"}>Answer:</div>
                        <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                            <p className={"blankLine"}>
                            SELECT CourseID, COUNT(StudentID) AS NumberOfStudents FROM Enrollment GROUP BY CourseID;
                            </p>
                        
                        </div>
                        </div>
                    </div>
                </div>

                <div className={"pb-10 z-10"}>
                    <div className={"innerheading"}>Question - 3</div>
                    <div className={" bg-white rounded-2xl p-5"}>
                        <div className={"inputLabel font1"}>Problem:</div>
                        <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                        Provide the names of instructors along with the courses they teach.
                        </div>
                        </div>
        
                        <div className={"font1"}>Answer:</div>
                        <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                            <p className={"blankLine"}>
                            SELECT i.InstructorName, c.CourseName FROM Instructor i JOIN Course c ON i.InstructorID = c.InstructorID GROUP BY CourseID ORDER BY CourseID;
                            </p>
                        
                        </div>
                        </div>
                    </div>
                </div>

                <div className={"pb-10 z-10"}>
                    <div className={"innerheading"}>Question - 4</div>
                    <div className={" bg-white rounded-2xl p-5"}>
                        <div className={"inputLabel font1"}>Problem:</div>
                        <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                        Retrieve all blogger names and their email addresses
                        </div>
                        </div>
        
                        <div className={"font1"}>Answer:</div>
                        <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                            <p className={"blankLine"}>
                            SELECT BloggerName, Email FROM Blogger;
                            </p>
                        
                        </div>
                        </div>
                    </div>
                </div>

                <div className={"pb-10 z-10"}>
                    <div className={"innerheading"}>Question - 5</div>
                    <div className={" bg-white rounded-2xl p-5"}>
                        <div className={"inputLabel font1"}>Problem:</div>
                        <div className={" innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                        List all blog posts along with their corresponding blogger names.
                        </div>
                        </div>
        
                        <div className={"font1"}>Answer:</div>
                        <div className={"innerbg rounded-[0.6rem] p-5 my-5"}>
                        <div className={"inputLabel"}>
                            <p className={"blankLine"}>
                            SELECT b.BloggerName, bp.Title, bp.Conte FROM Blogger b JOIN BlogPost bp ON b.BloggerID = bp.Blogg;
                            </p>
                        
                        </div>
                        </div>
                    </div>
                </div>

                
              </div>
            </div>
    
            <div className="flex justify-center pb-10">
              <button
                className="generateQuizButton md:w-[15%] items-center justify-center" // Add your button styles here
                onClick={handleGenerateQuizLinkClick}
              >
                Generate Quiz Link
              </button>
            </div>
            {/* Popup component */}
            {showGeneratedQuizLink && (
              <GeneratedQuizLinkComp onClose={() => setShowGeneratedQuizLink(false)} />
            )}
          </div>
        </>
      );
    };
    
    export default CompletedQuiz;
    