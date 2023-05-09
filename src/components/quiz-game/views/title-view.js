/*
    TITLE VIEW COMPONENT
    This component represents the quiz game's title screen.
    Displays the quiz's name, length, and other such information.
*/

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faList } from '@fortawesome/free-solid-svg-icons';

import * as styles from "./title-view.module.css";
import Button from '../common/button';


// Main component
const TitleView = ({ quiz, setCurrentView }) => {
    const { name, description, difficulty, length } = quiz;

    return (
        <div className={styles.container}>
            {/* QUIZ TITLE */}
            <div className={styles.title}>
                <p>Quiz Land presents</p>
                <h1>{name}</h1>
            </div>

            {/* QUIZ DESCRIPTION/INFO */}
            <div className={styles.statboxRow}>
                <div className={styles.statbox}>
                    <h2>Quiz Description</h2>
                    <p dangerouslySetInnerHTML={{__html: description}}></p>
                </div>
            </div>

            <div className={styles.statboxRow}>
                <div className={styles.statbox}>
                    <h2>Difficulty</h2>
                    <p className={styles.bigText}>{difficulty}</p>
                </div>

                <div className={styles.statbox}>
                    <h2>Total Questions</h2>
                    <p className={styles.bigText}>{length}</p>
                </div>
            </div>

            {/* BUTTONS TO GO TO OTHER SCREENS */}
            <div className="button-container">
                <Button onClick={() => setCurrentView('play')}><FontAwesomeIcon icon={faPlay} />&nbsp;Play</Button>
                <Button onClick={() => setCurrentView('leaderboard')}><FontAwesomeIcon icon={faList} />&nbsp;View Leaderboard</Button>
            </div>

            {/* COPYRIGHT TEXT */}
            <p className={styles["copyrightText"]}>Game &copy;2023 QuizLand, Inc. | Questions from The Trivia API</p>
        </div>
    );
};


export default TitleView;