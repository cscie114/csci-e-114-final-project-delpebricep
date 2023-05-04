import React, { useState, useEffect, useMemo } from 'react';



const TitleView = ({ quiz, setCurrentPage }) => {
    const { name, description, difficulty, length } = quiz;


    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Total Questions: {length}</p>
            <button onClick={() => setCurrentPage('play')}>Play</button>
        </div>
    )
};


export default TitleView;