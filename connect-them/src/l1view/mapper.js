'use strict';

import {Play} from '../l3model/play.js';
import {playSoundNTimes, setSound, validRowCol} from '../utils.js';

// TODO: Create a separate class for the mapping of rows, cols, and diagonals. It can be an independent object.
// TODO: Place the player's names in separate positions on the screen

export class Mapper {
    constructor(params) {
        this.params = params;

        this.cellMap = new Map();
        this.lastPosition = {rowCol: 0, up: 0, down: 0};
        this.chipCellCounter = new Array(params.numberOfCols);
        this.chipCellCounter.fill(params.numberOfRows - 1);
        //
        this.welcomeElem = document.getElementById("welcome");
        this.playRoomElem = document.getElementById("play_room");
        this.startOverElem = document.getElementById("start_over");
        this.startOverElem.addEventListener('click', this.startOver('click')); // The parenthesis are intentional
        this.startOverElem.addEventListener('keyup', this.startOver('keyup')); // The parenthesis are intentional
        this.chipsElem = document.getElementById('chips');
        this.boardElem = document.getElementById('board');
        this.playerElem = document.getElementById('player_panel');
        this.goElem = document.getElementById("go");
        this.playRoomElem.removeAttribute("style");
        this.availableChipCells = params.numberOfCols;
        this.init();
    }

    //

    init() {
        this.mapChipCells();
        this.mapRowsCols();
        this.mapDiagonals();
        this.play = new Play(this.params.numberOfPlayers, this.params.winnerLineLength, this.cellMap, this.lastPosition);
        this.setPlayer();
        //
        // TODO: The sounds could be obtained from the (future) Class that treat the sounds.
        this.chipAudio = setSound('../../assets/sounds/chip.wav');
        this.doneAudio = setSound('../../assets/sounds/done.wav');
        this.winnerAudio = setSound('../../assets/sounds/winner.wav');
        this.startOverAudio = setSound('../../assets/sounds/start-over.wav');
        const ambienceAudio = setSound('../../assets/sounds/ambience.wav', true);
        ambienceAudio.play();
        ambienceAudio.volume = 0.5;
        this.startOverElem.style.display = 'block';
        // TODO: Create an independent object to treat the sounds. Make is reusable by other applications.
    }

    getLastPosition() {
        return this.lastPosition;
    }

    setPlayer() {
        const activePlayer = this.play.getActivePlayer();
        this.playerElem.style.color = activePlayer.color();
        this.playerElem.innerHTML = activePlayer.name();
    }

    mapChipCells() {
        for (let i = 0; i < this.params.numberOfCols; i++) {
            this.add().chipCell(i);
        }
    }

    mapRowsCols() {
        const {numberOfRows, numberOfCols} = ({...this.params});
        // let lastPositionRowCol = 0;
        let val, cellId, positionInRowCol;
        for (let row = 0; row < numberOfRows; row++) {
            this.add().row(row);
            for (let col = 0; col < numberOfCols; col++) {
                cellId = row + ':' + col;
                this.add().cell(cellId);
                positionInRowCol = {
                    row: (numberOfCols + 1) * row + col,
                    col: (numberOfRows + 1) * col + row,
                };
                val = this.cellMap.get(cellId);
                if (val) {
                    val.positionInRowCol = positionInRowCol;
                } else {
                    val = {
                        positionInRowCol: positionInRowCol,
                        positionInDiagonal: {},
                    };
                    this.cellMap.set(cellId, val);
                }
                this.lastPosition.rowCol = Math.max(this.lastPosition.rowCol, positionInRowCol.row, positionInRowCol.col);
            }
        }
    }

    mapDiagonals() {
        const {numberOfRows, numberOfCols} = ({...this.params});
        // @formatter:off
        const paramArr = [
            {initialRow: 0, initialCol: 0, direction: 'down', group: 'right'},
            {initialRow: 1, initialCol: 0, direction: 'down', group: 'left'},
            {initialRow: numberOfRows - 1, initialCol: 0, direction: 'up', group: 'above'},
            {initialRow: numberOfRows - 1, initialCol: 1, direction: 'up', group: 'below'},
        ];
        // @formatter:on

        let validInitialRowCol;
        let validCurrentRowCol;

        let iCol, iRow, cCol, cRow, key, val;
        let positionInDiagonal = {
            down: 0,
            up: 0,
        };

        for (let param of paramArr) {
            iRow = param.initialRow;
            iCol = param.initialCol;
            while (validRowCol(iRow, iCol, this.params)) {
                cRow = iRow;
                cCol = iCol;
                while (validRowCol(cRow, cCol, this.params)) {
                    key = cRow + ':' + cCol;
                    val = this.cellMap.get(key) || {
                        positionInRowCow: {},
                        positionInDiagonal: {},
                    };
                    val.positionInDiagonal[param.direction] = positionInDiagonal[param.direction];

                    this.lastPosition[param.direction] = Math.max(this.lastPosition[param.direction], positionInDiagonal[param.direction]);

                    positionInDiagonal[param.direction]++;

                    this.cellMap.set(key, val);
                    cRow += param.direction === 'down' ? 1 : -1;
                    cCol++;
                }
                if (param.direction === 'down') {
                    if (param.group === 'right') {
                        iRow = param.initialRow;
                        iCol++;
                    } else {
                        iRow++;
                        iCol = param.initialCol;
                    }
                } else {
                    if (param.group === 'above') {
                        iRow--;
                        iCol = param.initialCol;
                    } else {
                        iRow = param.initialRow;
                        iCol++;
                    }
                }
                positionInDiagonal[param.direction]++;
            }
        }

    }

