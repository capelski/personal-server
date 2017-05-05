'use strict';

function format() {

    function digitPrepender(value, digit, digitsNumber) {
        var result = value.toString();
        while(result.length < digitsNumber) {
            result = digit.toString() + result;
        }
        return result;
    }

    return {
        digitPrepender: digitPrepender
    };
}

module.exports = format();
