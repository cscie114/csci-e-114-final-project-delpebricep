import React, { useState, useEffect, useMemo } from 'react';
import { shuffle } from '../../../utils';
import { Howl } from 'howler';


const STATE_QUESTION = "showQuestion";
const STATE_ANSWER = "answeredQuestion";


const PlayView = ({ quiz, setCurrentView, score, setScore, sfxPlayer }) => {

    const { name, questions, length, music } = quiz;

    const [state, setState] = useState(STATE_QUESTION);

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = useMemo(() => questions[currentIndex], [questions, currentIndex]);

    const [currentAnswer, setCurrentAnswer] = useState(null);

    const bgmTrack = new Howl({
        src: [music.publicURL],
        loop: true
    });

    
    useEffect(() => {
        bgmTrack.play();

        return () => {
            bgmTrack.stop();
            bgmTrack.unload();
        }
    }, []);

    function gotoNextQuestion() {
        if ((currentIndex + 1) < length) {
            setCurrentIndex(value => value + 1);
        } else {
            setCurrentView("results");
        }
    }


    function onClickAnswerButton(answer) {
        if (state === STATE_QUESTION) {
            setCurrentAnswer(answer);
            setState(STATE_ANSWER);

            if (answer.isCorrect) {
                sfxPlayer.play("answer-correct");
                setScore(value => value + 1);
            } else {
                sfxPlayer.play("answer-wrong");
            }
        }
    }

    function onClickAnswerOverlay() {
        if (state === STATE_ANSWER) {
            gotoNextQuestion();
            setCurrentAnswer(null);
            setState(STATE_QUESTION);
        }
    }



    let stateElement = <></>;

    if (state === STATE_ANSWER) {
        stateElement = <AnswerOverlay currentAnswer={currentAnswer} allAnswers={currentQuestion.answers} onClick={onClickAnswerOverlay} />;
    } else if (state === STATE_QUESTION) {
        stateElement = (
            <div>
                <div>
                    {name}
                    <br />

                    Score: {score}
                    <br />


                    <QuestionCard question={currentQuestion} onClickAnswerButton={onClickAnswerButton} />
                </div>
            </div>
        );
    }

    return (
        <div>
            {stateElement}
        </div>
    );
};

const QuestionCard = ({ question, onClickAnswerButton }) => {

    const answers = shuffle(question.answers);
    const answerButtons = answers.map((answer, index) => {
        return (
            <button key={index} onClick={() => onClickAnswerButton(answer)}>
                {answer.text}
            </button>
        );
    });

    return (
        <div>
            <div>
                {question.text}
                <br />
                <div>{answerButtons}</div>
            </div>
        </div>
    );
};

const AnswerOverlay = ({ currentAnswer, allAnswers, onClick }) => {

    let correctAnswer = allAnswers.filter(a => a.isCorrect)[0];
    let text = currentAnswer?.isCorrect ? <div>CORRECT</div> : <div>WRONG <p>The correct answer is <b>{correctAnswer.text}</b></p></div>;

    return (
        <div onClick={onClick}>
            {text}
            <p>Click to continue.</p>
        </div>
    );
};


export default PlayView;