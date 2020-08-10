'use strict';

import { Elems } from '../l1view/elems.js';

export default class Init {
  // constructor({numberOfPlayers, numberOfRows, numberOfCols, winnerLineLength}) {
  constructor(params) {
    this.params = params;
    this.init();
  }


  init() {
    console.log('Init.init()');
    if (!this.isValidInput()) {
      console.error( 'ERROR! Invalid input data:', this.params );
    }

    // TODO: HOW IS THIS VAR USED?
    const elems = new Elems(this.params.numberOfRows, this.params.numberOfCols);
  }

  /**
   * Validates the data provided on the Welcome Page or when this class is
   * intentionally initiated bypassing the front-end.
   *
   * @returns {boolean|boolean}
   */
  // TODO: THIS FUNCTION SHOULD BE ELSEWHERE
  // TODO: ADD THE EXPLANATION ABOUT THE CONDITIONS
  isValidInput() {
    const { numberOfPlayers, numberOfRows, numberOfCols, winnerLineLength } = ({...this.params});
    return numberOfPlayers > 0 &&
           numberOfPlayers < Math.floor( numberOfRows * numberOfCols / numberOfPlayers ) &&
           (
               (numberOfRows >= winnerLineLength && numberOfCols > 1) ||
               (numberOfCols >= winnerLineLength && numberOfRows > 1)
           );
  }


}

