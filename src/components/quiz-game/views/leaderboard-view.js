/*
    LEADERBOARD VIEW COMPONENT
    This component represents the quiz game's leaderboard, a list of scores people submitted.
*/

import React, { useState, useEffect, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Button from '../common/button';

import * as styles from "./leaderboard-view.module.css";
import { getLeaderboardScores } from '../../../leaderboard-utils';


// These finite states control how the user interacts with this component
const STATE_LOADING = 0;
const STATE_DISPLAY = 1;
const STATE_ERROR = 2;

// Main component
const LeaderboardView = ({ quiz, setCurrentView }) => {
    const { quizId, name, length } = quiz;

    // State variables
    const [scores, setScores] = useState([]);
    const [state, setState] = useState(STATE_LOADING);
    const [errorText, setErrorText] = useState("");

    // This function fetches leaderboard data via a Netlify function
    const getScoreData = useCallback(async () => {
        setState(STATE_LOADING);

        try {
            // Get this quiz's scores
            const data = await getLeaderboardScores(quizId);

            setScores(data);
            setState(STATE_DISPLAY);
        } catch (error) {
            setErrorText(error.toString());
            setState(STATE_ERROR);
        }
    }, [quizId]);

    // Fetch the scores first thing when we render
    useEffect(() => {
        getScoreData();
    }, [getScoreData]);

    // Build the whole component
    return (
        <div className={styles.container}>
            {/* TITLE/NAME */}
            <div className={styles.title}>
                <h3>{name}</h3>
                <h2>Leaderboard</h2>
            </div>

            {/* LEADERBOARD TABLE */}
            <div className={styles.content}>
                {state === STATE_DISPLAY && <LeaderboardTable scores={scores} totalQuestions={length} />}
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
            
            {/* BUTTONS TO GO TO OTHER SCREENS */}
            <div className="button-container" style={{ width: "100%" }}>
                {/* OH, AND TO REFRESH THE LEADERBOARDS */}
                <Button onClick={() => getScoreData()}>
                    <FontAwesomeIcon icon={faRefresh} />&nbsp;Refresh
                </Button>

                <Button onClick={() => setCurrentView('title')}>
                    <FontAwesomeIcon icon={faArrowLeft} />&nbsp;Back to Title
                </Button>
            </div>
        </div>
    );
};


// Displays a list of player scores in a nice table
const LeaderboardTable = ({ scores = [], totalQuestions }) => {
    // Display a message if no scores
    if (scores.length === 0) {
        return (
            <div className={styles.centerContainer}>
                <p>This leaderboard is empty.<br />Play this quiz and be the first to submit a score.</p>
            </div>
        );
    }

    // Generate a collection of table rows for each score object in the array
    // Each row displays the item's rank/index, player's name, the numerical score, and grade
    const tableRows = scores.map((item, i) => {
        const { name, score, percentage, grade } = item;
        return (
            <tr key={i}>
                <td><b>#{i + 1}</b></td>
                <td>{name}</td>
                <td>{score} / {totalQuestions}</td>
                <td>{percentage}</td>
                <td>{grade}</td>
            </tr>
        );
    });

    // Display the whole table
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th style={{ width: "15%" }}>Rank</th>
                    <th>Player Name</th>
                    <th style={{ width: "15%" }}>Score</th>
                    <th style={{ width: "15%" }}>Percentage</th>
                    <th style={{ width: "15%" }}>Grade</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
};


// This component renders a message in a box. 
// It's used to display errors.
const ErrorBox = ({ message }) => {
    return (
        <div className={styles.errorBox}>
            <h2>ERROR</h2>
            <p>{message}</p>
        </div>
    );
}


export default LeaderboardView;