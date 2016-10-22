//Малахов Максим
/*•	* Забегая немного вперед. Напишите программу, которая выводит через
console.log все числа от 1 до 100, с двумя исключениями. Для чисел, нацело
делящихся на 3, она должна выводить ‘Fizz’, а для чисел, делящихся на 5
(но не на 3) – ‘Buzz’.Когда сумеете – исправьте её так, чтобы она выводила
«FizzBuzz» для всех чисел, которые делятся и на 3 и на 5.*/

"use strict";
var start = 1;
var end = 100;
var output = "";

for (var current = start; current <= end; current++) {

    output = current;

    if (current % 3 === 0 && current % 5 !== 0) //делится без остатка на 3, но не на 5
    {
        output += " Fizz";
    } else if (current % 5 === 0 && current % 3 !== 0) { //делится без остатка на 5, но не на 3
        output += " Buzz";
    } else if (current % 3 === 0 && current % 5 === 0) { //делится без остатка и на 3, и на 5
        output += " FizzBuzz";
    }

    console.log(output);
}
