'use strict';

export default class Init {
  constructor(numberOfPlayers, numberOfRows, numberOfCols, winnerLineLength) {
    this.params = {
      numberOfPlayers,
      numberOfRows,
      numberOfCols,
      winnerLineLength,
    };
    this.init();
  }


  init() {
    console.log('Init.init()');
    /**
     * I'm assuming that some developer can call instantiate the this class directly
     * without passing through the front-end. I this case, it will get an error.
     */
    if (!this.isValidInput()) {
      console.error( 'ERROR! Invalid input data:', this.params );
    }
  }

  isValidInput() {
    return this.params.numberOfPlayers > 0 &&
           (
               (this.params.numberOfRows >= this.params.winnerLineLength && this.params.numberOfCols > 1) ||
               (this.params.numberOfCols >= this.params.winnerLineLength && this.params.numberOfRows > 1)
           );
  }

}

// export { Init }
