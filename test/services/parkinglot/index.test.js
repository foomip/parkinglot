'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('parkinglot service', function() {
  it('registered the parkinglots service', () => {
    assert.ok(app.service('parkinglots'));
  });
});
