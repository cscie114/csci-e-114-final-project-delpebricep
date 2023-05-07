import React, { useState } from 'react';

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

    return (
        <div className="quiz-container">
            <View {...viewProps} />
        </div>
    );
};


export default QuizGame;