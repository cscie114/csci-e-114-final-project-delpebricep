import React, { useState, useEffect, useMemo } from 'react';



const TitleView = ({ quiz, setCurrentView }) => {
    const { name, description, difficulty, length } = quiz;


    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Total Questions: {length}</p>
            <button onClick={() => setCurrentView('play')}>Play</button>
            <button onClick={() => setCurrentView('high-scores')}>High Scores</button>
        </div>
    )
};


export default TitleView;