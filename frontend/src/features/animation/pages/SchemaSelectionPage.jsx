import React, { useState } from 'react';
import axios from "axios";
import SecondHeader from '../../../global_components/SecondHeader';
import "./SchemaSelectionPage.css";
import SchemaTable from '../components/SchemaTable';
import { Link } from 'react-router-dom';

// Image IMports
import svgImage from '../../../assets/images/vector-31.svg'; 


// Define the mapping of schema IDs to their corresponding property names
const schemaIdToProperty = {
	1: 'employees',
	2: ['inventory', 'products'],
	3: ['course', 'enrollments'],
	4: ['flight', 'passenger', 'ticket'],
	5: ['album', 'artist', 'genre', 'song']
};


export default function SchemaSelectionPage() {
  
    const [selectedSchema, setSelectedSchema] = useState(); /* This state will hold the data for the selected schema to be displayed. */
    const onClickHandler = async (schemaId) => {
      try {
        const response = await axios.get("http://localhost:5000/api/animation/schema/" + schemaId);
        const data = response.data.results;
    
        // Handle schemas with multiple tables
        const selectedSchemaData = Array.isArray(schemaIdToProperty[schemaId])
          ? schemaIdToProperty[schemaId].map(table => data[table])
          : [data[schemaIdToProperty[schemaId]]];
    
        setSelectedSchema(selectedSchemaData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching schema:', error);
      }
    };
  
  return (
    <>
    <SecondHeader />       
    
    <div className="SVG-CONTAINER">
        {/* SVG Background */}
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
                    <SchemaTable schemaData={selectedSchema} />
                    </div>
                </div>
                <div className="SchemaSelectButton-container">
                    <Link
                    to='/QueryAnimationPage'
                    state = {{
                        schemaData: selectedSchema
                    }}>
                    <button className="SchemaSelectButton">SELECT</button>
                    </Link>
                </div>
            </div>
        </div>
    </>
  );
}
