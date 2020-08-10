'use strict';

const inRange = (val, lower, higher) => val >= lower && val  <= higher;

const validRowCol = (row, col, params) =>
    inRange(row, 0, params.numberOfRows - 1) &&
    inRange(col, 0, params.numberOfCols - 1);

export { validRowCol }
