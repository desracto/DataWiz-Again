// TestDisplay.js
import React, { useState } from 'react';
import axios from "axios";
import './TestDisplay.css'; // Import your CSS file here

const TestDisplay = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRunQuery = async () => {
    try {
      // Send the query to the backend using Axios
      const response = await axios.post('http://localhost:5000/api/run-query', {
        query: query,
      });

      // Set the result in the state
      setResult(response.data);
    } catch (error) {
      console.error('Error while running the query:', error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="app-container">
      <textarea
        className="query-input"
        placeholder="Enter your SQL query here..."
        value={query}
        onChange={handleQueryChange}
      ></textarea>
      <button className="run-query-btn" onClick={handleRunQuery}>
        Run Query
      </button>
      {result && (
        <div className="result-box">
          <p className="result-text">{result}</p>
        </div>
      )}
    </div>
  );
};

export default TestDisplay;