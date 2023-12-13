import React, { useState } from 'react';
import axios from "axios";
import SecondHeader from '../../../global_components/SecondHeader';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import "./SchemaSelectionPage.css";
import SchemaTable from '../components/SchemaTable';
import Footer from '../../../global_components/Footer';

// Image Imports
import svgImage from '../../../assets/images/vector-31.svg';
import svgImage2 from '../../../assets/images/blob-haikei.svg';

// Define the mapping of schema IDs to their corresponding property names
export const schemaIdToProperty = {
    1: 'employee',
    2: ['inventory', 'product'],
    3: ['course', 'enrollment'],
    4: ['flight', 'passenger', 'ticket'],
    5: ['album', 'artist', 'genre', 'song']
};

// Define the SchemaSelectionPage functional component
const SchemaSelectionPage = () => {
    const [selectedSchema, setSelectedSchema] = useState();
    const [selectedSchemaId, setSelectedSchemaId] = useState();
    const navigate = useNavigate();  // Initialize useNavigate

    // Function to handle button click for selecting a schema
    const onClickHandler = async (schemaId) => {
        try {
            // Make an API request to fetch schema data based on schema ID
            const response = await axios.get("http://localhost:5000/api/animation/schema/" + schemaId);
            const data = response.data.results;

            // Extract selected schema data based on the mapping
            const selectedSchemaData = Array.isArray(schemaIdToProperty[schemaId])
                ? schemaIdToProperty[schemaId].map(table => data[table])
                : [data[schemaIdToProperty[schemaId]]];

            // Update state with selected schema data and ID
            setSelectedSchema(selectedSchemaData);
            setSelectedSchemaId(schemaId);

            console.log('Selected Schema:', selectedSchemaData);
        } catch (error) {
            console.error('Error fetching schema:', error);
        }
    };

    // Function to handle button click for navigating to QueryAnimationPage
    const onSelectButtonClick = () => {
        // Use Link to navigate to QueryAnimationPage with selected schema data and ID
        navigate("/QueryAnimationPage", {
            state: { selectedSchema, schemaId: selectedSchemaId }
        });
    };

    return (
        <>
            <SecondHeader />

            {/* SVG Backgrounds */}
            <div className="SVG-CONTAINER">
                <img src={svgImage} alt="SVG Background" className="svg-background" />
                <img src={svgImage2} alt="SVG Background" className="svg-background1" />
            </div>


            {/* Main container for SchemaSelectionPage */}
            <div className="SchemaSelectionContainer">
                {/* Title for schema selection */}
                <div className="SchemaSelectionTitle">
                    Schema Selection
                </div>

                {/* Text description for schema selection */}
                <div className="SchemaSelectionText">
                    Begin your journey into the world of data manipulation and SQL query visualization by selecting from our five diverse range of pre-designed schemas.
                </div>

                {/* Schema selection card */}
                <div className="SchemaSelectionCard">
                    {/* Button container for schema selection */}
                    <div className="button-container">
                        {[1, 2, 3, 4, 5].map(schemaId => (
                            // Map through schema IDs and create a button for each
                            <button key={schemaId} onClick={() => onClickHandler(schemaId)} className={`Schema${schemaId}Button`}>
                                SCHEMA {schemaId}
                            </button>
                        ))}
                    </div>

                    {/* Display selected schema data using SchemaTable */}
                    <div className="SchemaDisplayCard">
                        <div className="SchemaDisplayCardContent">
                            <SchemaTable schemaData={selectedSchema} schemaIdToProperty={schemaIdToProperty} selectedSchemaId={selectedSchemaId} />
                        </div>
                    </div>

                    {/* Button container for selecting the schema and navigating to QueryAnimationPage */}
                    <div className="SchemaSelectButton-container">
                        {/* Use Link to navigate to QueryAnimationPage */}
                        <Link to="/QueryAnimationPage" state={{ selectedSchema, schemaId: selectedSchemaId }}>
                            <button className="SchemaSelectButton" onClick={onSelectButtonClick}>
                                SELECT
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default SchemaSelectionPage;
