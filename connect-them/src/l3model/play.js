'use strict';

import {Player} from '../l3model/player.js';
import {randomIntInclusive} from '../utils.js';

export class Play {
    constructor(numberOfPlayers, winnerLineLength, cellMap, lastPosition) {
        this.numberOfPlayers = numberOfPlayers;
        this.winnerLineLength = winnerLineLength;
        this.lastPosition = lastPosition;
        this.cellMap = cellMap;
        this.players = [];
        this.init();
    }

    init() {
        this.mapPlayers();
        this.activePlayerIndex = randomIntInclusive(0, this.numberOfPlayers - 1);
        this.mapPositionArrays();
    }

    mapPositionArrays() {
        this.rowsArr = new Array(this.lastPosition.rowCol);
        this.rowsArr.fill('.', 0);
        this.colsArr = new Array(this.lastPosition.rowCol);
        this.colsArr.fill('.', 0);
        this.downArr = new Array(this.lastPosition.down);
        this.downArr.fill('.', 0);
        this.upArr = new Array(this.lastPosition.up);
        this.upArr.fill('.', 0);
    }

    getActivePlayer() {
        return this.players[this.activePlayerIndex];
    }

    setNextActivePlayer() {
        let active = this.activePlayerIndex;
        this.activePlayerIndex = ++active > this.numberOfPlayers - 1 ? 0 : active;
    }

    mapPlayers() {
        for (let i = 0; i < this.numberOfPlayers; i++) {
            this.players.push(new Player(i, this.winnerLineLength));
        }
    }

    update(player, cellId) {
        const positions = this.cellMap.get(cellId);
        const symbol = player.symbol();
        this.rowsArr[positions.positionInRowCol.row] = symbol;
        this.colsArr[positions.positionInRowCol.col] = symbol;
        this.downArr[positions.positionInDiagonal.down] = symbol;
        this.upArr[positions.positionInDiagonal.up] = symbol;
        const winner = this.isWinner(player.winnerString());
        if (winner) {
            return true;
        }
        this.setNextActivePlayer();
        return false;
    }

    isWinner(winnerLine) {
        return (this.rowsArr.join('').match(winnerLine) ||
            this.colsArr.join('').match(winnerLine) ||
            this.downArr.join('').match(winnerLine) ||
            this.upArr.join('').match(winnerLine));
    }

}
