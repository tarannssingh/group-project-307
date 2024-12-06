import React, { useState } from "react";
import eyeIcon from "../../assets/eye.png";

const pswInput = ({ id, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVis = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type={isVisible ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        style={{ marginRight: "8px" }}
      />
      <button
        type="button"
        onClick={toggleVis}
        aria-label={isVisible ? "Hide Password" : "Show Password"}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          padding: "0",
        }}
      >
        <img
          src={eyeIcon}
          alt={isVisible ? "Hide Password" : "Show Password"}
          style={{ width: "20px", height: "20px" }}
        />
      </button>
    </div>
  );
};

export default pswInput;
