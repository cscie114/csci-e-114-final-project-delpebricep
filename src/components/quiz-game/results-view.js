import React, { useState, useEffect, useMemo } from 'react';

import JSConfetti from 'js-confetti';


const ResultsView = ({ quiz, score, setCurrentView }) => {
    const { quizId, name, length } = quiz;

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


    async function handleSubmit(event) {
        // Prevent the browser from reloading the page
        event.preventDefault();

        // Read the form data
        const form = event.target;
        const formData = new FormData(form);
        formData.set("quizId", quizId);
        formData.set("score", score);

        const data = JSON.stringify(Object.fromEntries(formData));
        console.log(formData.get('quizId'));

        await fetch("http://localhost:8888/.netlify/functions/quiz-post-score", { 
            method: "POST", 
            // body: new URLSearchParams(formData),
            body: data,
            headers: { "Content-Type": "application/json" }
        });

    }

    return (
        <div>
            <p>{name}</p>
            <p>FINAL SCORE: {score}</p>

            <div>
                <h4>Submit Your Score</h4>
                <div>
                    <form method="post" onSubmit={handleSubmit}>
                        <label>
                            Your Name:
                            <input type="text" name="name" />
                        </label>
                        <button type="submit">Submit</button>
                    </form>

                </div>
            </div>
            <button onClick={() => setCurrentView('play')}>Play Again</button>
            <button onClick={() => setCurrentView('high-scores')}>High Scores</button>
            <button onClick={() => setCurrentView('title')}>Quit</button>
        </div>
    );
};


export default ResultsView;