'use strict';

import {Controller} from '../l2controller/controller.js';

const params = {
  numberOfPlayers: 2,
  numberOfRows: 8,
  numberOfCols: 7,
  winnerLineLength: 4
}
const controller = new Controller();
controller.initGame( params );
