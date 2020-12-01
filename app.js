const express = require('express');
const bodyParser = require('body-parser');
const promClient = require('prom-client');
const schedule = require('node-schedule');

const logger = require('./lib/logger');
const metrics = require('./lib/metrics');
const publish = require('./lib/publish');
const probe = require('./lib/probe');
const { port } = require('./config/config');

const app = express();

const PORT = port || 3030;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/metrics');
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.contentType);
  res.end(promClient.register.metrics());
});

app.listen(PORT, () => {
  logger.info(`[STARTUP] Exporter is listening on ${PORT} at /metrics`);
});

const createJob = async () => {
  const tempCheckScheduleRule = new schedule.RecurrenceRule();
  tempCheckScheduleRule.second = [0, 30];

  schedule.scheduleJob(tempCheckScheduleRule, async () => {
    const data = await probe.getData();
    Object.keys(data).forEach((sensor) => {
      publish(sensor, data[sensor]);
    });
  });
};

createJob();

module.exports = app;
