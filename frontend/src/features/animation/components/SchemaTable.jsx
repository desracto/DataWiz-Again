import React from 'react';
import './SchemaTable.css';

// Define the SchemaTable component
const SchemaTable = ({ schemaData, schemaIdToProperty, selectedSchemaId }) => {
  // Log schemaData for debugging purposes
  console.log('schemaData:', schemaData);

  // Function to get table names based on schemaId
  const getTableNames = (schemaId) => {
    // Check if schemaIdToProperty has a corresponding entry for the given schemaId
    if (!schemaIdToProperty[schemaId]) {
      return []; // Handle the case when schemaId is undefined
    }
    // Retrieve the tables and format their names
    const tables = schemaIdToProperty[schemaId];
    return Array.isArray(tables) ? tables.map(tableName => tableName.charAt(0).toUpperCase() + tableName.slice(1)) : [tables.charAt(0).toUpperCase() + tables.slice(1)];
  };

  // Render the component
  return (
    <div className="table-container">
      {/* Check if schemaData is available */}
      {schemaData ? (
        <div>
          {/* Map through each table in schemaData */}
          {schemaData.map((tableData, index) => (
            <div key={index} className="table-wrapper"> 
              {/* Render each table */}
              <table className="table">
                {/* Table Name Row */}
                <thead>
                  <tr>
                    {/* Set the table name in the table header */}
                    <th colSpan={Object.keys(tableData[0]).length} className="table-name-row">
                      {getTableNames(selectedSchemaId)[index]}
                    </th>
                  </tr>
                </thead>
                {/* Table Header */}
                <thead>
                  <tr className="table-header-row">
                    {/* Map through each header in the table */}
                    {Object.keys(tableData[0]).map((header, idx) => (
                      <th key={idx}>{header}</th>
                    ))}
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {/* Map through each row in the table */}
                  {tableData.map((row, idx) => (
                    <tr key={idx}>
                      {/* Map through each cell in the row */}
                      {Object.values(row).map((cell, cellIdx) => (
                        <td key={cellIdx}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        // Display a message when no schema data is available
        <div>No schema data available.</div>
      )}
    </div>
  );
};

export default SchemaTable;
