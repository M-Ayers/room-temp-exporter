const {
  HUE_IP_ADDR,
  HUE_API_KEY,
  MQTT_IP_ADDR,
  TOGGLE_TYPE,
  UNLEASH_IP_ADDR,
  UNLEASH_INSTANCE_ID,
  PORT,

} = process.env;

module.exports = {
  port: PORT,
  hueUrl: `http://${HUE_IP_ADDR}/api/${HUE_API_KEY}/sensors`,
  mqttUrl: `mqtt://${MQTT_IP_ADDR}:1883`,
  unleashUrl: `http://${UNLEASH_IP_ADDR}:4242`,
  unleashInstanceId: UNLEASH_INSTANCE_ID,
  toggleType: TOGGLE_TYPE,
};
