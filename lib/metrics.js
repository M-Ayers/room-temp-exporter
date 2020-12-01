const { Gauge } = require('prom-client');

const gauge = (metric = {}) => new Gauge({
  name: metric.name,
  help: metric.help,
  labelNames: metric.labelNames,
});

module.exports = {
  refrigeratortemp: gauge({
    name: 'room_temp_exporter_refrigerator_temp',
    help: 'Refrigerator Temperature Metric',
    labelNames: [],
  }),
  freezertemp: gauge({
    name: 'room_temp_exporter_freezer_temp',
    help: 'Freezer Temperature Metric',
    labelNames: [],
  }),
  refrigeratorlightlevel: gauge({
    name: 'room_temp_exporter_refrigerator_lightlevel',
    help: 'Refrigerator Light Level Metric',
    labelNames: [],
  }),
  freezerlightlevel: gauge({
    name: 'room_temp_exporter_freezer_lightlevel',
    help: 'Freezer Light Level Metric',
    labelNames: [],
  }),
};