    add() {
        const _this = this;
        return {
            row(index) {
                _this.boardElem.append(_this.build().row(index));
            },
            cell(cellId) {
                const rowId = cellId.split(':')[0];
                const cell = _this.build().cell(cellId);
                cell.innerText = cellId;
                document.getElementById(rowId).append(cell);
            },
            chipCell(index) {
                const chipCell = _this.build().chipCell(index);
                _this.chipsElem.append(chipCell);
            },
        };
    }

    build() {
        const _this = this;
        const {numberOfRows, numberOfCols} = ({..._this.params});
        return {
            row(index) {
                const rowDiv = document.createElement('div');
                rowDiv.id = index;
                rowDiv.classList.add('lineDiv');
                return rowDiv;
            },
            cell(cellId) {
                const cellDiv = document.createElement('div');
                cellDiv.id = cellId;
                cellDiv.classList.add('cellDiv');
                return cellDiv;
            },
            chip(row, col, cor) {
                const chipDiv = document.createElement('div');
                // chipDiv.setAttribute('pair', row + ':' + col );
                chipDiv.classList.add('chipDiv');
                chipDiv.style.backgroundColor = cor;
                return chipDiv;
            },
            chipCell(index) {
                const chipCell = document.createElement('div');
                // chipDiv.setAttribute('pair', row + ':' + col );
                chipCell.id = 'chipcell_' + index;
                chipCell.setAttribute('col', index);
                // chipCell.setAttribute('disabled','disabled');
                chipCell.classList.add('chipCell');
                chipCell.addEventListener('mousemove', () => {
                    if (chipCell.hasAttribute('disabled')) {
                        return false;
                    }
                    chipCell.style.backgroundColor = _this.play.getActivePlayer().color();
                });
                chipCell.addEventListener('mouseleave', () => {
                    chipCell.style.backgroundColor = 'transparent';
                });
                chipCell.addEventListener('click', () => {
                    if (chipCell.hasAttribute('disabled')) {
                        return false;
                    }
                    // chipCell.append( _this.build().chip(0,0, color ));
                    _this.anim(Number(chipCell.getAttribute('col')), 500).start();
                });

                return chipCell;
            },
        };
    }

    anim(col, interval) {
        const _this = this;
        let setIntervalId;
        let cell;
        let finalRow;
        let row;
        // let transparent = true;
        let cor;
        let cellId;
        let previousCell;
        const color = _this.play.getActivePlayer().color();
        return {
            start() {
                finalRow = _this.chipCellCounter[col];
                row = 0;
                previousCell = undefined;
                //
                _this.disableChipCells();
                setIntervalId = setInterval(this.doAnim, interval);

            },
            doAnim() {
                if (row > 0) {
                    previousCell.setAttribute('style', 'background-color: transparent !important');
                }
                _this.chipAudio.playbackRate = 2.0;
                cellId = row + ':' + col;
                cell = document.getElementById(cellId);
                cell.setAttribute('style', 'background-color: ' + color + ' !important');
                if (row === finalRow) {
                    _this.doneAudio.play();
                    clearInterval(setIntervalId);
                    // 16777215
                    cell.classList.add('initials');
                    // const inverted = invertColor(color);
                    // cell.style.textShadow = "0px 5px 5px " + inverted;
                    cell.innerText = _this.play.getActivePlayer().initials();
                    if (_this.play.update(_this.play.getActivePlayer(), cellId)) {
                        _this.winner();
                        return;
                    }
                    _this.setPlayer();
                    _this.chipCellCounter[col]--;
                    if (_this.chipCellCounter[col] < 0) {
                        document.getElementById('chipcell_' + col).setAttribute('style', 'visibility: hidden');
                        if (--_this.availableChipCells === 0) {
                            _this.tie();
                            return;
                        }
                    }
                    _this.enableChipCells();
                } else {
                    _this.chipAudio.play();
                    row++;
                }
                previousCell = cell;

            }
        };
    }

    tie() {
        this.playerElem.innerHTML = "TIE";
        this.playerElem.classList.add('pulse');
        const fail = setSound('../../assets/sounds/fail.mp3');
        fail.volume = 0.5;
        fail.play();
    }

    winner() {
        this.playerElem.innerHTML = "WINNER <br />" + this.play.getActivePlayer().name();
        this.playerElem.classList.add('winner', 'pulse', 'glow');
        // TODO: Set default volume in a config file
        this.winnerAudio.volume = 0.3;
        playSoundNTimes(this.winnerAudio, 3);
        // TODO: Highlight the winner cells
    }

    disableChipCells() {
        document.querySelectorAll('.chipCell').forEach((cell) => cell.setAttribute('disabled', 'true'));
    }

    enableChipCells() {
        document.querySelectorAll('.chipCell').forEach((cell) => cell.removeAttribute('disabled'));
    }

    /*
     Testing a closure technique
     */
    startOver(e) {
        const _this = this;
        const so = this.startOverElem;
        const w = this.welcomeElem;
        const pr = this.playRoomElem;
        let click = 0;
        return (e) => {
            if (++click === 1) {
                so.innerText = 'Start Over?';
                so.classList.add('highlight', 'shake');
                _this.startOverAudio.play();
                // const rect = _this.playRoomElem.getBoundingClientRect();
                setTimeout(() => {
                    so.innerText = 'Start Over';
                    click = 0;
                    so.classList.remove('shake', 'highlight');
                    this.startOverAudio.pause();
                }, 3000);

            } else {
                this.startOverAudio.pause();
                so.style.display = 'none';
                pr.style.display = 'none';
                _this.chipsElem.innerHTML = '';
                _this.boardElem.innerHTML = '';
                w.style.display = 'flex';
                _this.playerElem.classList.remove('pulse', 'winner');
                _this.goElem.style.display = 'block';
            }
        }
    }
}
