// Малахов Максим
// •	Напишите две функции, reverseArray и reverseArrayInPlace. Первая получает массив как аргумент и выдаёт новый массив, с обратным порядком элементов. Вторая работает как оригинальный метод reverse – она меняет порядок элементов на обратный в том массиве, который был ей передан в качестве аргумента. Не используйте стандартный метод reverse.
"use strict";

function reverseArray(array) {
    var new_array = [];
    array.forEach(function(item) {
        new_array.unshift(item);
    });
    return new_array;
}

function reverseArrayInPlace(array) {
    //создаем кописю массива
    var new_array = array.slice(0);
    //очищаем массив без удаления связи
    array.length = 0;
    new_array.forEach(function(item) {
        array.unshift(item);
    });
}

var array = [1, 2, 3, 4, 5];

console.log(reverseArray(array));
reverseArrayInPlace(array);
console.log(array);
