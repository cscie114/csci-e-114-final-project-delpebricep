import React, { useState, useEffect, useMemo } from 'react';

const HighScoreView = ({ quiz, setCurrentView }) => {

    const { quizId } = quiz;

    useEffect(() => {
        getScoreData();
    }, []);

    const [scores, setScores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getScoreData() {

        setIsLoading(true);

        try {
            const response = await fetch(`/.netlify/functions/quiz-scores?quizId=${quizId}`, { method: "GET" });
            const data = await response.json();
            setScores(data);
        } catch (error) {
            console.log("Could not fetch scores. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }


    const scoreList = scores.map((item, i) => {
        return <p key={i}>{item.name} | {item.score}</p>;
    });


    return (
        <div>
            <h4>High Scores</h4>
            {scoreList}
            <button onClick={() => setCurrentView('title')}>Back to Title</button>
        </div>
    );
};


export default HighScoreView;