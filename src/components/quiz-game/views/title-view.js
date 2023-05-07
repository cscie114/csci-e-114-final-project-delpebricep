/*
    TITLE VIEW COMPONENT
    This component represents the quiz game's title screen.
    Displays the quiz's name, length, and other such information.
*/


import React from 'react';
import Button from '../common/button';

import * as styles from "./title-view.module.css";


// Main component
const TitleView = ({ quiz, setCurrentView }) => {
    const { name, description, difficulty, length } = quiz;

    return (
        <div className={styles["titleView"]}>
            {/* QUIZ TITLE */}
            <div className={styles["titleLogo"]}>
                <p>Quiz Land presents</p>
                <h1>{name}</h1>
            </div>

            {/* QUIZ DESCRIPTION/INFO */}
            <div className={styles["statboxRow"]}>
                <div className={styles["statbox"]}>
                    <h2 className={styles["statbox__heading"]}>Quiz Description</h2>
                    <p className={styles["statbox__text"]} dangerouslySetInnerHTML={{__html: description}}></p>
                </div>
            </div>

            <div className={styles["statboxRow"]}>
                <div className={styles["statbox"]}>
                    <h2 className={styles["statbox__heading"]}>Difficulty</h2>
                    <p className={styles["statbox__bigText"]}>{difficulty}</p>
                </div>

                <div className={styles["statbox"]}>
                    <h2 className={styles["statbox__heading"]}>Total Questions</h2>
                    <p className={styles["statbox__bigText"]}>{length}</p>
                </div>
            </div>

            {/* BUTTONS TO GO TO OTHER SCREENS */}
            <div className="button-container">
                <Button onClick={() => setCurrentView('play')}>Play</Button>
                <Button onClick={() => setCurrentView('leaderboard')}>Leaderboard</Button>
            </div>

            {/* COPYRIGHT TEXT */}
            <p className={styles["copyrightText"]}>Game &copy;2023 QuizLand, Inc. | Questions from The Trivia API</p>
        </div>
    )
};

export default TitleView;