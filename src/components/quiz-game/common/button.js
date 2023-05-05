import React from 'react';

import * as styles from "./button.module.css";


const Button = ({ children, onClick, color }) => {
    return (
        <button 
            className={styles.button}
            onClick={onClick}
            style={{
                backgroundColor: color
            }}
        >
            {children}
        </button>
    )
};


export default Button;