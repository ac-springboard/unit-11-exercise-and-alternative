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
    console.log('Please, remember to allow Chrome to play sounds:');
    console.log('chrome://settings/content/sound?search=sound');

    if (!isValidInput(this.params)) {
      console.error('ERROR! Invalid input data:', this.params);
      // TODO: back to the Welcome Page
      return;
    }

    // TODO: HOW IS THIS VAR USED?
    const mapper = new Mapper(this.params);
  }

}

