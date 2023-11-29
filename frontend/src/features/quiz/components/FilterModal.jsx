import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import ToggleSwitch from "../../../global_components/ToggleButton";
import "./FilterModal.css"

const FilterModal = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="filter-modal-container">
      <div className="modal-content">
        <div className="title-section">
          <div className="title ">
            Auto-Grading Filters
          </div>
          <div className="filter-modal-description">
            Enhance the precision of query grading by configure filters to tailor the assessment
            of student answers and ensure accurate evaluations within DataWiz.
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-item">
            <ToggleSwitch label="Join VS Inner-Join" unique_by="1" />
          </div>
          <div className="grid-item">
            <ToggleSwitch label="Spell Checker" unique_by="2" />
          </div>
          <div className="grid-item">
            <ToggleSwitch label="Case Sensitive" unique_by="3" />
          </div>
          <div className="grid-item">
            <ToggleSwitch label="Typo" unique_by="4" />
          </div>
          <div className="grid-item">
            <ToggleSwitch label="From-Join" unique_by="5" />
          </div>
          <div className="grid-item">
            <ToggleSwitch label="Table comparison" unique_by="6" />
          </div>
        </div>
      </div>
      <div className="button-container">
        <button
          className=" return-button"
          onClick={onClose}
        >
          Return to Quiz
        </button>
        <button className="FilterModal-preview-button">
          Preview Quiz
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
