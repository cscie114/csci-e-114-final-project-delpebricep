/*
    RESULTS VIEW COMPONENT
    This component represents the quiz's results screen.
*/

import React, { useState, useEffect } from 'react';

import { Howl, Howler } from 'howler';
import JSConfetti from 'js-confetti';

import * as styles from './results-view.module.css';
import Button from '../common/button';
import { getGradeFromNumber, sleep } from '../../../utils';
import bgmHappyTune from "../../../audio/bgm/happy-tune.mp3";


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
            // After the drumroll, cymbals crash
            sfxPlayer.play('drumroll-end');
            
            // The grade is now visible
            setIsGradeVisible(true);

            // If this grade deserves confetti, display it
            if (confettiNumber > 0) {
                jsConfetti.addConfetti({
                    confettiRadius: 4,
                    confettiNumber,
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
    }, [grade, gradePercentage, sfxPlayer]);
    

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
                {canSubmit && <SubmitForm quizId={quizId} score={score} gradeData={grade} />}
            </div>

            {/* BUTTONS TO GO TO OTHER SCREENS */}
            <div className="button-container" style={{ width: "100%" }}>
                <Button onClick={() => setCurrentView('play')}>Play Again</Button>
                <Button onClick={() => setCurrentView('leaderboard')}>View Leaderboard</Button>
                <Button onClick={() => setCurrentView('title')}>Back to Title</Button>
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
const SubmitForm = ({ quizId, score, gradeData }) => {
    const { letter } = gradeData;

    // Finite states to control the form
    const STATE_IDLE = 0;
    const STATE_SUBMITTING = 1;
    const STATE_SUCCESS = 2;
    const STATE_ERROR = 3;

    // State variables
    const [state, setState] = useState(STATE_IDLE);
    const [errorText, setErrorText] = useState("");
    
    // Callback for submitting the score to the leaderboard.
    async function handleSubmit(event) {
        // Prevent the browser from reloading the page
        event.preventDefault();

        // Read the form data
        const form = event.target;
        const formData = new FormData(form);

        // Set some extra form fields we need
        formData.set("quizId", quizId);
        formData.set("score", score);
        formData.set("grade", letter);

        // Make form data a string
        const stringData = JSON.stringify(Object.fromEntries(formData));

        try {
            setState(STATE_SUBMITTING);

            // Wait for data to be sent to the serverless function
            let response = await fetch("/.netlify/functions/quiz-scores", {
                method: form.method,
                body: stringData,
                headers: { "Content-Type": "application/json" }
            });
            let data = await response.json();

            // If anything goes wrong, throw the response's error text
            if (!response.ok) {
                throw data;
            }

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

            <form method="POST" onSubmit={handleSubmit}>
                {/* Disable these controls if form is submitting or successful */}
                <fieldset disabled={state === STATE_SUCCESS || state === STATE_SUBMITTING}>
                    <label htmlFor="input-name">
                        Name:
                    </label>
                    <input id="input-name" type="text" name="name" />

                    <Button type="submit" classes={[styles.formButton]}>
                        {state === STATE_SUBMITTING ? "Submitting..." : "Submit"}
                    </Button>
                </fieldset>
            </form>

            <p>{formText}</p>
        </div>
    );
};

export default ResultsView;