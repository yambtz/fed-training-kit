/**
 * Roman Time!
 *
 * Implement the function that given a regular time,
 * e.g. "09:05" or "23:12" returns the same time but written in roman numbers.
 *
 * "09:05" -> IX:V
 *
 * Important!
 * 1. Roman numbers don't have 0 (surprise!). Use `N` instead
 * 2. You might get any number/word as an input. If the input is not valid, throw a TypeError.
 */

"use strict";


function romanTime(time) {

    //split on : character
    let splitTime = time.split(":");

    //verify both are numbers and in range
    let hoursDec = Number(splitTime[0]);
    let minutesDec = Number(splitTime[1]);
    if (splitTime.length !== 2 || isInvalidInput(hoursDec, 0, 23) || isInvalidInput(minutesDec, 0, 59)) {
        throw new TypeError();
    }

    return convertDecimalToRoman(hoursDec) + ":" + convertDecimalToRoman(minutesDec);
}


//verify a value is in range, inclusive)
function isInvalidInput(value, low, up) {
    return isNaN(value) || low > value || up < value;
}

function convertDecimalToRoman(Decimal) {
    if (0 === Decimal) {
        return "N";
    }

    let roman = "";

    let dict = {
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    for (let key in dict) {
        while (dict[key] <= Decimal) {
            Decimal -= dict[key];
            roman += key;
        }
    }


    return roman;
}


module.exports = romanTime;
