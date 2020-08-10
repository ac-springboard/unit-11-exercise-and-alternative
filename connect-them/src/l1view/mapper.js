'use strict';

import {Play}        from '../l3model/play.js';
import {validRowCol} from '../utils.js';

export class Mapper {
  constructor(params) {
    this.params     = params;
    this.cellMap    = new Map();
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
    this.play = new Play(this.params.numberOfPlayers);
    this.setPlayer();

    // this.mapPlayers();
    // console.log('MAP', this.cellMap);
  }

  setPlayer() {
    console.log('activePlayer:', this.play.getActivePlayer());
    const activePlayer                    = this.play.getActivePlayer();
    this.playerElem.style.color = activePlayer.color();
    this.playerElem.innerText             = activePlayer.name();
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
        const chipCell = _this.build().chipCell();
        chipCell.id    = 'chipCell_' + index;
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
      chip(row, col) {
        const chipDiv = document.createElement('div');
        // chipDiv.setAttribute('pair', row + ':' + col );
        chipDiv.classList.add('chipDiv');
        return chipDiv;
      },
      chipCell() {
        const chipCell = document.createElement('div');
        // chipDiv.setAttribute('pair', row + ':' + col );
        chipCell.classList.add('chipCell');
        return chipCell;
      },
    };
  }
}
