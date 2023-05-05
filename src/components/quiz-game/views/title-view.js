import React, { useState, useEffect } from 'react';
import Button from '../common/button';

// Button

const TitleView = ({ quiz, setCurrentView, setScore }) => {
    const { name, description, difficulty, length } = quiz;


    return (
        <div className="title-view">
            <div className="title-logo">
                <p className="title-logo__pretitle">Quiz Land presents</p>
                <h1 className="title-logo__name">{name}</h1>
            </div>

            <div className="statbox-row">
                <div className="statbox">
                    <h2 className="statbox__heading">Quiz Description</h2>
                    <p className="statbox__text" dangerouslySetInnerHTML={{__html: description}}></p>
                </div>
            </div>


            <div className="statbox-row">
                <div className="statbox">
                    <h2 className="statbox__heading">Difficulty</h2>
                    <p className="statbox__big-text">{difficulty}</p>
                </div>

                <div className="statbox">
                    <h2 className="statbox__heading">Total Questions</h2>
                    <p className="statbox__big-text">{length}</p>
                </div>
            </div>

            <div className="button-container">
                <Button onClick={() => setCurrentView('play')}>Play</Button>
                <Button onClick={() => setCurrentView('high-scores')}>High Scores</Button>
            </div>

            <p className="copyright-text">Game &copy;2023 QuizLand, Inc. | Questions from The Trivia API</p>
        </div>
    )
};


export default TitleView;