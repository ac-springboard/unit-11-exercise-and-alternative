'use strict';

import {Player}          from '../l3model/player.js';
import {randomIntInclusive} from '../utils.js';

export class Play {
  constructor(numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers;
    this.players         = [];
    this.init();
  }

  init() {
    this.mapPlayers();
    this.activePlayerIndex = randomIntInclusive( 0, this.numberOfPlayers - 1 );
  }

  getActivePlayer(){
    return this.players[ this.activePlayerIndex ];
  }

  mapPlayers() {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      this.players.push(new Player(i));
    }
  }
}
