
import React from 'react';
import './SchemaTable.css';

const SchemaTable = ({ schemaData }) => {
  console.log('schemaData:', schemaData);
  return (
    <div className="table-container">
      {schemaData ? (
        <div>
          {schemaData.map((tableData, index) => (
            <div key={index} className="table-wrapper"> 
              <h3>Table {index + 1}</h3>
              <table className="table">
                {/* Table Header */}
                <thead>
                  <tr>
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
