const {
  HUE_IP_ADDR,
  HUE_API_KEY,
  MQTT_IP_ADDR,
  PORT,
} = process.env;

module.exports = {
  port: PORT,
  hueUrl: `http://${HUE_IP_ADDR}/api/${HUE_API_KEY}/sensors`,
  mqttUrl: `mqtt://${MQTT_IP_ADDR}:1883`,
};
