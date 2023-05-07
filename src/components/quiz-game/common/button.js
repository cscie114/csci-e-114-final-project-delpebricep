import React from 'react';

import * as styles from "./button.module.css";


// A custom button component.
// It takes a list of additional CSS classes to apply to it, among other things.
const Button = ({ children, onClick, classes=[], color, height, disabled }) => {
    
    // Merge the classes into a single string.
    const classString = [
        styles.button,
        ...classes
    ].join(" ");
    
    // Render the button.
    return (
        <button 
            className={classString}
            onClick={onClick}
            style={{
                backgroundColor: color,
                height
            }}
            disabled={disabled}
        >
            {children}
        </button>
    );
};


export default Button;