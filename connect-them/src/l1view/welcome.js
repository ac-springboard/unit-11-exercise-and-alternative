'use strict';

import {Controller} from '../l2controller/controller.js';

const params = {
  numberOfPlayers: 2,
  numberOfRows: 5,
  numberOfCols: 6,
  winnerLineLength: 4
}
const controller = new Controller();
controller.initGame( params );
