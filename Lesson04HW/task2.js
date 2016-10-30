// •	Символ номер N строки можно получить, добавив к ней .charAt(N) ( “строчка”.charAt(5) ) – схожим образом с получением длины строки при помощи .length. Возвращаемое значение будет строковым, состоящим из одного символа (к примеру, “к”). У первого символа строки позиция 0, что означает, что у последнего символа позиция будет string.length – 1. Другими словами, у строки из двух символов длина 2, а позиции её символов будут 0 и 1.Напишите функцию countBs, которая принимает строку в качестве аргумента, и возвращает количество символов “B”, содержащихся в строке.Затем напишите функцию countChar, которая работает примерно как countBs, только принимает второй параметр — символ, который мы будем искать в строке (вместо того, чтобы просто считать количество символов “B”). Для этого переделайте функцию countBs.

"use strict";

function countBs(str) {
    if (!str)
        return false;

    var count_char = 0;

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == "В")
            count_char++;
    }

    return "Символ " + "'В'" + " встречается " + count_char + " раз(а)";
}

console.log(countBs("Привет! Все вместе выходим в сад!")); // -> Символ 'В' встречается 1 раз

function countChar(str, char) {
    char = char || "а"; //значение по-умолчанию

    if (!str)
        return false;

    var count_char = 0;

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == char)
            count_char++;
    }

    return "Символ " + "'" + char + "'" + " встречается " + count_char + " раз(а)";
}

console.log(countChar("Привет! Все вместе выходим в сад!", 'т')); // -> Символ 'т' встречается 2 раз(а)
