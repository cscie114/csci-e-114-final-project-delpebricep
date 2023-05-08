import { Howl } from 'howler';

import sfxCorrect from "./audio/sfx/answer-correct.wav";
import sfxWrong from "./audio/sfx/answer-wrong.wav";
import sfxApplause from "./audio/sfx/applause.wav";
import sfxDrumrollStart from "./audio/sfx/drumroll-start.wav";
import sfxDrumrollEnd from "./audio/sfx/drumroll-end.wav";
import sfxFanfareGood from "./audio/sfx/fanfare-good.wav";
import sfxFanfareOkay from "./audio/sfx/fanfare-okay.wav";
import sfxFanfarePoor from "./audio/sfx/fanfare-poor.wav";
import sfxFanfarePerfect from "./audio/sfx/fanfare-perfect.wav";


/*
    A quick utility class to allow for playing sound effects
    without having to make Howl instances all of the time.
*/
export default class SFXPlayer {
    constructor() {
        const assets = {
            'answer-correct': sfxCorrect,
            'answer-wrong': sfxWrong,
            'applause': sfxApplause,
            'drumroll-start': sfxDrumrollStart,
            'drumroll-end': sfxDrumrollEnd,
            'fanfare-good': sfxFanfareGood,
            'fanfare-okay': sfxFanfareOkay,
            'fanfare-poor': sfxFanfarePoor,
            'fanfare-perfect': sfxFanfarePerfect
        };

        this.sfxList = {};

        // Gather each imported SFX asset and create Howl objects for each.
        for (const key in assets) {
            let sound = assets[key];

            this.sfxList[key] = new Howl({ 
                src: [sound]
            });
        }
    }

    // Plays a sound with a given id.
    play(id) {
        if (!(id in this.sfxList)) {
            return;
        }

        let sound = this.sfxList[id];

        if (sound.playing()) {
            sound.stop();
        }

        sound.play();

        return sound;
    }

    // Plays a sound with a given id and resolves a promise when it's done.
    async playAsync(id) {
        let sound = this.play(id);

        return new Promise(resolve => {
            sound.on('end', () => {
                resolve();
            });
    
            sound.play();
        });
    }

    // Destroys every sound, freeing them from the cache.
    cleanup() {
        for (const key in this.sfxList) {
            const sound = this.sfxList[key];
            sound.unload();
        }
    }
}
