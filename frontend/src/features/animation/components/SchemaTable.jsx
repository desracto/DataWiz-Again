// SchemaTable.jsx
import React from 'react';
import './SchemaTable.css';

const SchemaTable = ({ schemaData, schemaIdToProperty, selectedSchemaId }) => {
  console.log('schemaData:', schemaData);

  const getTableNames = (schemaId) => {
    if (!schemaIdToProperty[schemaId]) {
      return []; // Handle the case when schemaId is undefined
    }
    const tables = schemaIdToProperty[schemaId];
    return Array.isArray(tables) ? tables.map(tableName => tableName.charAt(0).toUpperCase() + tableName.slice(1)) : [tables.charAt(0).toUpperCase() + tables.slice(1)];
  };
  

  return (
    <div className="table-container">
      {schemaData ? (
        <div>
          {schemaData.map((tableData, index) => (
            <div key={index} className="table-wrapper"> 
              <table className="table">
                {/* Table Name Row */}
                <thead>
                  <tr>
                    <th colSpan={Object.keys(tableData[0]).length} className="table-name-row">
                      {getTableNames(selectedSchemaId)[index]}
                    </th>
                  </tr>
                </thead>
                {/* Table Header */}
                <thead>
                  <tr className="table-header-row">
                    {Object.keys(tableData[0]).map((header, idx) => (
                      <th key={idx}>{header}</th>
                    ))}
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx}>
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
        <div>No schema data available.</div>
      )}
    </div>
  );
};

export default SchemaTable;
