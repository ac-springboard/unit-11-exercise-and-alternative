'use strict';

import Init from '../l3model/init.js';

// TODO: This file doesn't make sense in the way it is. The application needs architecture improvements.

export class Controller{
  initGame(params){
    const init = new Init( params );
  }
}
