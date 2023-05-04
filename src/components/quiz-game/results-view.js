import React, { useState, useEffect, useMemo } from 'react';
import useSound from 'use-sound';

import JSConfetti from 'js-confetti';


const ResultsView = ({ quiz, score, setCurrentPage }) => {
    useEffect(() => {
        

        const jsConfetti = new JSConfetti();

        jsConfetti.addConfetti({
            confettiRadius: 8,
            confettiNumber: 200,
        });

        return () => {
            jsConfetti.clearCanvas();
        };
    });

    const { name, questions, length } = quiz;


    return (
        <div>
            <p>FINAL SCORE: {score}</p>
            <button onClick={() => setCurrentPage('play')}>Play Again</button>
            <button onClick={() => setCurrentPage('title')}>Quit</button>
        </div>
    )
};


export default ResultsView;