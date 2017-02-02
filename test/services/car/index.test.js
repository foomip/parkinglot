'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('car service', function() {
  it('registered the cars service', () => {
    assert.ok(app.service('cars'));
  });
});
