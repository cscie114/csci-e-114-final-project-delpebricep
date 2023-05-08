import React, { useState } from 'react';
import { Howler } from 'howler';

import "./quiz-game.css";

import TitleView from './views/title-view';
import PlayView from './views/play-view';
import ResultsView from './views/results-view';
import LeaderboardView from './views/leaderboard-view';

import SFXPlayer from '../../sfx-player';


const QuizGame = ({ quiz }) => {
    
    const sfxPlayer = new SFXPlayer();
    const [currentView, setCurrentView] = useState('title');    
    const [score, setScore] = useState(0);

    const viewComponents = {
        'title': TitleView,
        'play': PlayView,
        'results': ResultsView,
        'leaderboard': LeaderboardView
    };

    const viewProps = {
        quiz,
        setCurrentView,
        score,
        setScore,
        sfxPlayer
    };


    const View = viewComponents[currentView];

    function onSliderChange(event) {
        Howler.volume(event.target.value);
    }

    return (
        <>
            <div className="quiz-container">
                <View {...viewProps} />
            </div>
            <div className="sound-controls">
                <h3>Sound Controls</h3>

                <input type="range" min={0} max={1} step={0.01} onInput={onSliderChange} />
            </div>
        </>
    );
};


export default QuizGame;