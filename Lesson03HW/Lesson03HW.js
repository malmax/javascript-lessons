// Малахов Максим
"use strict";
// •	Напишите цикл,  выводит такой треугольник:
// #
// ##
// ###
// ####
// #####
// ######
// #######

var out = "#";
while (out.length <= 7) {
    console.log(out);
    out += "#";
}


// •	* Напишите программу, создающую строку, содержащую решётку 8х8, в которой линии разделяются символами новой строки. На каждой позиции либо пробел, либо #. В результате должна получиться шахматная доска.
console.log("задание 2\n");
var str = "";

for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
        str += " # ";
    }
    str += "\n";
}

console.log(str);

console.log("задание 3\n");

// •	Владея навыками написания циклов и условных операторов, выполните задание со * из предыдущего урока
// •	* Забегая немного вперед. Напишите программу, которая выводит через console.log все числа от 1 до 100, с двумя исключениями. Для чисел, нацело делящихся на 3, она должна выводить ‘Fizz’, а для чисел, делящихся на 5 (но не на 3) – ‘Buzz’.Когда сумеете – исправьте её так, чтобы она выводила «FizzBuzz» для всех чисел, которые делятся и на 3 и на 5.

for (var i = 1; i <= 100; i++) {
    var t = "";
    if (i % 3 == 0) {
        t += "Fizz";
    }
    if (i % 5 == 0) {
        t += "Buzz";
    }
    if (t == "") {
        t = i;
    }
    console.log(t);
}
