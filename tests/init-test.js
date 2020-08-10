'use strict';

import Init from 'connect-them/src/l3model/init.js';

describe('Init Tests', () => {

  let init;
  // @formatter:off
  const testData = [
          {result: true,  params:[ 2, 5, 5, 5]},
          {result: false, params:[ 0, 5, 5, 5]},
          {result: false, params:[ 2, 3, 2, 4]},
          {result: false, params:[ 2, 2, 3, 4]},
          {result: true,  params:[ 2, 2, 3, 3]},
          {result: false, params:[ 2, 1, 3, 3]},
        ];
  // @formatter:on

  describe('Input Data Test Validation', () => {
    testData.forEach(obj => {
      it('should return ' + obj.result + ' for this set of data:[' + obj.params + ']', () => {
        init = new Init(...obj.params);
        expect(init.isValidInput()).toBe(obj.result);
      });
    });
  });
});
