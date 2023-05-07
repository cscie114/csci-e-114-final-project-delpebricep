/*
    LEADERBOARD VIEW COMPONENT
    This component represents the quiz game's leaderboard, a list of scores people submitted.
*/


import React, { useState, useEffect, useCallback } from 'react';
import Button from '../common/button';

import * as styles from "./leaderboard-view.module.css";


const STATE_LOADING = 0;
const STATE_DISPLAY = 1;
const STATE_ERROR = 2;

const LeaderboardView = ({ quiz, setCurrentView }) => {
    const { quizId, name } = quiz;

    const [scores, setScores] = useState([]);
    const [state, setState] = useState(STATE_LOADING);
    const [errorText, setErrorText] = useState("");

    const getScoreData = useCallback(async () => {

        setState(STATE_LOADING);

        try {
            const response = await fetch(`/.netlify/functions/quiz-scores?quizId=${quizId}`, { method: "GET" });
            const data = await response.json();
            setScores(data);
            setState(STATE_DISPLAY);
        } catch (error) {
            setErrorText(error.toString());
            setState(STATE_ERROR);
        }
    }, [quizId]);

    useEffect(() => {
        getScoreData();
    }, [getScoreData]);



    return (
        <div className={styles['leaderboardView']}>
            <div className={styles['leaderboardTitle']}>
                <h2>Leaderboard</h2>
                <h3>{name}</h3>
            </div>

            <div className={styles.leaderboardContent}>
                {state === STATE_DISPLAY && <LeaderboardTable scores={scores} />}
                {state === STATE_LOADING && <p>Loading scores...</p>}
                {state === STATE_ERROR && <ErrorBox message={errorText} />}
            </div>
            
            <div className="button-container">
                <Button onClick={() => getScoreData()}>Refresh</Button>
                <Button onClick={() => setCurrentView('title')}>Back to Title</Button>
            </div>
        </div>
    );
};


const LeaderboardTable = ({scores=[]}) => {
    const tableRows = scores.map((item, i) => {
        return (
            <tr key={i}>
                <td>#{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.score}</td>
            </tr>
        );
    });

    return (
        <table>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
            {tableRows.length > 0 ? tableRows : <p>This leaderboard is empty.</p>}
        </table>
    );
};


const ErrorBox = ({ message }) => {
    return (
        <div className={styles.errorBox}>
            <h2>ERROR</h2>
            <p>{message}</p>
        </div>
    );
}
export default LeaderboardView;