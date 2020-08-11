'use strict';

import {Controller} from '../l2controller/controller.js';

const params = {
  numberOfPlayers: 2,
  numberOfRows: 3,
  numberOfCols: 4,
  winnerLineLength: 3
}
const controller = new Controller();
controller.initGame( params );
