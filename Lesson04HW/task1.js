// •	Напишите функцию min, принимающую два аргумента, и возвращающую минимальный из них.
// console.log(min(0, 10)); // → 0
// console.log(min(0, -10)); // → -10
"use strict";

function min(num1, num2) {
    var minNum = num1;
    if (minNum > num2) {
        minNum = num2;
    }
    return minNum;
}

console.log(min(0, 10)); // → 0
console.log(min(0, -10)); // → -10
