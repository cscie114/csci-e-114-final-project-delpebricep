/*
    LEADERBOARD VIEW COMPONENT
    This component represents the quiz game's leaderboard, a list of scores people submitted.
*/

import React, { useState, useEffect, useCallback } from 'react';
import Button from '../common/button';

import * as styles from "./leaderboard-view.module.css";


// These finite states control how the user interacts with this component
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
        <div className={styles.container}>
            <div className={styles.title}>
                <h3>{name}</h3>
                <h2>Leaderboard</h2>
            </div>

            <div className={styles.content}>
                {state === STATE_DISPLAY && <LeaderboardTable scores={scores} />}
                {state === STATE_LOADING && (
                    <div className={styles.centerContainer}>
                        <p>Loading scores...</p>
                    </div>
                )}
                {state === STATE_ERROR && (
                    <div className={styles.centerContainer}>
                        <ErrorBox message={errorText} />
                    </div>
                )}
            </div>
            
            <div className="button-container" style={{ width: "100%" }}>
                <Button onClick={() => getScoreData()}>Refresh</Button>
                <Button onClick={() => setCurrentView('title')}>Back to Title</Button>
            </div>
        </div>
    );
};


const LeaderboardTable = ({ scores = [] }) => {

    // Display a message if no scores
    if (scores.length === 0) {
        return (
            <div className={styles.centerContainer}>
                <p>This leaderboard is empty.<br />Be the first to submit a score.</p>
            </div>
        );
    }

    // Generate a collection of table rows for each score object in the array
    // Each row displays the item's rank/index, player's name, the numerical score, and grade
    const tableRows = scores.map((item, i) => {
        return (
            <tr key={i}>
                <td>#{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.score}</td>
            </tr>
        );
    });

    // Display the whole table
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ width: "15%" }}>Rank</th>
                        <th>Player Name</th>
                        <th style={{ width: "15%" }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
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