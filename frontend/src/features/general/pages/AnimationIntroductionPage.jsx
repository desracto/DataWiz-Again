import { useCallback } from "react";
import "./AnimationIntroductionPage.css";
import vector5 from '../../../assets/images/vector-5.svg';

const AnimationIntroductionPage = () => {
  const onAnimIntroSchemaAndAnimButtClick = useCallback(() => {
    // Please sync "Schema Selection Page" to the project
  }, []);

  const onAnimIntroSavedQueriesButtonClick = useCallback(() => {
    // Please sync "Schema Selection Page" to the project
  }, []);

  return (
    <div className="animation-introduction-page">
      <div className="animation-introduction-page-child" />
      <img
        className="animation-introduction-page-item"
        alt=""
        src={vector5}
      />
      <img
        className="animation-introduction-page-inner"
        alt=""
        src="/vector-6.svg"
      />
      <img
        className="animation-introduction-page-child1"
        alt=""
        src="/vector-3.svg"
      />
      <div className="schema-selection-section">
        <div className="schema-selection-section-child" />
        <img
          className="image-removebg-1-icon"
          alt=""
          src="/imageremovebg-1@2x.png"
        />
        <div className="schema-selection-section-inner">
          <div className="animintro-schema-and-anim-butt-parent">
            <button
              className="animintro-schema-and-anim-butt"
              onClick={onAnimIntroSchemaAndAnimButtClick}
            >
              <div className="animintro-schema-and-anim-butt-child" />
              <div className="check-out-schemas">{`Check out Schemas & Animations`}</div>
            </button>
            <img className="group-item" alt="" src="/vector-61.svg" />
            <div className="schema-selection-for-container">
              <p className="schema-selection">Schema Selection</p>
              <p className="schema-selection">For Query Animation</p>
            </div>
            <div className="explore-the-intricate">
              Explore the intricate steps behind SQL queries with our Query
              Animation. Select from a range of schemas, craft your query, and
              witness a captivating animation that unveils how the database
              processes your query to derive the final result. An interactive
              and visual learning experience like never before.
            </div>
          </div>
        </div>
      </div>
      <div className="ellipse-div" />
      <div className="saved-query-animation-section">
        <div className="saved-query-animation-section-child" />
        <img
          className="saved-query-animation-section-item"
          alt=""
          src="/vector-62.svg"
        />
        <div className="saved-query-animations-parent">
          <div className="saved-query-animations-container">
            <p className="schema-selection">{`Saved Query `}</p>
            <p className="schema-selection">Animations</p>
          </div>
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
            <div className="animintro-schema-and-anim-butt-child" />
            <div className="check-out-schemas">
              Go to Saved Query Animations
            </div>
          </button>
        </div>
        <img
          className="image-removebg-preview-3-1"
          alt=""
          src="/imageremovebgpreview-3-1@2x.png"
        />
      </div>
      <div className="rectangle-group">
        <div className="group-inner" />
        <div className="vector-parent">
          <img className="group-child1" alt="" src="/vector-63.svg" />
          <div className="uncover-sql-magic">Uncover SQL Magic</div>
          <div className="watch-queries-come">
            Watch Queries Come Alive, Step by Step, in Engaging Animations.
          </div>
        </div>
        <img
          className="image-removebg-preview-4-1"
          alt=""
          src="/imageremovebgpreview-4-1@2x.png"
        />
      </div>
    </div>
  );
};

export default AnimationIntroductionPage;
