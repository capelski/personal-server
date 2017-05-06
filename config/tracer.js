var config = require('./config');
var tracer = require('../utils/tracer');

tracer.setTraceLevel(config.logs.tracerLevel);

module.exports = tracer;
