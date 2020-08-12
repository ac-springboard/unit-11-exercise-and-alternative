'use strict';

import {Controller} from '../l2controller/controller.js';

const params = {
  numberOfPlayers: 3,
  numberOfRows: 5,
  numberOfCols: 7,
  winnerLineLength: 4
}
const controller = new Controller();
controller.initGame( params );
