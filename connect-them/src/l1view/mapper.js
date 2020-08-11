'use strict';

import {Play}        from '../l3model/play.js';
import {validRowCol} from '../utils.js';

export class Mapper {
  constructor(params) {
    this.play            = new Play(params.numberOfPlayers);
    this.params          = params;
    this.cellMap         = new Map();
    //
    this.chipCellCounter = new Array(params.numberOfCols);
    this.chipCellCounter.fill(params.numberOfRows - 1);
    //
    this.chipsElem  = document.getElementById('chips');
    this.boardElem  = document.getElementById('board');
    this.playerElem = document.getElementById('player');
    this.init();
  }

  init() {
    this.mapChipCells();
    this.mapRowsCols();
    this.mapDiagonals();
    this.setPlayer();

    // this.mapPlayers();
    // console.log('MAP', this.cellMap);
  }

  setPlayer() {
    console.log('activePlayer:', this.play.getActivePlayer());
    const activePlayer          = this.play.getActivePlayer();
    this.playerElem.style.color = activePlayer.color();
    this.playerElem.innerText   = activePlayer.name();
  }

  mapChipCells() {
    for (let i = 0; i < this.params.numberOfCols; i++) {
      this.add().chipCell(i);
    }
  }

  mapRowsCols() {
    // console.log( 'mapRowsCols()');
    const {numberOfRows, numberOfCols} = ({...this.params});
    let ec                             = 0;
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
        val              = this.cellMap.get(cellId);
        // console.log('val:', val);
        if (val) {
          val.positionInRowCol = positionInRowCol;
        } else {
          val = {
            positionInRowCol  : positionInRowCol,
            positionInDiagonal: {},
          };
          this.cellMap.set(cellId, val);
        }
        // console.log(cellId, val);
        // this.cellMap.set( row+':'+col, { pl: (nc+1)*l+c, pc: (nl+1)*c+l });
      }
      ec++;
    }
  }

  mapDiagonals() {
    // console.log( 'mapDiagonals()');
    const {numberOfRows, numberOfCols} = ({...this.params});
    // @formatter:off
    const paramArr = [
      { initialRow: 0,                initialCol: 0, direction: 'down', group: 'right' },
      { initialRow: 1,                initialCol: 0, direction: 'down', group: 'left'  },
      { initialRow: numberOfRows - 1, initialCol: 0, direction: 'up',   group: 'above' },
      { initialRow: numberOfRows - 1, initialCol: 1, direction: 'up',   group: 'below' },
    ];
    // @formatter:on

    let validInitialRowCol;
    let validCurrentRowCol;

    let iCol, iRow, cCol, cRow, key, val;
    let positionInDiagonal = {
      down: 0,
      up  : 0,
    };

    for (let param of paramArr) {
      iRow = param.initialRow;
      iCol = param.initialCol;
      while (validRowCol(iRow, iCol, this.params)) {
        cRow = iRow;
        cCol = iCol;
        while (validRowCol(cRow, cCol, this.params)) {
          key                                     = cRow + ':' + cCol;
          val                                     = this.cellMap.get(key) || {
            positionInRowCow  : {},
            positionInDiagonal: {},
          };
          val.positionInDiagonal[param.direction] = positionInDiagonal[param.direction];
          positionInDiagonal[param.direction]++;

          this.cellMap.set(key, val);
          // console.log(iRow, iCol, cRow, cCol, key, val);
          cRow += param.direction === 'down' ? 1 : -1;
          cCol++;
        }
        // console.log('------------------');
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

    // console.log('cellMap', this.cellMap);

  }

  add() {
    const _this = this;
    // console.log( 'append');
    return {
      row(index) {
        _this.boardElem.append(_this.build().row(index));
        // console.log('add row');
      },
      cell(cellId) {
        // console.log( 'in cellId');
        const rowId    = cellId.split(':')[0];
        const cell     = _this.build().cell(cellId);
        cell.innerText = cellId;
        document.getElementById(rowId).append(cell);
        // console.log('add cell');
      },
      chipCell(index) {
        const chipCell = _this.build().chipCell(index);
        // chipCell.id    = 'chipCell_' + index;
        _this.chipsElem.append(chipCell);
      },
    };
  }

  build() {
    const _this                        = this;
    const {numberOfRows, numberOfCols} = ({..._this.params});
    return {
      row(index) {
        // console.log('build row');
        const rowDiv = document.createElement('div');
        rowDiv.id    = index;
        rowDiv.classList.add('lineDiv');
        return rowDiv;
      },
      cell(cellId) {
        // console.log('build cell');
        const cellDiv = document.createElement('div');
        cellDiv.id    = cellId;
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
        chipCell.id    = 'chipcell_' + index;
        chipCell.setAttribute('col', index);
        chipCell.classList.add('chipCell');
        const color = _this.play.getActivePlayer().color();
        chipCell.addEventListener('mouseenter', () => {
          chipCell.style.backgroundColor = color;
        });
        chipCell.addEventListener('mouseleave', () => {
          chipCell.style.backgroundColor = 'transparent';
        });
        chipCell.addEventListener('click', () => {
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
        finalRow      = _this.chipCellCounter[col];
        row           = 0;
        previousCell  = undefined;
        //
        setIntervalId = setInterval(this.doAnim, interval);
      },
      doAnim() {
        if (row > 0) {
          previousCell.setAttribute('style', 'background-color: transparent !important');
        }
        cellId = row + ':' + col;
        cell   = document.getElementById(cellId);
        cell.setAttribute('style', 'background-color: ' + color + ' !important');
        if (row === finalRow) {
          clearInterval(setIntervalId);
          _this.chipCellCounter[col]--;
          _this.play.setNextActivePlayer();
          _this.setPlayer();
          if (_this.chipCellCounter[col] < 0) {
            document.getElementById('chipcell_' + col).setAttribute('style', 'visibility: hidden');
          }
        } else {
          row++;
        }
        previousCell = cell;
      },
    };
  }
}
