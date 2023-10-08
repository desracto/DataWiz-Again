import React from 'react';
import Header1 from '../../../global_components/Header1';
import './LandingPage.css';

function LandingPage() {
  return (
    <>
      <Header1 />
      <div className="IntroCard">
        <div className="StyleVector1"></div>
        <div className="UnleashThePowerOfSqlLearning">Unleash the<br />power of SQL Learning</div>
        <div className="Description">
          DataWiz is your gateway to mastering SQL effortlessly. Whether you're a curious learner or an educator looking for efficient teaching tools, DataWiz has something for everyone. Explore the world of interactive query animation and auto-grading quizzes for an engaging learning experience.
        </div>
      </div>
    </>
  );
}

export default LandingPage;
