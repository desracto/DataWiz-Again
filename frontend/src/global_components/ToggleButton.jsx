import React from "react";
<<<<<<< HEAD
=======
import "./ToggleButton.css"
>>>>>>> df9ddbd419293d4dee0d7e918a47943705f2bf8e

const ToggleSwitch = ({ label, onChange, checked, unique_by }) => {
  return (
    <div className="label container wrapper">
      {label}{" "}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={label}
          id={unique_by}
          onChange={onChange}
          checked={checked}
        />
        <label className="outer_switch" htmlFor={unique_by}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
