import React, { useState, useEffect, useMemo } from 'react';

import SfxPlayer from '../../sfx-player';

import TitleView from './title-view';
import PlayView from './play-view';
import ResultsView from './results-view';



const QuizGame = ({ quiz }) => {

    const sfxPlayer = new SfxPlayer();

    const [currentPage, setCurrentPage] = useState('title');
    const [score, setScore] = useState(0);


    const viewComponents = {
        'title': TitleView,
        'play': PlayView,
        'resutls': ResultsView
    };

    const viewProps = {
        quiz,
        setCurrentPage,
        score,
        setScore,
        sfxPlayer
    };


    const View = viewComponents[currentPage];

    return (
        <div>
            <View {...viewProps} />
        </div>
    );
};


export default QuizGame;