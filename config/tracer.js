var tracer = require('../utils/tracer');

const configureTracer = config => {
    tracer.setTraceLevel(config.logs.tracerLevel);
    return tracer
};

module.exports = { configureTracer };
