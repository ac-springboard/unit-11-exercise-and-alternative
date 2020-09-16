'use strict';

// TODO: Make this a class

import {Controller} from '../l2controller/controller.js';
import {isValidInput, setSound} from "../utils.js";

// const params = {
//   numberOfPlayers: 2,
//   numberOfRows: 4,
//   numberOfCols: 6,
//   winnerLineLength: 3
// }

const change = setSound('../../assets/sounds/borg-1.mp3');
change.playbackRate = 4.0;
const fail = setSound('../../assets/sounds/fail.mp3');
fail.volume = 0.5;
const ambienceAudio = setSound('../../assets/sounds/ambience.wav', true);
ambienceAudio.play();
// TODO: Set default volume in a config file
ambienceAudio.volume = 0.5;

// TODO: Get these data from Mapper (?)
const getParams = () => {
    return {
        numberOfPlayers: Number(document.getElementById("n_players").value),
        numberOfRows: Number(document.getElementById("n_rows").value),
        numberOfCols: Number(document.getElementById("n_cols").value),
        winnerLineLength: Number(document.getElementById("n_winner").value)
    }
}

const error = document.getElementById("error");
const go = document.getElementById("go");
const welcome = document.getElementById('welcome');
const play = document.getElementById("play");
const main = document.getElementById("main");

// const params =

const inputs = document.querySelectorAll('.params_input');
for (let i of inputs) {
    i.addEventListener('change', () => {
        change.play();
    });
}

go.addEventListener('click', (e) => {
    const params = getParams();
    if (!isValidInput(params)) {
        fail.play();
        error.innerText = "Invalid data. Try again!";
        setTimeout(() => {
            error.innerText = ""
        }, 3000);
    } else {
        welcome.style.display = 'none';
        go.style.display = 'none';
        main.style.display = 'inherit';
        play.style.display = 'inline-block';
        new Controller().initGame(params);
    }
});


// controller.initGame( params );

