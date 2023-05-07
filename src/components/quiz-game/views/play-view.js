/*
    PLAY VIEW COMPONENT
    This component represents the question-and-answer process of the game.
*/

import React, { useState, useEffect, useMemo } from 'react';
import { Howl } from 'howler';

import * as styles from './play-view.module.css';
import Button from '../common/button';
import { shuffle } from '../../../utils';


// Main component
const PlayView = ({ quiz, setCurrentView, score, setScore, sfxPlayer }) => {
    const { questions, music } = quiz;

    // Background music controller.
    // Runs only if the quiz's music track is changed.
    useEffect(() => {
        const bgmTrack = new Howl({
            src: [music.publicURL],
            loop: true
        });

        bgmTrack.play();

        // Clean up function for when component is destroyed
        return () => {
            // Clean up music so memory leaks don't happen
            bgmTrack.stop();
            bgmTrack.unload();
        };
    }, [music.publicURL]);


    function onAnswerSelected(answer) {
        if (answer.isCorrect) {
            sfxPlayer.play("answer-correct");
            setScore(value => value + 1);
        } else {
            sfxPlayer.play("answer-wrong");
        }
    }

    function onAllQuestionsCompleted() {
        setCurrentView("results");
    }

    // Build the entire element
    return (
        <div className={styles.container}>
            <PlayerHUD quiz={quiz} score={score} />
            <QuestionBox 
                questions={questions}
                onAnswerSelected={onAnswerSelected}
                onAllQuestionsCompleted={onAllQuestionsCompleted}
            />
        </div>
    );
};


// The player's heads-up display, which displays some game stats
const PlayerHUD = ({ quiz, score = 0 }) => {
    const { name } = quiz;

    // Show quiz name and current score
    return (
        <div className={styles.hud}>
            <span><b>{name}</b></span>
            <span>{score} pts</span>
        </div>
    );
};


// The question box, which displays each question and their answers one by one
const QuestionBox = ({ questions, onAnswerSelected, onAllQuestionsCompleted }) => {
    // These finite states control how the user interacts with this component
    const STATE_WAIT_FOR_ANSWER = 0;
    const STATE_ANSWER_CHOSEN = 1;

    // Array of colors to make each answer button
    const ANSWER_COLORS = [
        "#7bd5ff",
        "#9bf563",
        "#ff8f8f",
        "#ffca2c"
    ];

    // State variables and memos
    const [state, setState] = useState(STATE_WAIT_FOR_ANSWER);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    
    const totalQuestions = questions.length;
    const currentQuestionNumber = useMemo(() => currentQuestionIndex + 1, [currentQuestionIndex]);
    const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
    const correctAnswer = useMemo(() => currentQuestion.answers.filter(a => a.isCorrect)[0], [currentQuestion]);

    // This function advances to the next question.
    // If at the last question, execute a callback.
    function gotoNextQuestion() {
        if (currentQuestionNumber < totalQuestions) {
            setCurrentQuestionIndex(value => value + 1);
        } else {
            onAllQuestionsCompleted();
        }
    }

    // Event callback for when the user clicks an answer.
    function onClickAnswerButton(answer) {
        if (state === STATE_WAIT_FOR_ANSWER) {
            setCurrentAnswer(answer);
            setState(STATE_ANSWER_CHOSEN);

            onAnswerSelected(answer);
        }
    }

    // When the "click to continue" button is pressed,
    // move on to the next question
    function onClickNextButton() {
        if (state === STATE_ANSWER_CHOSEN) {
            gotoNextQuestion();
            setCurrentAnswer(null);
            setState(STATE_WAIT_FOR_ANSWER);
        }
    }

    // Randomize answer order and build button elements from each
    const answers = useMemo(() => shuffle(currentQuestion.answers), [currentQuestion]);
    const answerButtons = answers.map((answer, index) => {
        // This button executes a callback when clicked.
        // Its corresponding answer is a parameter.
        return (
            <Button 
                key={index} 
                classes={[styles.answerButton]}
                color={ANSWER_COLORS[index]}
                onClick={() => onClickAnswerButton(answer)}
            >
                {answer.text}
            </Button>
        );
    });


    // This sub-component renders whether the user's selected answer is correct
    const AnswerResult = () => {
        const text = currentAnswer?.isCorrect ? "CORRECT!" : "Incorrect...";
        const textColor = currentAnswer?.isCorrect ? "#aaff00" : "#ff1a1a";

        return (
            <div className={styles.answerResult}>
                <h1 style={{ color: textColor }}>{text}</h1>
                <p>The correct answer was <b>{correctAnswer.text}</b>.</p>

                <Button onClick={onClickNextButton}>
                    Click to continue.
                </Button>
            </div>
        );
    };


    // Build the whole element
    return (
        <div className={styles.questionBox}>
            {/* QUESTION NUMBER AND TOTAL */}
            <div className={styles.questionNumber}>
                <span>Question #{currentQuestionNumber} of {totalQuestions}</span>
            </div>

            {/* QUESTION TEXT */}
            <div className={styles.questionText}>
                <span>{currentQuestion.text}</span>
            </div>
                
            {/* ANSWER BUTTONS */}
            <div className={styles.answerButtons}>
                {answerButtons}
                {state === STATE_ANSWER_CHOSEN && <AnswerResult />}
            </div>
        </div>
    );
};


export default PlayView;