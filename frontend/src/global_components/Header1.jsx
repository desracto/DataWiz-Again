import React from 'react';
import "./Header1.css";

function Header1() {
  return (
    <>
      <div className="Header1container">
          <div className="Datawiz">
            <span className="DatawizTextBold">Data</span>
            <span className="DatawizTextNormal">Wiz.</span>
          </div>
          <div className="ColorBar">
            <div className="Bar1"></div>
            <div className="Bar2"></div>
            <div className="Bar3"></div>
            <div className="Bar4"></div>
            <div className="Bar5"></div>
            <div className="Bar6"></div>
          </div>
      </div>
    </>
  );
}

export default Header1;
