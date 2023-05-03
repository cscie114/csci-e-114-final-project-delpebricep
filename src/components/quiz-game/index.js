import React, { useState, useEffect, useMemo } from 'react';

import sfxBeep from "../../audio/sfx/menu-select.wav";
import sfxConfirm from "../../audio/sfx/menu-confirm.wav";

import TitleView from './title-view';
import QuestionView from './question-view';
import ResultsView from './results-view';
import useSound from 'use-sound';


const QuizGame = ({ data }) => {

    useEffect(() => {
        console.log("START");
        playBeep();

    }, []);


    const [currentPage, setCurrentPage] = useState('title');

    const [playBeep] = useSound(sfxBeep);
    console.log(sfxBeep);



    return (
        <div>
            {currentPage === 'title' && <TitleView data={data} setCurrentPage={setCurrentPage} />}
            {currentPage === 'play' && <QuestionView data={data} setCurrentPage={setCurrentPage} />}
            {currentPage === 'results' && <ResultsView data={data} setCurrentPage={setCurrentPage} />}
        </div>
    );
};


export default QuizGame;