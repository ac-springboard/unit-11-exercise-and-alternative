'use strict';

// TODO: This should be a class!

import {Controller} from '../l2controller/controller.js';
import {isValidInput, setSound} from "../utils.js";

const change = setSound('../../assets/sounds/borg-1.mp3');
change.playbackRate = 4.0;
const fail = setSound('../../assets/sounds/fail.mp3');
// TODO: Set default volume in a config file
fail.volume = 0.5;

// TODO: Get these data from Mapper (?)
// TODO: Play against the computer

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
const play_room = document.getElementById("play_room");
const main = document.getElementById("main");

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
        play_room.style.display = 'inline-block';
        new Controller().initGame(params);
    }
});

function tickerAnim() {
    const tickerElem = document.getElementById("ticker");
    let intv;
    let x = tickerElem.getBoundingClientRect().x;
    let w = tickerElem.offsetWidth;
    let h = tickerElem.offsetHeight;
    // tickerElem.style.minWidth = ( w  + 20 )+ 'px';
    tickerElem.style.minHeight = h + 'px';
    const move = () => {
        x -= 10;
        if (x < -1 * w) {
            x = window.innerWidth;
        }
        tickerElem.style.left = x + "px";
    };
    return {
        start: () => {
            intv = setInterval(move, 150);
        },
        stop: () => {
            clearInterval(intv);
        }
    }
}

const startTicker = tickerAnim();
startTicker.start();

