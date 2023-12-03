import React from 'react';


const TableTest = ({ tableName, data, highlightedRows }) => {
  // Calculate total width required for the columns
  const totalColumnWidth = Object.keys(data[0]).length * 150; // Adjust the width as needed

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

  const tableStyle = {
    width: `${totalColumnWidth}px`, // Set the width dynamically
    borderCollapse: 'collapse',
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.05)',
    margin: '0 auto', // Center the table
    opacity: 0, // Initial opacity set to 0 for the fade-in effect
    animation: 'fadeIn 5s forwards', // Animation name, duration, and fill mode
  };  
  const tableTitleStyle = {
    padding: '10px',
    borderRadius: '10px 10px 0 0',
    backgroundColor: '#a280a4',
    fontFamily: 'Gilroy-Bold',
    fontSize: '20px',
    textAlign: 'center',
  };

  const headingStyle = {
    padding: '10px',
    backgroundColor: '#fff4d4',
    fontFamily: 'Gilroy-Bold',
    fontSize: '16px',
  };

  const dataStyle = {
    padding: '8px',
    fontFamily: 'Gilroy-Regular',
    fontSize: '14.5px',
  };

  // Add colors as you wish to highlight the rows for each table
  // Although, I would suggest using a single color for all the tables
  // To maintain consistency
  const colors = {
    0: {
      backgroundColor: '#fdff00',
      color: '#000',
    },
    1: {
      backgroundColor: '#ff9a00',
      color: '#000',
    },
    2: {
      backgroundColor: '#00ff04',
      color: '#000',
    },
    3: {
      backgroundColor: '#00c5ff',
      color: '#000',
    },
    4: {
      backgroundColor: '#ff00a7',
      color: '#fff',
    },
  };

  // Get a random index from the colors object
  const randomIndex = Math.floor(Math.random() * Object.keys(colors).length);
  const randomColor = colors[randomIndex];  
  
    return (
        <div style={{ margin: '20px', textAlign: 'center' }}>
            {/* Include the style tag with keyframes */}
            <style>{fadeInKeyframes}</style>
        <table style={tableStyle}>
            <thead>
            <tr>
                <th colSpan={Object.keys(data[0]).length} style={tableTitleStyle}>
                {tableName}
                </th>
            </tr>
            <tr>
                {Object.keys(data[0]).map((key) => (
                <th key={key} style={headingStyle}>
                    {key}
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, rowIndex) => (
                <tr
                key={rowIndex}
                style={
                    typeof highlightedRows[0] === 'object'
                    ? highlightedRows.some((highlight) => highlight.prevRowIndex === rowIndex)
                        ? {
                            ...randomColor,
                        }
                        : { backgroundColor: '#ece0e9' }
                    : { backgroundColor: '#ece0e9' }
                }
                >
                {Object.values(item).map((value, colIndex) => (
                    <td
                    key={colIndex}
                    style={{
                        ...dataStyle,
                        ...(typeof highlightedRows[0] === 'string'
                        ? highlightedRows.includes(Object.keys(data[0])[colIndex].toLowerCase())
                            ? randomColor
                            : {}
                        : {}),
                    }}
                    >
                    {value}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default TableTest;
