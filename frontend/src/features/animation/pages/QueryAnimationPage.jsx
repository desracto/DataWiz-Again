import React, { useState, useCallback } from 'react';
import SecondHeader from '../../../global_components/SecondHeader';
import SchemaTable from '../components/SchemaTable';
import { useLocation, useNavigate } from 'react-router-dom';

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
        // try {
        //     const response = await axios.post('http://localhost:5000/api/animation/animate/', { query }); 
        //     console.log(response); 
        //     // Axios automatically throws an error for non-2xx responses (what?)
        //     const result = response.data;
        //     // Handle the result as needed, e.g., update state or display the animation steps
        //     console.log(result);
        // } catch (error) {
        //     console.error('Error animating query:', error.message);
        // }

        // Code from Ejax for testing
        const request = axios.create({
            baseURL: "http://localhost:5000",
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials: true,
            timeout: 300000
        })

        request({
            url: 'api/animation/animate',
            method: 'post',
            data: query})
        .then(response => {
            console.log(response.data)})
        .catch(error => {
            console.log(error)})    };

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

        </div>
    </div>

    </>
  );
}