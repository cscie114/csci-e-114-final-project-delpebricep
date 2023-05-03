import React, { useState, useEffect, useMemo } from 'react';
import useSound from 'use-sound';

import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";

import sfxBeep from "../../audio/sfx/menu-select.wav";
import sfxConfirm from "../../audio/sfx/menu-confirm.wav";
// import JSConfetti from 'js-confetti';


const TitleView = ({ data, setCurrentPage }) => {
    const { name, questions, length } = data;


    return (
        <div>
            <h1>{name}</h1>
            <button onClick={() => setCurrentPage('play')}>Play</button>
        </div>
    )
};


export default TitleView;