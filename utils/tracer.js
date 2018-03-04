const winston = require('winston');
const { digitPrepender } = require('./format');

let traceLevel = 'log';
let stackLevel = 0;

const formatter = value => digitPrepender(value, 0, 2);

const getTimestamp = () => {
    var currentDate = new Date();
    var timestamp = formatter(
        currentDate.getHours()) + ':' + formatter(currentDate.getMinutes()) + ':' +
        formatter(currentDate.getSeconds());
    return timestamp;
};

const evaluateArguments = (suppliedArguments) => {
    for (var index in suppliedArguments) {
        var argument = suppliedArguments[index];
        if (typeof argument === "undefined" || argument == null) {
            winston.info('Parameter ' + index + ' is null or undefined...');
        }
    }
};

const logArguments = (suppliedArguments) => {
    var stringifiedArguments = '(';
    var keysNumber = Object.keys(suppliedArguments).length;
    for (var index in suppliedArguments) {
        var argument = suppliedArguments[index];
        if (typeof argument === 'object') {
            stringifiedArguments += '{}';
        }
        else if (typeof argument === 'function') {
            stringifiedArguments += argument.name + '()';
        }
        else {
            stringifiedArguments += argument;
        }
        keysNumber--;
        if (keysNumber > 0) {
            stringifiedArguments += ', ';
        }
    }
    stringifiedArguments += ')';
    return stringifiedArguments;
};

const setTraceLevel = level => traceLevel = level;

const tracers = {
    error: (functionExpression, thisObject) => {
        return function() {
            try {
                return functionExpression.apply(thisObject, arguments);
            }
            catch (error) {
                winston.error(functionExpression.name + logArguments(arguments));
                winston.error(error);
                throw error;
            }
        };
    },
    log: (functionExpression, thisObject) => {
        return function() {
            try {
                stackLevel++;
                var stackIndentation = Array(stackLevel).join('    ');
                var timestamp = getTimestamp();
                winston.info(stackIndentation + timestamp + ' ' + functionExpression.name + logArguments(arguments));
                evaluateArguments(arguments);
                var result = functionExpression.apply(thisObject, arguments);
                stackLevel--;
                return result;
            }
            catch (error) {
                winston.error(error);
                stackLevel--;
                throw error;
            }
        };
    }
};

const trace = (functionExpression, thisObject) => {
    var tracedFunction;

    if (thisObject == null) {
        tracedFunction = tracers[traceLevel](functionExpression, null);
    }
    else {
        tracedFunction = tracers[traceLevel](thisObject[functionExpression], thisObject);
    }

    return tracedFunction;
}

module.exports = { trace, setTraceLevel };
