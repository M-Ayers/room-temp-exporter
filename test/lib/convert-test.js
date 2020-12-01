/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable quote-props */
const test = require('ava');

const convert = require('../../lib/convert');
const dataFile = require('../resources/sample.json');

test('convert()', (t) => {
  t.is(convert(30), 86)
});
