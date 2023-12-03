import React, { useState, useCallback } from 'react';
import SecondHeader from '../../../global_components/SecondHeader';
import SchemaTable from '../components/SchemaTable';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios'; 
import "./QueryAnimationPage.css";
 
// Image IMports
import svgImage from '../../../assets/images/vector-31.svg'; 
import svgImage2 from '../../../assets/images/blob-haikei.svg'; 

const request = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true,
    timeout: 300000
})

export default function SchemaSelectionPage() {

    const location = useLocation();
    const selectedSchema = location.state.schemaData;
    // console.log(location.state.schemaData);
    const [query, setQuery] = useState('');
    const [stepsResult, setStepsResult] = useState(null); // this state to stores the result

    const navigate = useNavigate();
    const returnToSchemaSelection = useCallback(() => {
      navigate("/SchemaSelectionPage")
    }, [navigate]);

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
            console.log(data);

            // Update state with the steps_result
            setStepsResult(data.steps_result);

            // Further handling of the response, if needed
        } catch (error) {
            console.error('An error occurred:', error);
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
                    <SchemaTable schemaData ={selectedSchema}/>
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

        <div className='VisualizationDisplayCard'>
            {/* Display steps_result if available */}
            {stepsResult && (
                <>
                    <h3>Steps Result:</h3>
                    <pre>{JSON.stringify(stepsResult, null, 2)}</pre>
                </>
            )}
        </div>
    </div>

    </>
  );
}