import React from 'react';

const QueryTable = ({ tableName, data }) => {
  const totalColumnWidth = Object.keys(data[0]).length * 150;

  const tableStyle = {
    width: `${totalColumnWidth}px`,
    borderCollapse: 'collapse',
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.05)',
    margin: '0 auto',
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

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
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
            <tr key={rowIndex}>
              {Object.values(item).map((value, colIndex) => (
                <td key={colIndex} style={dataStyle}>
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
