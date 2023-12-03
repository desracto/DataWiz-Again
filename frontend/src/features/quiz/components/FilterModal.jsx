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
            <ToggleSwitch label="Matching Join types" unique_by="1" />
          </div>
          <div className="grid-item">
            <ToggleSwitch label="Spell checker / Typo" unique_by="2" />
          </div>
          <div className="grid-item">
            <ToggleSwitch label="Additional data" unique_by="3" />
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
