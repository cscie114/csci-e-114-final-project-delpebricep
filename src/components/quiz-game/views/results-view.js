import React, { useState, useEffect } from 'react';

import { Howl } from 'howler';
import JSConfetti from 'js-confetti';

import { getGradeFromNumber, sleep } from '../../../utils';

import bgmHappyTune from "../../../audio/bgm/happy-tune.mp3";


const ResultsView = ({ quiz, score, setCurrentView, sfxPlayer }) => {
    const { quizId, name, length } = quiz;



    const gradePercentage = Math.round((score / length) * 100);
    const grade = getGradeFromNumber(gradePercentage);
    
    const { confettiNumber, playApplause, fanfareSfx } = grade;

    const [isGradeVisible, setIsGradeVisible] = useState(false);

    
    useEffect(() => {
        const bgmTrack = new Howl({
            src: [bgmHappyTune],
            loop: true
        });
        const jsConfetti = new JSConfetti();

        async function runEvents() {
            await sfxPlayer.playAsync('drumroll-start');

            sfxPlayer.play('drumroll-end');
            setIsGradeVisible(true);
            
            
            if (confettiNumber > 0) {
                jsConfetti.addConfetti({
                    confettiRadius: 4,
                    confettiNumber,
                });
                
            }
            
            if (playApplause) {
                sfxPlayer.play('applause');
            }
    
            await sleep(1000);
    
            await sfxPlayer.playAsync(fanfareSfx);

            if (gradePercentage >= 80) {
                await sleep(1000);
                bgmTrack.play();
            }
        }

        runEvents();
        
        return () => {
            bgmTrack.stop();
            jsConfetti.clearCanvas();
        };
    }, [score]);
    



    async function handleSubmit(event) {
        // Prevent the browser from reloading the page
        event.preventDefault();

        // Read the form data
        const form = event.target;
        const formData = new FormData(form);
        formData.set("quizId", quizId);
        formData.set("score", score);

        const stringData = JSON.stringify(Object.fromEntries(formData));

        await fetch("/.netlify/functions/quiz-scores", { 
            method: form.method, 
            body: stringData,
            headers: { "Content-Type": "application/json" }
        });
    }

    let gradeDisplay = "";
    if (isGradeVisible) {
        gradeDisplay = (
            <div>
                <div>
                    <p>{grade.letter}</p>
                    <p>{grade.message}</p>
                    <h4>Submit Your Score</h4>
                    <form method="POST" onSubmit={handleSubmit}>
                        <label>
                            Your Name:
                            <input type="text" name="name" />
                        </label>
                        <button type="submit">Submit</button>
                    </form>

                </div>
            </div>
        );
    }

    return (
        <div>
            <p>{name}:</p>
            <p>FINAL SCORE: {score}</p>

            {gradeDisplay}

            <button onClick={() => setCurrentView('play')}>Play Again</button>
            <button onClick={() => setCurrentView('leaderboard')}>High Scores</button>
            <button onClick={() => setCurrentView('title')}>Quit</button>
        </div>
    );
};


export default ResultsView;