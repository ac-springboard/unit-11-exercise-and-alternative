'use strict';

const setSound = (path, loop) => {
    const audio = new Audio(path);
    audio.loop = loop;
    return audio;
}


// TODO: Create an independent object to treat sounds
const playSoundNTimes = async (audio, count, callback) => {
    return new Promise(async (resolve, reject) => {
        let aCopy = new Audio(audio.getAttribute('src'));
        aCopy.loop = false;
        const endedHandler = async (e) => {
            if (--count > 0) {
                await aCopy.play();
            } else {
                callback();
            }
        };
        aCopy.addEventListener('ended', endedHandler, false);
        await aCopy.play();
        return resolve;
    });
};

// const nextSound = (sounds) => playSoundsNTimes(sounds);

const playSoundsNTimes = async (sounds) => {
    let idx = 0;
    let pr;
    let s, t;
    const play = () => {
        if (idx >= sounds.length) {
            return;
        }
        s = sounds[idx].sound;
        t = sounds[idx].times;
        playSoundNTimes(s, t, play);
        idx++;
    }
    play();
}

const inRange = (val, lower, higher) => val >= lower && val <= higher;

const validRowCol = (row, col, params) =>
    inRange(row, 0, params.numberOfRows - 1) &&
    inRange(col, 0, params.numberOfCols - 1);

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

const invertColor = (color) => {
    const colorSubstr = '0x' + color.substr(1);
    // const colorNumber = colorSubstr.toString(10);
    const inverted = '0xffffff' ^ colorSubstr;
    const invertedHex = inverted.toString(16);
    return '#' + invertedHex;
}
// const randomColor = () => `rgb( randomIntInclusive(0,255), randomIntInclusive(0,255),
// randomIntInclusive(0,255) )`;

/**
 * Validates the data provided on the Welcome Page or when this class is
 * intentionally initiated bypassing the front-end.
 *
 * @returns {boolean|boolean}
 */
    // TODO: ADD THE EXPLANATION ABOUT THE CONDITIONS
const isValidInput = (params) => {
        const {numberOfPlayers, numberOfRows, numberOfCols, winnerLineLength} = ({...params});
        return numberOfPlayers > 0 &&
            numberOfPlayers < Math.floor(numberOfRows * numberOfCols / numberOfPlayers) &&
            (
                (numberOfRows >= winnerLineLength && numberOfCols > 1) ||
                (numberOfCols >= winnerLineLength && numberOfRows > 1)
            );
    };

const randomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export {
    setSound,
    playSoundNTimes,
    playSoundsNTimes,
    validRowCol,
    randomColor,
    invertColor,
    isValidInput,
    randomIntInclusive
}
