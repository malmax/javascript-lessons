// Малахов Максим
// •	* Ноль чётный. Единица нечётная. У любого числа N чётность такая же, как у N-2.Напишите рекурсивную функцию isEven согласно этим правилам. Она должна принимать число и возвращать булевское значение. Потестируйте её на 50 и 75. Попробуйте задать ей -1. Почему она ведёт себя таким образом? Можно ли её как-то исправить?

"use strict";


function isEven(num) {
    if (typeof num == "undefined")
        return "num не задан";

    num = Math.abs(num);

    if (num === 0) {
        return true;
    } else if (num === 1) {
        return false;
    } else {
        return isEven(num - 2);
    }
}

window.console.log(isEven(50)); //true
window.console.log(isEven(75)); //false

window.console.log(isEven(-1));
