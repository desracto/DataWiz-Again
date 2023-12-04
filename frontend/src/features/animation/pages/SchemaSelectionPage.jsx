import React, { useState } from 'react';
import axios from "axios";
import SecondHeader from '../../../global_components/SecondHeader';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import "./SchemaSelectionPage.css";
import SchemaTable from '../components/SchemaTable';

// Image Imports
import svgImage from '../../../assets/images/vector-31.svg';

// Define the mapping of schema IDs to their corresponding property names
export const schemaIdToProperty = {
    1: 'employees',
    2: ['inventory', 'products'],
    3: ['course', 'enrollments'],
    4: ['flight', 'passenger', 'ticket'],
    5: ['album', 'artist', 'genre', 'song']
};

const SchemaSelectionPage = () => {
    const [selectedSchema, setSelectedSchema] = useState();
    const [selectedSchemaId, setSelectedSchemaId] = useState();
    const navigate = useNavigate();  // Initialize useNavigate

    const onClickHandler = async (schemaId) => {
        try {
            const response = await axios.get("http://localhost:5000/api/animation/schema/" + schemaId);
            const data = response.data.results;

            const selectedSchemaData = Array.isArray(schemaIdToProperty[schemaId])
                ? schemaIdToProperty[schemaId].map(table => data[table])
                : [data[schemaIdToProperty[schemaId]]];

            setSelectedSchema(selectedSchemaData);
            setSelectedSchemaId(schemaId);

            console.log('Selected Schema:', selectedSchemaData);
        } catch (error) {
            console.error('Error fetching schema:', error);
        }
    };

    const onSelectButtonClick = () => {
        // Use Link to navigate to QueryAnimationPage with selected schema data and ID
        navigate("/QueryAnimationPage", {
            state: { selectedSchema, schemaId: selectedSchemaId }
        });
    };

    return (
        <>
            <SecondHeader />

            <div className="SVG-CONTAINER">
                <img
                    src={svgImage}
                    alt="SVG Background"
                    className="svg-background"
                />
            </div>
            <div className="SchemaSelectionContainer">
                <div className="SchemaSelectionTitle">
                    Schema Selection
                </div>
                <div className="SchemaSelectionText">
                    Begin your journey into the world of data manipulation and SQL query visualization by selecting from our five diverse range of pre-designed schemas.
                </div>
                <div className="SchemaSelectionCard">
                    <div className="button-container">
                        {[1, 2, 3, 4, 5].map(schemaId => (
                            <button key={schemaId} onClick={() => onClickHandler(schemaId)} className={`Schema${schemaId}Button`}>
                                SCHEMA {schemaId}
                            </button>
                        ))}
                    </div>
                    <div className="SchemaDisplayCard">
                        <div className="SchemaDisplayCardContent">
                            <SchemaTable schemaData={selectedSchema} schemaIdToProperty={schemaIdToProperty} selectedSchemaId={selectedSchemaId} />
                        </div>
                    </div>
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
        </>
    );
};

export default SchemaSelectionPage;
