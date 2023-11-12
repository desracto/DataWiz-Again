import { useCallback } from "react";
import { useNavigate} from "react-router-dom";
import "./AnimationIntroductionPage.css";
import SecondHeader from "../../../global_components/SecondHeader";

//Image imports
import animQuery from '../../../assets/images/animInto-QueryAnimation.png';
import vector62 from '../../../assets/images/vector-62.svg';
import animSavedQuery from '../../../assets/images/animInto-savedQuery.png';
import vector63 from '../../../assets/images/vector-63.svg';
import animMain from '../../../assets/images/animInto-MainImage.png';


const AnimationIntroductionPage = () => {
  const navigate = useNavigate();
  const onAnimIntroSchemaAndAnimButtClick = useCallback(() => {
    navigate("/SchemaSelectionPage")
  }, [navigate]);
  const onAnimIntroSavedQueriesButtonClick = useCallback(() => {
    navigate("/SchemaSelectionPage")
  }, []);


  return (
    <>
      <SecondHeader/>
        <div className="Anim-intro-sec1">
          <img
            className="image-removebg-preview-4-1"
            alt=""
            src={animMain}
          />

          <div className="Anim-intro-sec-Text">
            <img 
              className="group-child1" 
              alt="" 
              src={vector63} 
            />
            <div className="uncover-sql-magic">Uncover SQL Magic</div>
            <div className="watch-queries-come">
             Watch Queries Come Alive, Step by Step, in Engaging Animations.
           </div>
          </div>
        </div>

        <div className="Anim-intro-sec2">
          <div className="Anim-intro-sec2-Text">
          {/* <img className="group-item" alt="" src={vector61} /> */}
            <p className="schema-selection">Schema Selection</p>
            <p className="schema-selection">For <span className="schema-selection2">Query Animation</span></p>

            <div className="explore-the-intricate">
              Explore the intricate steps behind SQL queries with our Query
              Animation. Select from a range of schemas, craft your query, and
              witness a captivating animation that unveils how the database
              processes your query to derive the final result. An interactive
              and visual learning experience like never before.
             </div>
             <button
              className="animintro-schema-and-anim-butt"
              onClick={onAnimIntroSchemaAndAnimButtClick}
              >
              <div className="check-out-schemas">Check out Schemas & Animations</div>
              </button>
            </div>
          <img
            className="image-removebg-1-icon"
            alt=""
            src={animQuery}
          />    
        </div>

        <div className="Anim-intro-sec3">
          <img
            className="image-removebg-preview-3-1"
            alt=""
            src={animSavedQuery}
          />
          <div className="Anim-intro-sec3-text">
            <img
              className="saved-query-animation-section-item"
              alt=""
              src={vector62}
            />
              <p className="schema-selection">Saved Query </p>
              <p className="schema-selection">Animations</p>
              <div className="never-lose-your2">
              Never lose your valuable query animations with our efficient saving
              system. Access and manage all your previously animated queries in
              one organized location. Re-view and analyze previous animations.
              Download the animation for your records.
            </div>
            <button
                className="animintro-saved-queries-button"
                onClick={onAnimIntroSavedQueriesButtonClick}
            >
                <div className="check-out-schemas">
                  Go to Saved Query Animations
                </div>
            </button>
          </div>
        </div>
      


    </>
  )
}

export default AnimationIntroductionPage;