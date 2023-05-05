import React, { useState, useEffect, useMemo } from 'react';

import SfxPlayer from '../../sfx-player';

import TitleView from './title-view';
import PlayView from './play-view';
import ResultsView from './results-view';
import HighScoreView from './high-score-view';



const QuizGame = ({ quiz }) => {
    
    const [currentView, setCurrentView] = useState('title');    
    const [score, setScore] = useState(0);
    const sfxPlayer = new SfxPlayer();

    const viewComponents = {
        'title': TitleView,
        'play': PlayView,
        'results': ResultsView,
        'high-scores': HighScoreView
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
        <div>
            <View {...viewProps} />
        </div>
    );
};


export default QuizGame;