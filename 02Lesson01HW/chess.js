"use strict";

var DEBUG = false;

function Chess(elemIdToInsert) {

    //элемент для добавления к которому можно поменять без пересоздания
    this.elemIdToInsert = elemIdToInsert;
    //вся таблица
    var table = document.createElement('table');
    //заголовки столбцов и строк
    var headerNames = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'E',
        '6': 'F',
        '7': 'G',
        '8': 'H',
        '9': 'N',
        '10': 1,
        '20': 2,
        '30': 3,
        '40': 4,
        '50': 5,
        '60': 6,
        '70': 7,
        '80': 8,
        '90':9,
    }

    // метод рисования доски. мжно поменять кол-во столбцов и строк
    this.draw = function(rows, cols) {
        rows = rows || 8;
        cols = cols || 8;

        for (var i = 0; i <= rows; i++) {
            //Строки имеют адрес tr_{row}, tr_4
            var tr = createTR(i);

            for (var j = 0; j <= cols; j++) {
                var inner = null;
                //создание ячейки
                var td = createTD(i, j);

                //Если заголовки то меняем на класс header
                if (i === 0 || j === 0) {
                    td.classList.add("header");
                    if (!(!i && !j)) {
                        var num = parseInt(i)+j*10;
                        inner = document.createTextNode(headerNames[num]);
                        td.appendChild(inner);
                    }
                } else if (DEBUG) {
                    //отладка
                    var txt = document.createTextNode(headerNames[i] + headerNames[j * 10]);
                    inner = document.createElement('div');
                    inner.className = "small";
                    inner.appendChild(txt);
                    td.appendChild(inner);
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return this;
    }

    //публичный метод для вывода доски на экран
    this.show = function() {
        document.getElementById(this.elemIdToInsert).appendChild(table);
    }

    //приватный метод создания ячйки
    function createTD(i, j) {
        // Создаем ячейки, они имеют адрес td_{row}_{col}, td_6_4
        var obj = document.createElement("td");

        //Делим на черные/белые
        if ((j + i) % 2 === 0) {
            obj.className = "white";
        } else {
            obj.className = "black";
        }

        if (i > 0 && j > 0) {
            obj.id = headerNames[i] + headerNames[j * 10];
        }

        return obj;
    }

    //приватный метод создания строчки
    function createTR(i) {
        var obj = document.createElement("tr");

        return obj;
    }

}
