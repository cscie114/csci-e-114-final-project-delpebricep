/*
    RESULTS VIEW COMPONENT
    This component represents the quiz's results screen.
*/

import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowLeft, faList } from '@fortawesome/free-solid-svg-icons';
import { Howl, Howler } from 'howler';
import JSConfetti from 'js-confetti';

import * as styles from './results-view.module.css';
import Button from '../common/button';
import { getGradeFromNumber, sleep } from '../../../utils';
import bgmHappyTune from "../../../audio/bgm/happy-tune.mp3";
import { postLeaderboardScore } from '../../../leaderboard-utils';


// Main component
const ResultsView = ({ quiz, score, setCurrentView, sfxPlayer }) => {
    const { quizId, name, length } = quiz;

    // Calculate the user's grade and percentage.
    const gradePercentage = Math.round((score / length) * 100);
    const grade = getGradeFromNumber(gradePercentage);

    // State variables
    const [isGradeVisible, setIsGradeVisible] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    
    // This large effect is used to run a sequence of events in which the player's grade is revealed
    useEffect(() => {
        // Setup
        const { confettiNumber, playApplause, fanfareSfx } = grade;

        const bgmTrack = new Howl({
            src: [bgmHappyTune],
            loop: false
        });

        const jsConfetti = new JSConfetti();

        setIsGradeVisible(false);
        setCanSubmit(false);

        // Play the drumroll
        sfxPlayer.playAsync('drumroll-start')
        .then(() => { 
            // After the drumroll, cymbals crash if the percentage is high
            if (gradePercentage >= 70) {
                sfxPlayer.play('drumroll-end');
            } else {
                // Otherwise, play a lousy rimshot
                sfxPlayer.play('rimshot');
            }
            
            // The grade is now visible
            setIsGradeVisible(true);

            // If this grade deserves confetti, display it
            if (confettiNumber > 0) {
                jsConfetti.addConfetti({
                    confettiRadius: 4,
                    confettiNumber
                });
            }

            // Play applause if needed
            if (playApplause) {
                sfxPlayer.play('applause');
            }

            // Wait for a second
            return sleep(1000);
        })
        .then(() => {
            // Display the submit form now
            setCanSubmit(true);

            // Play the grade's corresponding fanfare
            return sfxPlayer.playAsync(fanfareSfx)        
            .then(() => {
                // If we got a B or higher, play a celebratory track
                if (gradePercentage >= 80) {
                    return sleep(1000)
                    .then(() => bgmTrack.play());
                }
            });
        });

        // Clean up function for when component is destroyed
        return () => {
            // Stop and clean up music
            bgmTrack.stop();
            bgmTrack.unload();

            // Stop all sound effects
            Howler.stop();

            // Clean up the confetti
            jsConfetti.clearCanvas();
        };
    }, [grade, gradePercentage]);
    

    // Build the whole element
    return (
        <div className={styles.container}>
            {/* RESULTS TITLE */}
            <div className={styles.title}>
                <h3>{name}</h3>
                <h2>Results</h2>
            </div>

            {/* RESULTS CONTENT */}
            <div className={styles.content}>
                <div className={styles.row}>
                    {/* RESULT STATS */}
                    <div className={styles.statContainer}>
                        {/* # OF CORRECT ANSWERS */}
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Correct Answers</span>
                            <span className={styles.statValue}>{score}&nbsp;/&nbsp;{length}</span>
                        </div>

                        {/* # OF WRONG ANSWERS */}
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Incorrect Answers</span>
                            <span className={styles.statValue}>{length - score}&nbsp;/&nbsp;{length}</span>
                        </div>

                        {/* GRADE PERCENTAGE */}
                        <div className={styles.stat}>
                            <span className={styles.statLabel}>Percentage</span>
                            <span className={styles.statValue}>{gradePercentage}%</span>
                        </div>
                    </div>

                    {/* FINAL GRADE */}
                    <div className={styles.grade}>
                        <span className={styles.label}>FINAL GRADE</span>
                        {isGradeVisible && <GradeLetter gradeData={grade} />}
                    </div>
                </div>
            
                {/* GRADE MESSAGE */}
                {isGradeVisible && <p className={styles.gradeMessage}>{grade.message}</p>}

                {/* LEADERBOARD SUBMISSION FORM */}
                {canSubmit && <SubmitForm quizId={quizId} score={score} gradeData={grade} percentage={gradePercentage} />}
            </div>

            {/* BUTTONS TO GO TO OTHER SCREENS */}
            <div className="button-container" style={{ width: "100%" }}>
                <Button onClick={() => setCurrentView('play')}>
                    <FontAwesomeIcon icon={faPlay} />&nbsp;Play Again
                </Button>
                <Button onClick={() => setCurrentView('leaderboard')}>
                    <FontAwesomeIcon icon={faList} />&nbsp;View Leaderboard
                </Button>
                <Button onClick={() => setCurrentView('title')}>
                    <FontAwesomeIcon icon={faArrowLeft} />&nbsp;Back to Title
                </Button>
            </div>
        </div>
    );
};


// Given a grade, this component displays its letter.
const GradeLetter = ({ gradeData }) => {
    const { letter, color } = gradeData;

    return (
        <div>
            <span className={styles.letter} style={{ color: color }}>
                {letter}
            </span>
        </div>
    );
};


// This component is a form that the user fills to submit their score.
const SubmitForm = ({ quizId, score, gradeData, percentage }) => {
    const { letter } = gradeData;

    // Finite states to control the form
    const STATE_IDLE = 0;
    const STATE_SUBMITTING = 1;
    const STATE_SUCCESS = 2;
    const STATE_ERROR = 3;

    // State variables
    const [state, setState] = useState(STATE_IDLE);
    const [name, setName] = useState("");
    const [errorText, setErrorText] = useState("");
    
    // Callback for submitting the score to the leaderboard.
    async function handleSubmit(event) {
        // Prevent the browser from reloading the page
        event.preventDefault();

        try {
            setState(STATE_SUBMITTING);

            // Send the score.
            await postLeaderboardScore(quizId, { name, score, grade: letter, percentage });

            // If we got here, it was submitted successfully
            setState(STATE_SUCCESS);
        } catch (error) {
            // Otherwise, we'll display an error message
            setErrorText(error.toString());
            setState(STATE_ERROR);
        }
    }

    // Text to display if the form is processing or successful
    let formText = " ";
    if (state === STATE_ERROR) {
        formText = "ERROR: " + errorText;
    } else if (state === STATE_SUCCESS) {
        formText = "Your score was posted on the leaderboard.";
    }

    // Display the whole form
    return (
        <div className={styles.formArea}>
            <h4>Submit Your Score</h4>

            {/* The form itself, which only appears if the player hasn't submitted anything */}
            {
                state !== STATE_SUCCESS && (
                    <form method="POST" onSubmit={handleSubmit}>
                        {/* Disable these controls if form is submitting */}
                        <fieldset disabled={state === STATE_SUBMITTING}>
                            <label htmlFor="input-name">
                                Name:
                            </label>

                            <input 
                                id="input-name" 
                                type="text" 
                                value={name} 
                                onInput={(event) => setName(event.target.value)} 
                            />

                            <Button type="submit" classes={[styles.formButton]}>
                                {state === STATE_SUBMITTING ? "Submitting..." : "Submit"}
                            </Button>
                        </fieldset>
                    </form>
                )
            }

            <p>{formText}</p>
        </div>
    );
};

export default ResultsView;