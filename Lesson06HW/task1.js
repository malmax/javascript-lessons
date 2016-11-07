// Малахов Максим
// •	Объекты могут быть использованы для построения различных структур данных. Часто встречающаяся структура – список (не путайте с массивом). Список – связанный набор объектов, где первый объект содержит ссылку на второй, второй – на третий, и т.п.
// var list = {
//             value: 1,
//             rest: {
//               value: 2,
//               rest: {
//                 value: 3,
//                 rest: null
//               }
//             }
//           };
// Списки удобны тем, что они могут делиться частью своей структуры. Например, можно сделать два списка, {value: 0, rest: list} и {value: -1, rest: list}, где list – это ссылка на ранее объявленную переменную. Это два независимых списка, при этом у них есть общая структура list, которая включает три последних элемента каждого из них. Кроме того, оригинальный список также сохраняет свои свойства как отдельный список из трёх элементов. Напишите функцию arrayToList, которая строит такую структуру, получая в качестве аргумента [1, 2, 3], а также функцию listToArray, которая создаёт массив из списка. Также напишите вспомогательную функцию prepend, которая получает элемент и создаёт новый список, где этот элемент добавлен спереди к первоначальному списку, и функцию nth, которая в качестве аргументов принимает список и число, а возвращает элемент на заданной позиции в списке, или же undefined в случае отсутствия такого элемента.
"use strict";

function arrayToList(array) {
    array = array || [1, 2, 3];
    var list = null;
    array.reverse().forEach(function(item) {
        list = prepend.call(list, item);
    });
    return list;
}

function listToArray(list) {
    var array = [];
    var n = 0;
    var item = {};
    while ((item = nth(list, ++n)) != undefined) {
        array.push(item.value);
    }
    return array;
}

function prepend(item) {
    item = item || 0;
    return {
        value: item,
        rest: this
    };
}

function nth(list, num) {
    while (typeof list == 'object' && list != null) {
        if (num == list.value) {
            return list;
        }
        list = list.rest;
    }
    return undefined;
}


var list = arrayToList();
console.log(list);
var array = listToArray(list);
console.log(array);
