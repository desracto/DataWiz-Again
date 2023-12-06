import SecondHeader from "../../../global_components/SecondHeader";
import { useNavigate} from "react-router-dom";
import { useCallback,useState } from "react";
import "./AllAttemptsPage.css";
import pdf from '../../../assets/images/pdf.png';

const AllAttempts = () => {
    const navigate = useNavigate();

const ViewBackButtonClick = useCallback(() => {
    navigate("/CompletedQuizPage");
}, [navigate]);

  return (
    <>
    <SecondHeader/>


    <div className="main_Page">

       
        {/* Back arrow button */}
        <button onClick={ViewBackButtonClick} className="back-arrow-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
    
      
      
      <div className={" max-w-7xl AllAttempts-content_container_bgcolor mx-auto h-auto rounded-2xl z-10"}>
        <div className="px-20 mt-[80px]">
          
          <div className="All-attempts-textt ">All Attempts</div>
          <div className={" py-5"}>
            <div className={"All-attempts-Inner-Container"}>
             
                <li className={"Attempts-List"}>
                  Name: Hiba Gohar
                  <span className="Auto-Grading-Results-Text">
                  <img src={pdf} alt="PDF" className="PDF-Icon" />
                  Auto-Grading Results
                  </span>
                </li>
              
              <p className={"blankLine"}>&nbsp;</p>
              
              
                <li className={"Attempts-List"}>
                  Name: Hiba Gohar
                  <span className="Auto-Grading-Results-Text">
                  <img src={pdf} alt="PDF" className="PDF-Icon" />
                  Auto-Grading Results
                  </span>
                </li>
              
              <p className={"blankLine"}>&nbsp;</p>
              
                <li className={"Attempts-List"}>
                  Name: Tehami
                  <span className="Auto-Grading-Results-Text " >
                  <img src={pdf} alt="PDF" className="PDF-Icon" />
                  Auto-Grading Results
                  </span>
                </li>
              
            </div>
          </div>

          
            
          

          

          
        </div>
      </div>

      
     
    </div>
    </>
  );
};

export default AllAttempts;
