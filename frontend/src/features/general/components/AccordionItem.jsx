import React from 'react';
import "./AccordionItem.css";
import Chevron from '../../../assets/images/Chevron.svg';

// Define the Accordion functional component, taking in props
const Accordion = ({ question, answer, isSelected, onClick }) => (
  // Outer container for the entire Accordion item
  <div className="accordion">
    {/* Title section of the Accordion item, clickable to toggle visibility */}
    <div className="accordion-title" onClick={onClick}>
      <div>{question}</div>
      {/* Chevron icon for indicating the toggle state */}
      <img
        // Apply the 'rotated' class if isSelected is true, otherwise apply the regular class
        className={isSelected ? 'chevron-icon rotated' : 'chevron-icon'}
        // Set the source of the image to the Chevron icon
        src={Chevron}
        // Alt text for accessibility
        alt="Chevron Icon"
      />
    </div>

    {/* Content section of the Accordion item, conditionally rendered based on isSelected */}
    <div className={isSelected ? 'content show' : 'content'}>
      {/* Horizontal line as a separator */}
      <hr className="FAQ-line"/>
      {answer}
    </div>
  </div>
);

export default Accordion;
