'use strict';

import {validRowCol} from '../utils.js';

export class Elems {
  constructor(numberOfRows, numberOfCols) {
    this.params    = {
      numberOfRows,
      numberOfCols,
    };
    this.cellMap   = new Map();
    //
    this.container = document.getElementById('container');
    this.init();
  }

  init() {
    this.mapRowsCols();
    this.mapDiagonals();
    console.log('MAP', this.cellMap);
  }

  mapRowsCols() {
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
        console.log( 'val:', val );
        if (val) {
          val.positionInRowCol = positionInRowCol;
        } else {
          val = { positionInRowCol: positionInRowCol, positionInDiagonal: {} };
          this.cellMap.set(cellId, val );
        }
        console.log(cellId, val);
        // this.cellMap.set( row+':'+col, { pl: (nc+1)*l+c, pc: (nl+1)*c+l });
      }
      ec++;
    }
  }

  mapDiagonals() {
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
        _this.container.append(_this.build().row(index));
        // console.log('add row');
      },
      cell(cellId) {
        const lineId   = cellId.split(':')[0];
        const cell     = _this.build().cell(cellId);
        cell.innerText = cellId;
        document.getElementById(lineId).append(cell);
        // console.log('add cell');
      },
      cellMapEntry() {
        console.log('add entry');
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
      cellMapValue(row, col) {
        // console.log('calculate value');
        return {
          positionInRow: (numberOfCols + 1) * numberOfRows + col,
          positionInCol: (numberOfRows + 1) * numberOfCols + l,
        };
      },
    };
  }
}
