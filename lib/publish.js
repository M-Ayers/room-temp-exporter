const mqtt = require('mqtt');
const _ = require('lodash');
const { freezertemp, refrigeratortemp, freezerlightlevel, refrigeratorlightlevel } = require('./metrics');
const logger = require('./logger');
const { mqttUrl } = require('../config/config.js');
const PreviousReading = require('./previous-reading');

const client = mqtt.connect(mqttUrl);

function publishMQTT(roomName, tempF) {
  const pub = `{"temperature":${tempF}}`;
  client.publish(`sensors/temp/${roomName.replace(/ /g, '_')}`, `${pub}`);
}

function publishProm(roomName, tempF, lux) {
  if (roomName.includes('freezer')) {
    freezertemp.set(tempF);
    freezerlightlevel.set(lux);
  } else if (roomName.includes('refrigerator')) {
    refrigeratortemp.set(tempF);
    refrigeratorlightlevel.set(lux);
  }
}

module.exports = function publish(roomName, data) {
  const currentState = PreviousReading.get(roomName);
  const temp = data;
  temp.id = roomName;
  logger.debug(`Current State: ${JSON.stringify(currentState)} ||| New State: ${JSON.stringify(temp)}`);
  if (!_.isEqual(currentState, temp)) {
    logger.info(`Updated: ${roomName}: ${JSON.stringify(data)}`);
    publishMQTT(roomName, parseFloat(data.temp));
    publishProm(roomName, parseFloat(data.temp), parseInt(data.lightlevel));
    PreviousReading.add(roomName, data);
  } else {
    logger.debug(`Not updated: ${roomName}: ${JSON.stringify(data)}`);
  }
};
