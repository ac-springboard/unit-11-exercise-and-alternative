'use strict';

const inRange = (val, lower, higher) => val >= lower && val <= higher;

const validRowCol = (row, col, params) =>
    inRange(row, 0, params.numberOfRows - 1) &&
    inRange(col, 0, params.numberOfCols - 1);

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
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

export {validRowCol, randomColor, isValidInput, randomIntInclusive}
