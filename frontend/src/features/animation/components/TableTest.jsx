// TableTest.jsx
import React from 'react';

const TableTest = ({ tableName, data }) => {
  const tableTitleStyle = {
    border: 'none',
    padding: '8px',
    backgroundColor: '#a280a4', 
    fontFamily: 'Gilroy-Bold',
    fontSize: '20px', 
    textAlign: 'center',
  };

  const headingStyle = {
    border: '2px solid black',
    padding: '8px',
    backgroundColor: '#fff4d4',
    fontFamily: 'Gilroy-Bold',
    fontSize: '16px',
  };

  const dataStyle = {
    border: '1.5px solid black',
    padding: '8px',
    backgroundColor: '#ece0e9',
    fontFamily: 'Gilroy-Regular',
    fontSize: '14.5px',
  };

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, index) => (
                <td key={index} style={dataStyle}>
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
