import React, { useEffect, useState } from 'react';
import { Howler } from 'howler';

import "./quiz-game.css";

import TitleView from './views/title-view';
import PlayView from './views/play-view';
import ResultsView from './views/results-view';
import LeaderboardView from './views/leaderboard-view';

import SFXPlayer from '../../sfx-player';


// The very main component. It's the entry point and runs the whole show.
const QuizGame = ({ quiz }) => {

    // State variables
    const sfxPlayer = new SFXPlayer();
    const [currentView, setCurrentView] = useState('title');    
    const [score, setScore] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);


    // A series of components representing each screen, or "view", we need.
    // This component will switch between them all.
    const viewComponents = {
        'title': TitleView,
        'play': PlayView,
        'results': ResultsView,
        'leaderboard': LeaderboardView
    };

    // A series of common props to pass to each aforementioned view.
    const viewProps = {
        quiz,
        setCurrentView,
        score,
        setScore,
        sfxPlayer
    };

    // Map the desired component to the key of the view we need.
    const View = viewComponents[currentView];

    // Event callbacks for the volume slider and mute button
    function onVolumeSliderChange(event) {
        setVolume(event.target.value);

        if (isMuted && event.target.value > 0) {
            setIsMuted(false);
        } 
    }

    function onClickMuteButton() {
        setIsMuted(!isMuted);
    }

    // Effects for changing volume
    useEffect(() => { Howler.volume(volume) }, [volume]);
    useEffect(() => { Howler.mute(isMuted) }, [isMuted]);

    // Effect for cleaning up the sound player when component is destroyed
    useEffect(() => {
        return () => {
            sfxPlayer.cleanup();
        };
    }, []);

    // The whole component:
    return (
        <>
            {/* CURRENT GAME VIEW */}
            <div className="quiz-container">
                <View {...viewProps} />
            </div>

            {/* SOUND VOLUME ADJUSTMENTS */}
            <div className="sound-controls">
                <h3>Sound Volume <span>({Math.round(volume * 100)}%)</span></h3>

                <div className="controls">
                    {/* VOLUME SLIDER */}
                    <input 
                        className="volume-slider" 
                        type="range" 
                        min={0} 
                        max={1} 
                        step={0.01}
                        value={volume}
                        onInput={onVolumeSliderChange} 
                    />

                    {/* MUTE BUTTON */}
                    <button className="mute-button" onClick={onClickMuteButton}>
                        {isMuted ? "Unmute" : "Mute"}
                    </button>
                </div>
            </div>
        </>
    );
};


export default QuizGame;