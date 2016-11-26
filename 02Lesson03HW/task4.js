/* jshint browser: true */
/* jshint node: true */
"use strict";

// Малахов Максим
// Написать проверку правильности координаты в файле инициализации шахматной доски c помощью регулярного выражения. Он должен иметь формат вида A6.

//Сделал отдельным файлом для удобства.
// Все изменения перенес в Шахматы

function checkLocation(str) {
    var reg = /^[a-h][1-9]$/i;
    console.log(str.search(reg));
    if(location.search(reg) === 0)
        return true;
    else
        return false;
}

//читаем данные из файла
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', './units.json', true);
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
        var obj = JSON.parse(xmlhttp.responseText);
        //вывод фигур
        //формат ./units.json можете посмотреть в файле ./units.js
        //два цвета белый и черный
        Object.keys(obj).forEach(function(colorName) {
            Object.keys(obj[colorName]).forEach(function(unitTypeName) {
                //данные о фигуре
                var unitValues = obj[colorName][unitTypeName];
                //каунтер для формирования id
                var unitCount = 0;
                //обходим стартовые координаты юнита
                unitValues.startLocation.forEach(function(location) {
                    if(!checkLocation(location)) {
                        throw console.error("Не правильно заданы координаты юнита");
                    }
                });
            });
        });
    }
};
xmlhttp.send(null);
