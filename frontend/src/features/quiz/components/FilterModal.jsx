import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

// Import custom ToggleSwitch component and styling
import ToggleSwitch from "../../../global_components/ToggleButton";
import "./FilterModal.css"

// Define the FilterModal functional component
const FilterModal = ({ filters, onFilterChange, onClose }) => {

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
                        <ToggleSwitch label="Matching Join types" unique_by="1" 
                                      checked={filters['matching_joins']}
                                      onChange={(e) => {onFilterChange('matching_joins')}}
                        />
                    </div>
                    <div className="grid-item">
                        {/* ToggleSwitch for "Spell checker / Typo" filter */}
                        <ToggleSwitch label="Spell checker / Typo" unique_by="2" 
                                      checked={filters['spell_check']}
                                      onChange={(e) => {onFilterChange('spell_check')}}
                        />
                    </div>
                    <div className="grid-item">
                        {/* ToggleSwitch for "Additional data" filter */}
                        <ToggleSwitch label="Additional data" unique_by="3"
                                      checked={filters['additional_data']}
                                      onChange={(e) => {onFilterChange('additional_data')}}
                        />
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