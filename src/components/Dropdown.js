import React, { useState, useEffect, useRef } from "react";
import { useOutsideClick } from "rooks";

const Dropdown = ({ values, onValueChanged }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState();

  const ref = useRef();
  useOutsideClick(ref, () => setIsOpen(false));

  const handleValueChange = value => {
    setSelectedSite(value);
    onValueChanged(value);
  }

  useEffect(() => {
    if (values) {
      handleValueChange(values[0])
    }

  }, [values])

  return (
    <div>
      <div ref={ref} className="ui form">
        <div className="field">
          <label className="label">Select Site</label>
          <div className="drop-down"
            onClick={() => setIsOpen(!isOpen)}
            className={`ui selection dropdown ${
              isOpen ? "visible active" : ""
            }`}
          >
            <i className="dropdown icon"></i>
            <div className="text">{selectedSite}</div>
            <div className={`menu ${isOpen ? "visible transition" : ""}`}>
              {values &&
                values.map((v) => (
                  <div
                    className="item"
                    onClick={() => {
                      handleValueChange(v)
                    }}
                  >
                    {v}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
