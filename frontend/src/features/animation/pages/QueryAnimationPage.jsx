import React, { useState, useCallback } from 'react';
import SecondHeader from '../../../global_components/SecondHeader';
import SchemaTable from '../components/SchemaTable';
import QueryTable from '../components/QueryTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { schemaIdToProperty } from './SchemaSelectionPage';
import axios from 'axios';
import "./QueryAnimationPage.css";
import Footer from '../../../global_components/Footer';

// Import SVG images 
import svgImage from '../../../assets/images/vector-31.svg';
import svgImage2 from '../../../assets/images/blob-haikei.svg';

// Create an Axios instance for making API requests
const request = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    timeout: 300000
});

// Define the QueryAnimationPage functional component
const QueryAnimationPage = () => {
    // Hooks for managing state and routing
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [queryResults, setQueryResults] = useState(null);
    const [querySteps, setQuerySteps] = useState(null);
    const navigate = useNavigate();

    // State variables to track query execution and data availability
    const [queryExecuted, setQueryExecuted] = useState(false);

    // Callback function to navigate back to the SchemaSelectionPage
    const returnToSchemaSelection = useCallback(() => {
        navigate("/SchemaSelectionPage");
    }, [navigate]);

    // Extract selected schema and schemaId from location.state
    const selectedSchema = location.state ? location.state.selectedSchema : null;
    const schemaId = location.state ? location.state.schemaId : null;

    // Event handler for handling the Enter key in the query input
    const handleEnterKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setQuery((prevQuery) => prevQuery + "\n");
        }
    };

    // Function to handle the animation of the entered SQL query
    const handleAnimateQuery = async () => {
        const trimmedQuery = query.trim();

        // Check for prohibited SQL statements
        if (/drop|delete/i.test(query)) {
            window.alert("DROP and DELETE statements are not allowed.");
            return;
        }

        // Check for multiple query terminators
        if ((query.match(/;/g) || []).length > 1) {
            window.alert("Batch queries are not allowed.");
            return;
        }

        // Make an API request to animate the SQL query
        try {
            const response = await request.post('/api/animation/animate/', { query });
            const data = response.data;

            // Update state variables based on data availability
            setQueryResults(data.results);
            setQuerySteps(data.steps);
            setQueryExecuted(true);

        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // Function to find matching rows between two tables
    const highlightMatchingRows = (prevTableData, nextTableData, query) => {
        const highlightedRows = [];

        // get the index of the first occurrence of SELECT in the query
        const selectIndex = query.toUpperCase().indexOf('SELECT');

        // check if there is a * after the index of SELECT
        const selectAll = query.charAt(selectIndex + 7) === '*';

        if (selectAll) {
            // If the query has SELECT * in it, then highlight rows for rows that match in the next table
            prevTableData.forEach((prevRow, prevRowIndex) => {
                const matchingRows = nextTableData.filter((nextRow) => {
                    const commonColumns = Object.keys(prevRow).filter((column) =>
                        Object.keys(nextRow).includes(column)
                    );

                    return commonColumns.every((column) => prevRow[column] === nextRow[column]);
                });

                if (matchingRows.length > 0) {
                    highlightedRows.push({
                        prevRowIndex,
                        matchingRows,
                    });
                }
            });
        } else {
            // Check if nextTableData is not empty
            if (nextTableData.length > 0) {
                // get the columns that are matching in both the tables without the help of the query
                const commonColumns = Object.keys(prevTableData[0]).filter((column) =>
                    Object.keys(nextTableData[0]).includes(column)
                );

                if (commonColumns.length > 0) {
                    highlightedRows.push(...commonColumns);
                }
            }
        }

        return highlightedRows;
    };

    return (
        <>
            <SecondHeader />
            <div className="SVG-CONTAINER">
                <img src={svgImage} alt="SVG Background" className="svg-background" />
                <img src={svgImage2} alt="SVG Background" className="svg-background1" />
                <img src={svgImage} alt="SVG Background" className="svg-background2" />
                <img src={svgImage2} alt="SVG Background" className="svg-background3" />
                <img src={svgImage} alt="SVG Background" className="svg-background4" />
            </div>

            {/* Main Query Animation Container */}
            <div className="QueryAnimationContainer">
                <div className="QueryAnimationTitle">
                    Query Animation
                </div>
                <div className="QueryAnimationText">
                    Unlock the power of SQL with DataWiz's mesmerizing query animations, revealing the steps of database queries in a whole new light.
                </div>
                {/* Query Input Card */}
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
                    {/* Return to Schema Selection Button */}
                    <div className='button-container1'>
                        <button className='ReturnSchemaSelectionButton' onClick={returnToSchemaSelection}>
                            Schema Selection
                        </button>
                    </div>
                    {/* Schema Button */}
                    <div className='button-container2'>
                        <button className='SchemaButton'>
                            SCHEMA
                        </button>
                    </div>
                    {/* Selected Schema Display Card */}
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
                    {/* Query Container */}
                    <div className="QueryContainer">
                        <textarea
                            className="QueryPlaceholder"
                            type="text"
                            placeholder="Enter Query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => handleEnterKey(e)}
                        />
                        {/* Animate Query Button */}
                        <button className='AnimateQueryButton' onClick={handleAnimateQuery}>
                            ANIMATE QUERY
                        </button>
                    </div>
                </div>
                {/* Down and Save Button Container */}
                <div className='DownAndSaveButtonContainer'>
                    <button className='SaveAniButton'>
                        SAVE ANIMATION
                    </button>
                    <button className='DownPDFButton'>
                        DOWNLOAD PDF
                    </button>
                </div>
                {/* Query Steps Display Card */}
                <div className='QueryStepsDisplayCard'>
                    {/* Display steps_results if available */}
                    {queryExecuted && querySteps !== null && (
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
                {/* Visualization Display Card */}
                <div className='VisualizationDisplayCard'>
                    {queryExecuted && querySteps !== null && (
                        <>
                            {Object.keys(queryResults).map((key, index, array) => (
                                <React.Fragment key={key}>
                                    {/* Container for displaying information about the query step */}
                                    <div className="table-info-container">
                                        {/* Display the query step index and description */}
                                        <p className="query-description">
                                            <b>Query {index + 1}: &nbsp;</b>
                                            {querySteps[index]}
                                        </p>
                                        {/* Displaying The queries passed to the next table */}
                                        <p className="query-description">
                                            <b>Descriptiomn: &nbsp;</b>
                                            {index === array.length - 1
                                                ? 'This is the result table.'
                                                : queryResults[key].data.length === 0
                                                    ? 'No result for this query.'
                                                    : typeof highlightMatchingRows(queryResults[key].data, queryResults[array[index + 1]]?.data || [], querySteps[index + 1] || '')[0] === 'string'
                                                        ? `${highlightMatchingRows(queryResults[key].data, queryResults[array[index + 1]]?.data || [], querySteps[index + 1] || '').length} columns are being used in the next query.`
                                                        : highlightMatchingRows(queryResults[key].data, queryResults[array[index + 1]]?.data || [], querySteps[index + 1] || '').length === queryResults[key].data.length
                                                            ? 'All rows are being used in the next query.'
                                                            : highlightMatchingRows(queryResults[key].data, queryResults[array[index + 1]]?.data || [], querySteps[index + 1] || '').length === 0
                                                                ? 'No rows are being used in the next query.'
                                                                : `${highlightMatchingRows(queryResults[key].data, queryResults[array[index + 1]]?.data || [], querySteps[index + 1] || '').length} rows are being used in the next query.`
                                            }
                                        </p>
                                    </div>
                                    {/* Displaying the table or the "No result for this query" message */}
                                    {queryResults[key].data.length > 0 ? (
                                        <QueryTable
                                            tableName={queryResults[key].table_name}
                                            data={queryResults[key].data}
                                            highlightedRows={highlightMatchingRows(
                                                queryResults[key].data,
                                                queryResults[array[index + 1]]?.data || [],
                                                querySteps[index + 1] || ''
                                            )}
                                        />
                                    ) : (
                                        <p className="no-result-message">
                                            {/* No result for this query. */}
                                        </p>
                                    )}
                                    {index < array.length - 1 && (
                                        <div className="arrow-indicator">
                                            <span>&#8595;</span>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default QueryAnimationPage;