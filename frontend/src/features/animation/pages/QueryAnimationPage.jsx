import React, { useState, useCallback } from 'react';
import SecondHeader from '../../../global_components/SecondHeader';
import SchemaTable from '../components/SchemaTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { schemaIdToProperty } from './SchemaSelectionPage';

import axios from 'axios'; 
import "./QueryAnimationPage.css";

// Image Imports
import svgImage from '../../../assets/images/vector-31.svg'; 
import svgImage2 from '../../../assets/images/blob-haikei.svg'; 

const request = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true,
    timeout: 300000
});

const QueryAnimationPage = () => {
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [queryResults, setQueryResults] = useState(null);
    const [querySteps, setQuerySteps] = useState(null);

    const navigate = useNavigate();
    const returnToSchemaSelection = useCallback(() => {
        navigate("/SchemaSelectionPage");
    }, [navigate]);

    // Extract selected schema and schemaId from location.state
    console.log("Location state:", location.state);
    const selectedSchema = location.state ? location.state.selectedSchema : null;
    const schemaId = location.state ? location.state.schemaId : null;
    console.log("Selected Schema ID:", schemaId);

    const handleEnterKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setQuery((prevQuery) => prevQuery + "\n");
        }
    };
  

    const handleAnimateQuery = async () => {
        const trimmedQuery = query.trim();

        // Check if the query contains 'DROP' or 'DELETE'
        if (/drop|delete/i.test(query)) {
        window.alert("DROP and DELETE statements are not allowed.");
        return;
        }

         // Check for multiple query terminators
         if ((query.match(/;/g) || []).length > 1) {
            window.alert("Batch queries are not allowed.");
            return;
        }
        /*
        if (!trimmedQuery.startsWith("SELECT")) {
            window.alert("Only SELECT queries are allowed.");
            return;
        }
        */

        try {
            const response = await request.post('/api/animation/animate/', { query });
            const data = response.data;

            // Log the response to the console (for testing purposes)
            // console.log(data);

            // Update state with the steps_result
            setQueryResults(data.results);
            setQuerySteps(data.steps);
            console.log("HERE", queryResults);
            console.log("HERE", querySteps);

            // Further handling of the response, if needed
        } catch (error) {
            console.error('An error occurred:', error);
            // Log the entire error object
            console.error(error)
        }
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
        <img 
            src={svgImage2} 
            alt="SVG Background" 
            className="svg-background1" 
        />
        <img 
            src={svgImage} 
            alt="SVG Background" 
            className="svg-background2" 
        />
        <img 
            src={svgImage2} 
            alt="SVG Background" 
            className="svg-background3" 
        />
    </div>

    <div className="QueryAnimationContainer">
        <div className="QueryAnimationTitle">
            Query Animation
        </div>
        <div className="QueryAnimationText">
            Unlock the power of SQL with DataWiz's mesmerizing query animations, revealing the steps of database queries in a whole new light.            
        </div>

        <div className="QueryInputCard">
                <div className="AnimationNameLabel">
                    Enter Animation Name:
                </div>
            <div className="AnimationNameContainer1">
                <textarea
                    className="AnimationNameTextbox"
                    type="text"
                    placeholder="Animation 1"
                />
            </div>
            <div className='button-container1' >
                <button className='ReturnSchemaSelectionButton'
                        onClick={returnToSchemaSelection}>
                        Schema Selection
                </button>
            </div>

            <div className='button-container2' >
                <button className='SchemaButton'>
                    SCHEMA
                </button>
            </div>
            <div className="SelectedSchemaDisplayCard">
                <div className='SelectedSchemaCardContent'>
                    {/* Display the selected schema using SchemaTable */}
                    {selectedSchema && schemaId && (
                        <SchemaTable
                            schemaData={selectedSchema}
                            schemaIdToProperty={schemaIdToProperty}
                            selectedSchemaId={schemaId}
                        />
                     )}
                </div>
            </div>


            <div className="QueryContainer">
                <textarea
                    className="QueryPlaceholder"
                    type="text"
                    placeholder="Enter Query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e)}
                />
                <button className='AnimateQueryButton' onClick={handleAnimateQuery}>
                    ANIMATE QUERY
                </button>
            </div>
        </div>

        <div className='DownAndSaveButtonContainer'>
            <button className='SaveAniButton'>
                SAVE ANIMATION
            </button>
            <button className='DownPDFButton'>
                DOWNLOAD PDF
            </button>
        </div>

        <div className='QueryStepsDisplayCard'>
            {/* Display steps_results if available */}
            {querySteps && (
                <>
                    <h3>The Query Steps:</h3>
                    {querySteps.slice(0, -1).map((step, index) => (
                        <div key={index} className="QueryStep">
                            <p><strong>{`STEP ${index + 1}:`}</strong> <span>{step}</span></p>
                        </div>
                    ))}
                    {querySteps.length > 0 && (
                        <div className="QueryStep">
                            <p><strong>Your Query:</strong> <span>{querySteps[querySteps.length - 1]}</span></p>
                        </div>
                    )}
                </>
            )}
        </div>


        <div className='VisualizationDisplayCard'>
            {/* Display steps_results if available */}
            {/* {querySteps && (
                <>
                    {querySteps.map((step, index) => (
                        <div key={index}>
                            <div className="table-info-container">
                                <p>{`Query ${index + 1}: ${step}`}</p>
                            </div>
                            {index < querySteps.length - 1 && (
                                <div className="arrow-indicator1">
                                    <span>&#8595;</span>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )} */}

            {/* Display query_results if available */}
            {queryResults &&  (
                    <>
                        {/* <h3>Query Results:</h3> */}
                        <pre>{JSON.stringify(queryResults, null, 2)}</pre>
                    </>
                )}


        </div>

    </div>

    </>
  );
};

export default QueryAnimationPage;