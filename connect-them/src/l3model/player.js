'use strict';

import {randomColor} from '../utils.js';

export class Player {
  constructor(number, winnerLineLength) {
    this.cor     = randomColor();
    this.nome    = 'Player #' + (number + 1);
    this.iniciais = 'P' + (number + 1 );
    this.symbolo = String.fromCharCode(57 + number);
    this.string  = this.symbolo.repeat(winnerLineLength);
  }

  color() {
    return this.cor;
  }

  name() {
    return this.nome;
  }

  initials(){
    return this.iniciais;
  }

  symbol() {
    return this.symbolo;
  }

  winnerString() {
    return this.string;
  }
}

