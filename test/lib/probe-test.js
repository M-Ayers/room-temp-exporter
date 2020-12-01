/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable quote-props */
const test = require('ava');

const probe = require('../../lib/probe');
const dataFile = require('../resources/sample.json');

test('probe.parseUid()', (t) => {
  t.is(probe.parseUId(dataFile, '11'), '00:01:02:03:04:05:06:07');
});

test('probe.getSensors()', (t) => {
  t.deepEqual(probe.getSensors(dataFile), {
    'Room Sensor 1': {lightlevel: 0, temp: '74.68'},
    'Room Sensor 2': {lightlevel: 50, temp: '77.27'},
  });
});
