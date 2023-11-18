import React from 'react';
import "./AccordionItem.css";
import Chevron from '../../../assets/images/Chevron.svg';

const Accordion = ({ question, answer, isSelected, onClick }) => (
  <div className="accordion">
    <div className="accordion-title" onClick={onClick}>
      <div>{question}</div>
      <img
        className={isSelected ? 'chevron-icon rotated' : 'chevron-icon'}
        src={Chevron}
        alt="Chevron Icon"
      />
    </div>
    <div className={isSelected ? 'content show' : 'content'}>
      <hr className="FAQ-line"/>
      {answer}
    </div>
  </div>
);



export default Accordion;
