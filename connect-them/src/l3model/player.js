'use strict';

import {randomColor} from 'connect-them/src/utils.js';

export class Player {
  constructor( number ){
    this.player = {
      number,
      color: randomColor()
    }
  }
}
