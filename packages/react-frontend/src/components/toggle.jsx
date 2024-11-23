import React, { useState } from "react";

const pswInput = ({id, placeholder}) => {
    const [isVisble, setIsVisible] = useState(false);
    const toggleVis = () => {
        setIsVisible((prev) => !prev)
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
                onClick={toggleVisibility}
                aria-label={isVisible ? altTextHide : altTextShow}
                style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: "0",
                }}
            >
                <img
                    src={isVisible ? hideIcon : showIcon}
                    alt={isVisible ? altTextHide : altTextShow}
                    style={{ width: "20px", height: "20px" }}
                />
            </button>
        </div>
    );
}

export default pswInput;