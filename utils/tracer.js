'use strict';

let winston = require('winston');
var format = require('./format');
let traceLevel = 'all';

function tracer() {

    let stackLevel = 0;
    var formatter = value => format.digitPrepender(value, 0, 2);

    function getTimestamp() {
        var currentDate = new Date();
        var formattedTime =  formatter(currentDate.getHours()) + ':' + formatter(currentDate.getMinutes()) + ':' +
        formatter(currentDate.getSeconds());
        return formattedTime;
    }

    function errorify(functionExpression, message, thisObject) {
        return function() {
            try {
                return functionExpression.apply(thisObject, arguments);
            }
            catch (error) {
                winston.error(message + logArguments.apply(thisObject, arguments));
                winston.error(error);
                throw error;
            }
        };
    }

    function evaluateArguments() {
        for (var index in arguments) {
            var argument = arguments[index];
            if (typeof argument === "undefined" || argument == null) {
                winston.info('Parameter ' + index + ' is null or undefined...');
            }
        }
    }

    function logArguments() {
        var stringifiedArguments = '(';
        var keysNumber = Object.keys(arguments).length;
        for (var index in arguments) {
            var argument = arguments[index];
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
    }

    function logify(functionExpression, message, thisObject) {
        return function() {
            try {
                stackLevel++;
                var stackIndentation = Array(stackLevel).join('    ');
                var timestamp = getTimestamp();
                winston.info(stackIndentation + timestamp + ' ' + message + logArguments.apply(thisObject, arguments));
                evaluateArguments.apply(thisObject, arguments);
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

    function setTraceLevel(level) {
        traceLevel = level;
    }

    function trace(functionExpression, message, thisObject) {
        thisObject = thisObject || this;
        if (traceLevel === 'errors') {
            return errorify(functionExpression, message, thisObject);
        }
        else if (traceLevel === 'all') {
            return logify(functionExpression, message, thisObject);
        }
    }

    return {
        trace: trace,
        setTraceLevel: setTraceLevel
    };
}

module.exports = tracer();
