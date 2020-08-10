'use strict';

import {Mapper}       from '../l1view/mapper.js';
import {isValidInput} from '../utils.js';

export default class Init {
  // constructor({numberOfPlayers, numberOfRows, numberOfCols, winnerLineLength}) {
  constructor(params) {
    this.params = params;
    this.init();
  }

  init() {
    console.log('Init.init()...');
    if (!isValidInput(this.params)) {
      console.error('ERROR! Invalid input data:', this.params);
    }

    // TODO: HOW IS THIS VAR USED?
    const mapper = new Mapper(this.params);
  }

}

