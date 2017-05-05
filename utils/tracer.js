'use strict';

let winston = require('winston');

function tracer(errorsOnly) {

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

    function logify(functionExpression, additionalInfo) {
        return function() {
            try {
                stackLevel++;
                var stackIndentation = Array(stackLevel).join('    ');
                winston.info(stackIndentation + additionalInfo + logArguments.apply(this, arguments));
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

    function trace(functionExpression, additionalInfo) {
        if (errorsOnly) {
            return errorify(functionExpression);
        }
        else {
            return logify(functionExpression, additionalInfo);
        }
    }

    return trace;
}

module.exports = tracer;
