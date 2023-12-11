import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

// Import custom ToggleSwitch component and styling
import ToggleSwitch from "../../../global_components/ToggleButton";
import "./FilterModal.css"

// Define the FilterModal functional component
const FilterModal = ({ onClose }) => {
    // Get the navigate function from React Router
    const navigate = useNavigate();

    return (
        <div className="filter-modal-container">
            <div className="modal-content">
                {/* Section for the title and description of the modal */}
                <div className="title-section">
                    <div className="title ">
                        Auto-Grading Filters
                    </div>
                    <div className="filter-modal-description">
                        Enhance the precision of query grading by configuring filters to tailor the assessment
                        of student answers and ensure accurate evaluations within DataWiz.
                    </div>
                </div>

                {/* Grid container for ToggleSwitch components */}
                <div className="grid-container">
                    <div className="grid-item">
                        {/* ToggleSwitch for "Matching Join types" filter */}
                        <ToggleSwitch label="Matching Join types" unique_by="1" />
                    </div>
                    <div className="grid-item">
                        {/* ToggleSwitch for "Spell checker / Typo" filter */}
                        <ToggleSwitch label="Spell checker / Typo" unique_by="2" />
                    </div>
                    <div className="grid-item">
                        {/* ToggleSwitch for "Additional data" filter */}
                        <ToggleSwitch label="Additional data" unique_by="3" />
                    </div>
                </div>
            </div>

            {/* Container for buttons at the bottom of the modal */}
            <div className="button-container">
                {/* Button to close the modal */}
                <button
                    className="return-button"
                    onClick={onClose}
                >
                    Return to Quiz
                </button>

                {/* Button for previewing the quiz */}
                <button className="FilterModal-preview-button">
                    Preview Quiz
                </button>
            </div>
        </div>
    );
};

export default FilterModal;