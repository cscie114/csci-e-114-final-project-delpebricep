import { Howl, Howler } from 'howler';


import sfxBeep from "./audio/sfx/menu-select.wav";
import sfxConfirm from "./audio/sfx/menu-confirm.wav";
import sfxCorrect from "./audio/sfx/answer-correct.wav";
import sfxWrong from "./audio/sfx/answer-wrong.wav";
import sfxApplause from "./audio/sfx/applause.wav";


const sfxResources = {
    'menu-select': sfxBeep,
    'menu-confirm': sfxConfirm,
    'answer-correct': sfxCorrect,
    'answer-correct': sfxWrong,
    'applause': sfxApplause,
};



export default class SfxPlayer {

    constructor() {
        let sfxList = {};

        for (const key in sfxResources) {
            let sfx = sfxResources[key];

            sfxList[key] = new Howl({ 
                src: [sfx]
            });
        }

        this.sounds = sfxList;
    }


    play(id="") {
        if (id in this.sfxList) {
            this.sfxList[id].play();
        }
    }
}