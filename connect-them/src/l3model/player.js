'use strict';

import {randomColor} from '../utils.js';

export class Player {
  constructor(number) {
    this.cor  = randomColor();
    this.nome = 'Player #' + (number + 1);
  }

  color() {
    return this.cor;
  }

  name() {
    return this.nome;
  }
}

