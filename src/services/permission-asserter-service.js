const assert = require('assert');
const User = require('../models/user');
const HttpStatus = require('http-status-codes');

const assertOwner = (object, user) => {
  assert.strictEqual(object.owner_id, user.id);
}

const assertMember = (memberIds, user) => {
  const userId = user.id;
  const found = memberIds.find(id => id === userId);
  assert.strictEqual(found.length, 1);
}

module.exports = {
  assertOwner,
  assertMember
};
