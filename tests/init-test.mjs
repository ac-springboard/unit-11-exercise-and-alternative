'use strict';

import Init from '../connect-them/src/model/init.mjs';

describe('Init Tests', () => {

  let init;
  // @formatter:off
  const testData = [
          {result: true, params:[ 2, 5, 5, 5]},
          {result: false, params:[ 2, 5, 5, 6]}
        ];
  // @formatter:on
  describe('Input Data Tests', () => {
    testData.forEach(obj => {
      it('should return ' + obj.result + ' for the set of data ' + obj.params, () => {
        init = new Init(...obj.params);
        expect(init.isValidInput()).toBe(obj.result);
      });
    });
  });
});
