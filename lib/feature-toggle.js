const { initialize } = require('unleash-client');
const { unleashUrl, instanceId } = require('../config/config.js');
const logger = require('./logger.js');

const toggle = initialize({
  url: `http://${unleashUrl}:4242`,
  appName: 'room-temp-exporter',
  instanceId,
});

const active = function active(toggleName) {
  logger.info(toggleName);
  return false;
};

module.exports = [
  toggle,
  active,
];
