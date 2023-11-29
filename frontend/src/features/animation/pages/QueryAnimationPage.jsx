import React, { useState } from 'react';
import SecondHeader from '../../../global_components/SecondHeader';
import SchemaTable from '../components/SchemaTable';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 
import "./QueryAnimationPage.css";
 
// Image IMports
import svgImage from '../../../assets/images/vector-31.svg'; 
import svgImage2 from '../../../assets/images/blob-haikei.svg'; 


export default function SchemaSelectionPage() {

    const location = useLocation();
    const selectedSchema = location.state.schemaData;
    // console.log(location.state.schemaData);
    const [query, setQuery] = useState('');

    const handleAnimateQuery = async () => {
      try {
        const response = await axios.post('/animate/', { query }); //this wrong in think
        console.log(response); // Log the response bozo
  
        // Axios automatically throws an error for non-2xx responses (what?)
        const result = response.data;
        // Handle the result as needed, e.g., update state or display the animation steps
        console.log(result);
      } catch (error) {
        console.error('Error animating query:', error.message);
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
            <div className="AnimationNameContainer">
                <div className="AnimationNameLabel">Enter Animation Name:</div>
                <div className="AnimationNameTextbox">
                    <div className="AnimationNamePlaceholder">Animation 1</div>
                </div>
            </div>

            <button className='ReturnSchemaSelectionButton'>
                    Schema Selection
            </button>

            <div className='button-container2' >
                <button className='SchemaButton'>
                    SCHEMA
                </button>
            </div>

            <div className='SelectedSchemaCard'>
                <SchemaTable schemaData ={selectedSchema}/>
            </div>

            <div className="QueryContainer">
                <div className="QueryTextbox">
                    <textarea
                        className="QueryPlaceholder"
                        placeholder="Enter Query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
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

        </div>
    </div>

    </>
  );
}