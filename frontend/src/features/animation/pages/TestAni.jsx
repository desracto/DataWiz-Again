// TestAni.jsx

import React, { useState } from 'react';
import TableTest from '../components/TableTest';

const TestAni = () => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnimateClick = () => {
        setIsAnimating(true);
        // Add your animation logic here if needed
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

    
    const queries = [
        "select * FROM Artist",
        "select * FROM Artist WHERE country = 'United Kingdom'",
        "select * FROM Artist WHERE country = 'United Kingdom' AND genre_id = 302",
        "select * FROM Artist WHERE country = 'United Kingdom' AND genre_id = 302 OR genre_id = 301",
        "select artist_id, artist_name FROM Artist WHERE country = 'United Kingdom' AND genre_id = 302 OR genre_id = 301"
    ];
    
// Nested dictionary
const results = {
    0: {
        "table_name": "Artist",
        "data": [
            {
                "artist_id": 201,
                "artist_name": "Queen",
                "country": "United Kingdom",
                "genre_id": 301
            },
            {
                "artist_id": 202,
                "artist_name": "The Rolling Stones",
                "country": "United Kingdom",
                "genre_id": 301
            },
            {
                "artist_id": 203,
                "artist_name": "Taylor Swift",
                "country": "United States",
                "genre_id": 302
            },
            {
                "artist_id": 204,
                "artist_name": "Miles Davis",
                "country": "United States",
                "genre_id": 303
            },
            {
                "artist_id": 205,
                "artist_name": "Johnny Cash",
                "country": "United States",
                "genre_id": 304
            },
            {
                "artist_id": 206,
                "artist_name": "Beyoncé",
                "country": "United States",
                "genre_id": 302
            },
            {
                "artist_id": 207,
                "artist_name": "Arctic Monkeys",
                "country": "United Kingdom",
                "genre_id": 305
            },
            {
                "artist_id": 208,
                "artist_name": "Eminem",
                "country": "United States",
                "genre_id": 306
            },
            {
                "artist_id": 209,
                "artist_name": "Daft Punk",
                "country": "France",
                "genre_id": 307
            },
            {
                "artist_id": 210,
                "artist_name": "B.B. King",
                "country": "United States",
                "genre_id": 304
            },
            {
                "artist_id": 211,
                "artist_name": "Bob Marley",
                "country": "Jamaica",
                "genre_id": 308
            },
            {
                "artist_id": 212,
                "artist_name": "Ludwig van Beethoven",
                "country": "Germany",
                "genre_id": 309
            },
            {
                "artist_id": 213,
                "artist_name": "Nirvana",
                "country": "United States",
                "genre_id": 305
            },
            {
                "artist_id": 214,
                "artist_name": "Metallica",
                "country": "United States",
                "genre_id": 306
            },
            {
                "artist_id": 215,
                "artist_name": "Celia Cruz",
                "country": "Cuba",
                "genre_id": 310
            },
            {
                "artist_id": 216,
                "artist_name": "James Brown",
                "country": "United States",
                "genre_id": 311
            },
            {
                "artist_id": 217,
                "artist_name": "A.R. Rahman",
                "country": "India",
                "genre_id": 312
            },
            {
                "artist_id": 218,
                "artist_name": "Aretha Franklin",
                "country": "United States",
                "genre_id": 313
            },
            {
                "artist_id": 219,
                "artist_name": "Brian Eno",
                "country": "United Kingdom",
                "genre_id": 307
            },
            {
                "artist_id": 220,
                "artist_name": "Mahalia Jackson",
                "country": "United States",
                "genre_id": 314
            }
        ]
    },
    1: {
        "table_name": "Artist",
        "data": [
            {
                "artist_id": 201,
                "artist_name": "Queen",
                "country": "United Kingdom",
                "genre_id": 301
            },
            {
                "artist_id": 202,
                "artist_name": "The Rolling Stones",
                "country": "United Kingdom",
                "genre_id": 301
            },
            {
                "artist_id": 207,
                "artist_name": "Arctic Monkeys",
                "country": "United Kingdom",
                "genre_id": 305
            },
            {
                "artist_id": 219,
                "artist_name": "Brian Eno",
                "country": "United Kingdom",
                "genre_id": 307
            }
        ]
    },
    2: {
        "table_name": "Artist",
        "data": []
    },
    3: {
        "table_name": "Artist",
        "data": [
            {
                "artist_id": 201,
                "artist_name": "Queen",
                "country": "United Kingdom",
                "genre_id": 301
            },
            {
                "artist_id": 202,
                "artist_name": "The Rolling Stones",
                "country": "United Kingdom",
                "genre_id": 301
            }
        ]
    },
    4: {
        "table_name": "Artist",
        "data": [
            {"artist_id": 201, "artist_name": "Queen"},
            {"artist_id": 202, "artist_name": "The Rolling Stones"}
        ]
    }
};

    // Define the @keyframes directly within the component
    const fadeInKeyframes = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={handleAnimateClick} style={{ padding: '10px', fontSize: '16px', margin: '10px' }}>
                Animate
            </button>
            <div
                style={{
                    width: '1000px',
                    height: '1000px',
                    backgroundColor: isAnimating ? '#f2f2f2' : 'transparent', // Initial background color
                    borderRadius: '10px',
                    margin: '10px',
                    overflow: 'auto',
                    transition: 'background-color 1s ease-in-out',
                }}
            >
                {isAnimating && (
                    <>
                        {Object.keys(results).map((key, index, array) => (
                            <React.Fragment key={key}>
                                {/* Container that displays information about the table */}
                                <div
                                    style={{
                                        textAlign: 'left',
                                        backgroundColor: '#D4C1CE',
                                        padding: '15px',
                                        margin: '20px',
                                        borderRadius: '15px',
                                        boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.05)',
                                        animation: 'fadeIn 5s forwards'
                                    }}
                                >
                                    {/* Displaying the query here */}
                                    <p style={{ fontSize: '16px', fontWeight: '400', margin: '10px' }}>
                                        <b>Query {index + 1}: &nbsp;</b>
                                        {queries[index]}
                                    </p>
                                    {/* Displaying The queries passed to the next table */}
                                    <p style={{ fontSize: '16px', fontWeight: '400', margin: '10px' }}>
                                        <b>Descriptiomn: &nbsp;</b>
                                        {index === array.length - 1
                                            ? 'This is the result table.'
                                            : results[key].data.length === 0
                                                ? 'No result for this query.'
                                                : typeof highlightMatchingRows(results[key].data, results[array[index + 1]]?.data || [], queries[index + 1] || '')[0] === 'string'
                                                    ? `${highlightMatchingRows(results[key].data, results[array[index + 1]]?.data || [], queries[index + 1] || '').length} columns are being used in the next query.`
                                                    : highlightMatchingRows(results[key].data, results[array[index + 1]]?.data || [], queries[index + 1] || '').length === results[key].data.length
                                                        ? 'All rows are being used in the next query.'
                                                        : highlightMatchingRows(results[key].data, results[array[index + 1]]?.data || [], queries[index + 1] || '').length === 0
                                                            ? 'No rows are being used in the next query.'
                                                            : `${highlightMatchingRows(results[key].data, results[array[index + 1]]?.data || [], queries[index + 1] || '').length} rows are being used in the next query.`
                                    }
                                    </p>
                                </div>
                                {/* Displaying the table or the "No result for this query" message */}
                                {results[key].data.length > 0 ? (
                                    <TableTest
                                        tableName={results[key].table_name}
                                        data={results[key].data}
                                        // Sending what rows to highlight to the component
                                        highlightedRows={highlightMatchingRows(
                                            results[key].data,
                                            results[array[index + 1]]?.data || [],
                                            queries[index + 1] || ''
                                        )}
                                    />
                                ) : (
                                    <p style={{ fontSize: '16px', fontWeight: '400', margin: '10px', textAlign: 'center' }}>
                                        {/* No result for this query. */}
                                    </p>
                                )}
                                {index < array.length - 1 && (
                                    <div style={{ textAlign: 'center', margin: '35px', fontSize: '50px', animation: 'fadeIn 5s forwards' }}>
                                        <span>&#8595;</span>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}

                    </>
                )}
            </div>
            {/* Include the style tag with keyframes */}
            <style>{fadeInKeyframes}</style>
        </div>
    );
};

export default TestAni;                                                                                                                    