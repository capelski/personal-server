'use strict';

let winston = require('winston');
let config = require('../config/config');

function tracer() {
    let stackLevel = 0;

    function errorify(functionExpression) {
        return function() {
            try {
                return functionExpression.apply(this, arguments);
            }
            catch (error) {
                winston.error(functionExpression.name + logArguments.apply(this, arguments));
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

    function logify(serviceName, functionExpression) {
        return function() {
            try {
                stackLevel++;
                var stackIndentation = Array(stackLevel).join('    ');
                winston.info(stackIndentation + serviceName + '.' + functionExpression.name + logArguments.apply(this, arguments));
                evaluateArguments.apply(this, arguments);
                var result = functionExpression.apply(this, arguments);
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

    function trace(serviceName, functionExpression, hideInfo) {
        if (!hideInfo && config.logify === true) {
            return logify(serviceName, functionExpression);
        }
        else {
            return errorify(functionExpression);
        }
    }

    return {
        trace: trace
    };
}

module.exports = tracer();
