import React from 'react';
import LoadingGif from '../assets/loading.gif';
import './Loading.css';
    
function Loading() {
  return (
    <div className="loader-container">
      <img src={LoadingGif} alt='Loading..'/>
    </div>
  );
}

export default Loading;
