import React, { useState, useEffect, useMemo } from 'react';


const QuestionView = ({ data, setCurrentPage }) => {
    const { name, questions, length } = data;


    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const currentQuestion = useMemo(() => questions[currentIndex], [questions, currentIndex]);


    function gotoNextQuestion() {
        if ((currentIndex + 1) < length) {
            setCurrentIndex(value => value + 1);
        } else {
            setCurrentPage("results");
        }
    }


    function onClickAnswerButton(answer) {
        // play();

        if (answer.isCorrect) {
            setScore(value => value + 1);
        }

        gotoNextQuestion();
    }



    const answerButtons = currentQuestion.answers.map((answer, index) => {
        return (
            <button key={index} onClick={() => onClickAnswerButton(answer)}>
                {answer.text}
            </button>
        );
    });


    return (
        <div>
            {name}
            <br />

            {score}
            <br />

            {currentQuestion.text}
            <br />


            <div>{answerButtons}</div>
        </div>
    )
};


export default QuestionView;