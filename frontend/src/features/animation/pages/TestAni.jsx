// TestAni.jsx

import React, { useState } from 'react';
import TableTest from '../components/TableTest';
import './TestAni.css'; 

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

    
    const querySteps = [
        "SELECT * FROM Artist",
        "SELECT * FROM Genre",
        "SELECT * FROM Artist JOIN Genre ON Artist.genre_id = Genre.genre_id",
        "SELECT * FROM Artist JOIN Genre ON Artist.genre_id = Genre.genre_id GROUP BY country",
        "SELECT * FROM Artist JOIN Genre ON Artist.genre_id = Genre.genre_id GROUP BY country ORDER BY Genre.genre_id ASC",
        "SELECT COUNT(artist_id), country, Genre.genre_id FROM Artist JOIN Genre ON Artist.genre_id = Genre.genre_id GROUP BY country ORDER BY Genre.genre_id ASC"
    ];
    
    
// Nested dictionary
const queryResults = {
    "0": {
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
      ],
      "table_name": "Artist"
    },
    "1": {
      "data": [
        {
          "genre_id": 301,
          "genre_name": "Rock"
        },
        {
          "genre_id": 302,
          "genre_name": "Pop"
        },
        {
          "genre_id": 303,
          "genre_name": "Jazz"
        },
        {
          "genre_id": 304,
          "genre_name": "Country"
        },
        {
          "genre_id": 305,
          "genre_name": "Indie"
        },
        {
          "genre_id": 306,
          "genre_name": "Hip Hop"
        },
        {
          "genre_id": 307,
          "genre_name": "Electronic"
        },
        {
          "genre_id": 308,
          "genre_name": "Reggae"
        },
        {
          "genre_id": 309,
          "genre_name": "Classical"
        },
        {
          "genre_id": 310,
          "genre_name": "Salsa"
        },
        {
          "genre_id": 311,
          "genre_name": "Funk"
        },
        {
          "genre_id": 312,
          "genre_name": "Bollywood"
        },
        {
          "genre_id": 313,
          "genre_name": "Soul"
        },
        {
          "genre_id": 314,
          "genre_name": "Gospel"
        }
      ],
      "table_name": "Genre"
    },
    "2": {
      "data": [
        {
          "artist_id": 201,
          "artist_name": "Queen",
          "country": "United Kingdom",
          "genre_id": 301,
          "genre_name": "Rock"
        },
        {
          "artist_id": 202,
          "artist_name": "The Rolling Stones",
          "country": "United Kingdom",
          "genre_id": 301,
          "genre_name": "Rock"
        },
        {
          "artist_id": 203,
          "artist_name": "Taylor Swift",
          "country": "United States",
          "genre_id": 302,
          "genre_name": "Pop"
        },
        {
          "artist_id": 206,
          "artist_name": "Beyoncé",
          "country": "United States",
          "genre_id": 302,
          "genre_name": "Pop"
        },
        {
          "artist_id": 204,
          "artist_name": "Miles Davis",
          "country": "United States",
          "genre_id": 303,
          "genre_name": "Jazz"
        },
        {
          "artist_id": 205,
          "artist_name": "Johnny Cash",
          "country": "United States",
          "genre_id": 304,
          "genre_name": "Country"
        },
        {
          "artist_id": 210,
          "artist_name": "B.B. King",
          "country": "United States",
          "genre_id": 304,
          "genre_name": "Country"
        },
        {
          "artist_id": 207,
          "artist_name": "Arctic Monkeys",
          "country": "United Kingdom",
          "genre_id": 305,
          "genre_name": "Indie"
        },
        {
          "artist_id": 213,
          "artist_name": "Nirvana",
          "country": "United States",
          "genre_id": 305,
          "genre_name": "Indie"
        },
        {
          "artist_id": 208,
          "artist_name": "Eminem",
          "country": "United States",
          "genre_id": 306,
          "genre_name": "Hip Hop"
        },
        {
          "artist_id": 214,
          "artist_name": "Metallica",
          "country": "United States",
          "genre_id": 306,
          "genre_name": "Hip Hop"
        },
        {
          "artist_id": 209,
          "artist_name": "Daft Punk",
          "country": "France",
          "genre_id": 307,
          "genre_name": "Electronic"
        },
        {
          "artist_id": 219,
          "artist_name": "Brian Eno",
          "country": "United Kingdom",
          "genre_id": 307,
          "genre_name": "Electronic"
        },
        {
          "artist_id": 211,
          "artist_name": "Bob Marley",
          "country": "Jamaica",
          "genre_id": 308,
          "genre_name": "Reggae"
        },
        {
          "artist_id": 212,
          "artist_name": "Ludwig van Beethoven",
          "country": "Germany",
          "genre_id": 309,
          "genre_name": "Classical"
        },
        {
          "artist_id": 215,
          "artist_name": "Celia Cruz",
          "country": "Cuba",
          "genre_id": 310,
          "genre_name": "Salsa"
        },
        {
          "artist_id": 216,
          "artist_name": "James Brown",
          "country": "United States",
          "genre_id": 311,
          "genre_name": "Funk"
        },
        {
          "artist_id": 217,
          "artist_name": "A.R. Rahman",
          "country": "India",
          "genre_id": 312,
          "genre_name": "Bollywood"
        },
        {
          "artist_id": 218,
          "artist_name": "Aretha Franklin",
          "country": "United States",
          "genre_id": 313,
          "genre_name": "Soul"
        },
        {
          "artist_id": 220,
          "artist_name": "Mahalia Jackson",
          "country": "United States",
          "genre_id": 314,
          "genre_name": "Gospel"
        }
      ],
      "table_name": "Artist and Genre"
    },
    "3": {
      "data": [
        {
          "artist_id": 215,
          "artist_name": "Celia Cruz",
          "country": "Cuba",
          "genre_id": 310,
          "genre_name": "Salsa"
        },
        {
          "artist_id": 209,
          "artist_name": "Daft Punk",
          "country": "France",
          "genre_id": 307,
          "genre_name": "Electronic"
        },
        {
          "artist_id": 212,
          "artist_name": "Ludwig van Beethoven",
          "country": "Germany",
          "genre_id": 309,
          "genre_name": "Classical"
        },
        {
          "artist_id": 217,
          "artist_name": "A.R. Rahman",
          "country": "India",
          "genre_id": 312,
          "genre_name": "Bollywood"
        },
        {
          "artist_id": 211,
          "artist_name": "Bob Marley",
          "country": "Jamaica",
          "genre_id": 308,
          "genre_name": "Reggae"
        },
        {
          "artist_id": 201,
          "artist_name": "Queen",
          "country": "United Kingdom",
          "genre_id": 301,
          "genre_name": "Rock"
        },
        {
          "artist_id": 203,
          "artist_name": "Taylor Swift",
          "country": "United States",
          "genre_id": 302,
          "genre_name": "Pop"
        }
      ],
      "table_name": "Artist and Genre with applied filter"
    },
    "4": {
      "data": [
        {
          "artist_id": 201,
          "artist_name": "Queen",
          "country": "United Kingdom",
          "genre_id": 301,
          "genre_name": "Rock"
        },
        {
          "artist_id": 203,
          "artist_name": "Taylor Swift",
          "country": "United States",
          "genre_id": 302,
          "genre_name": "Pop"
        },
        {
          "artist_id": 209,
          "artist_name": "Daft Punk",
          "country": "France",
          "genre_id": 307,
          "genre_name": "Electronic"
        },
        {
          "artist_id": 211,
          "artist_name": "Bob Marley",
          "country": "Jamaica",
          "genre_id": 308,
          "genre_name": "Reggae"
        },
        {
          "artist_id": 212,
          "artist_name": "Ludwig van Beethoven",
          "country": "Germany",
          "genre_id": 309,
          "genre_name": "Classical"
        },
        {
          "artist_id": 215,
          "artist_name": "Celia Cruz",
          "country": "Cuba",
          "genre_id": 310,
          "genre_name": "Salsa"
        },
        {
          "artist_id": 217,
          "artist_name": "A.R. Rahman",
          "country": "India",
          "genre_id": 312,
          "genre_name": "Bollywood"
        }
      ],
      "table_name": "Artist and Genre with applied filter"
    },
    "5": {
      "data": [
        {
          "count(artist_id)": 4,
          "country": "United Kingdom",
          "genre_id": 301
        },
        {
          "count(artist_id)": 11,
          "country": "United States",
          "genre_id": 302
        },
        {
          "count(artist_id)": 1,
          "country": "France",
          "genre_id": 307
        },
        {
          "count(artist_id)": 1,
          "country": "Jamaica",
          "genre_id": 308
        },
        {
          "count(artist_id)": 1,
          "country": "Germany",
          "genre_id": 309
        },
        {
          "count(artist_id)": 1,
          "country": "Cuba",
          "genre_id": 310
        },
        {
          "count(artist_id)": 1,
          "country": "India",
          "genre_id": 312
        }
      ],
      "table_name": "Final Result"
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
        <div className="test-ani-container">
            <button onClick={handleAnimateClick} className="animate-button">
                Animate
            </button>
            <div className={`result-container ${isAnimating ? 'animating' : ''}`}>
                {isAnimating && (
                    <>
                        {Object.keys(queryResults).map((key, index, array) => (
                            <React.Fragment key={key}>
                                {/* Container that displays information about the table */}
                                <div className="table-info-container1">
                                    {/* Displaying the query here */}
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
                                    <TableTest
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
    );
};

export default TestAni;