import React, { useState, useEffect, useMemo } from 'react';
import useSound from 'use-sound';

import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

import sfxBeep from "../../audio/sfx/menu-select.wav";
import sfxConfirm from "../../audio/sfx/menu-confirm.wav";
import JSConfetti from 'js-confetti';


const ResultsView = ({ data, setCurrentPage }) => {
    useEffect(() => {
        const jsConfetti = new JSConfetti();

        jsConfetti.addConfetti({
            confettiRadius: 8,
            confettiNumber: 200,
        });

        return () => {
            jsConfetti.clearCanvas();
        };
    });

    const { name, questions, length } = data;


    return (
        <div>
            <button onClick={() => setCurrentPage('play')}>Play Again</button>
        </div>
    )
};


export default ResultsView;