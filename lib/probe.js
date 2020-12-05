const axios = require('axios');
const { hueUrl } = require('../config/config');
const convert = require('./convert');

function parseUId(data, key) {
  return data[key].uniqueid.split('-')[0];
}

function getSensors(data) {
  const hueSensor = {};
  Object.keys(data).forEach((key) => {
    if (data[key].type === 'ZLLTemperature') {
      const uId = parseUId(data, key);
      Object.keys(data).forEach((parentSensorKey) => {
        if (data[parentSensorKey].type === 'ZLLPresence' && parseUId(data, parentSensorKey) === uId) {
          if (!hueSensor[data[parentSensorKey].name]) {
            hueSensor[data[parentSensorKey].name] = {
              temp: 0,
              lightlevel: 0,
            };
          }

          hueSensor[
            data[
              parentSensorKey
            ].name.temp
          ] = convert(
            data[key].state.temperature / 100,
          ).toFixed(2);
        }
      });
    }
    if (data[key].type === 'ZLLLightLevel') {
      const uId = parseUId(data, key);
      Object.keys(data).forEach((parentSensorKey) => {
        if (data[parentSensorKey].type === 'ZLLPresence' && parseUId(data, parentSensorKey) === uId) {
          if (!hueSensor[data[parentSensorKey].name]) {
            hueSensor[data[parentSensorKey].name] = {
              temp: 0,
              lightlevel: 0,
            };
          }
          hueSensor[data[parentSensorKey].name.lightlevel] = data[key].state.lightlevel;
        }
      });
    }
  });
  return hueSensor;
}

function getData() {
  return axios.get(hueUrl).then((response) => getSensors(response.data));
}

module.exports = {
  getData,
  parseUId,
  getSensors,
};
