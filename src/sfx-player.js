import { Howl } from 'howler';


import sfxBeep from "./audio/sfx/menu-select.wav";
import sfxConfirm from "./audio/sfx/menu-confirm.wav";
import sfxCorrect from "./audio/sfx/answer-correct.wav";
import sfxWrong from "./audio/sfx/answer-wrong.wav";
import sfxApplause from "./audio/sfx/applause.wav";
import sfxDrumroll from "./audio/sfx/drumroll.mp3";
import sfxFanfareGood from "./audio/sfx/fanfare-good.wav";
import sfxFanfareOkay from "./audio/sfx/fanfare-okay.wav";
import sfxFanfarePoor from "./audio/sfx/fanfare-poor.wav";
import sfxFanfarePerfect from "./audio/sfx/fanfare-perfect.wav";


const sfxResources = {
    'menu-select': sfxBeep,
    'menu-confirm': sfxConfirm,
    'answer-correct': sfxCorrect,
    'answer-wrong': sfxWrong,
    'applause': sfxApplause,
    'drumroll': sfxDrumroll,
    'fanfare-good': sfxFanfareGood,
    'fanfare-okay': sfxFanfareOkay,
    'fanfare-poor': sfxFanfarePoor,
    'fanfare-perfect': sfxFanfarePerfect
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

        this.sfxList = sfxList;
    }


    play(id="", params={}) {
        if (id in this.sfxList) {
            const sound = this.sfxList[id];

            if (params.onEnd) {
                sound.on('end', params.onEnd);
            }

            if (sound.playing()) {
                sound.stop();
            }
            
            sound.play();
        }
    }
}