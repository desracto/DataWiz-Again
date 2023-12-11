import React from 'react';

// QueryTable component receives tableName, data, and highlightedRows as props
const QueryTable = ({ tableName, data, highlightedRows }) => {
  // Calculate total width required for the columns
  const totalColumnWidth = Object.keys(data[0]).length * 150; // Adjust the width as needed

  // Define the @keyframes directly within the component for the fade-in effect
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

  // Inline styles for the table
  const tableStyle = {
    width: `${totalColumnWidth}px`, // Set the width dynamically
    borderCollapse: 'collapse',
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.05)',
    margin: '0 auto', // Center the table
    opacity: 0, // Initial opacity set to 0 for the fade-in effect
    animation: 'fadeIn 5s forwards', // Animation name, duration, and fill mode
  };

  // Inline styles for the table title
  const tableTitleStyle = {
    padding: '10px',
    borderRadius: '10px 10px 0 0',
    backgroundColor: '#a280a4',
    fontFamily: 'Gilroy-Bold',
    fontSize: '20px',
    textAlign: 'center',
  };

  // Inline styles for table headings
  const headingStyle = {
    padding: '10px',
    backgroundColor: '#fff4d4',
    fontFamily: 'Gilroy-Bold',
    fontSize: '16px',
  };

  // Inline styles for table data cells
  const dataStyle = {
    padding: '8px',
    fontFamily: 'Gilroy-Regular',
    fontSize: '14.5px',
  };

  // Object defining colors for highlighted rows
  const colors = {
    0: {
      backgroundColor: '#ffea6a',
      color: '#000',
    },
    1: {
      backgroundColor: '#ffea6a',
      color: '#000',
    },
  };

  // Get a random index from the colors object
  const randomIndex = Math.floor(Math.random() * Object.keys(colors).length);
  const randomColor = colors[randomIndex];

  // Render the table component
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      {/* Include the style tag with keyframes */}
      <style>{fadeInKeyframes}</style>

      {/* Render the table */}
      <table style={tableStyle}>
        <thead>
          {/* Table title row */}
          <tr>
            <th colSpan={Object.keys(data[0]).length} style={tableTitleStyle}>
              {tableName}
            </th>
          </tr>
          {/* Table header row */}
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} style={headingStyle}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Map through the data and render rows */}
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
              {/* Map through values and render cells */}
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

export default QueryTable;
