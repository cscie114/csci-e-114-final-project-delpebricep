import React, { useState, useEffect, useMemo } from 'react';

const HighScoreView = ({ quiz, setCurrentView }) => {

    const { quizId } = quiz;

    useEffect(() => {
        getScoreData();
    }, []);

    const [scores, setScores] = useState([]);

    async function getScoreData() {
        const response = await fetch(`/.netlify/functions/quiz-get-scores?quizId=${quizId}`);
        const data = await response.json();

        setScores(data);
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