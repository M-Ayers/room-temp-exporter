const test = require('ava');

const PreviousReading = require('../../lib/previous-reading');
const dataFile = require('../resources/sample.json');

test('PreviousReading', (t) => {
  const testKey = 'Mario';
  const testValues = {'Series': 'Brothers'};
  PreviousReading.add(testKey, testValues);
  t.deepEqual(PreviousReading.get(testKey), testValues);
});
