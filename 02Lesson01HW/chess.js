/* jshint browser: true */
/* jshint node: true */
"use strict";

// Малахов Максим
// ●	Разработать класс, генерирующий шахматную доску на странице. Конструктор в качестве параметра должен принимать селектор элемента в котором должна создаться доска, либо DOM Node. При этом должна быть возможность подписаться на события доски через созданный объект (не напрямую к DOM Node, а именно извне используя только объект доски), получения и установки координаты активной ячейки (шахматной координаты вида “A1”). Для генерации доски можно использовать произвольные html-тэги. Подумать какие свойства должны быть скрыты, а какие нет решение аргументировать в комментариях к коду.
// ●	Добавить базовый класс, который мог бы генерировать таблицы (доски) любого размера и унаследовать от него разработанный класс шахматной доски.
// ●	* Все то же самое с помощью ООП в прототипном стиле (разобраться самостоятельно).

var DEBUG = false;

function ChessBase(rows,cols) {

    //приватные свойства с помощью которых можно рисовать доску любого размера
    rows = rows || 8;
    cols = cols || 8;

    //публичное свойтсво, т.к. нужно использовать в наследнике. Это - ссылка на дом-объект таблица
    this.table = document.createElement('table');

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
    };

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

    // метод рисования доски. мжно поменять кол-во столбцов и строк
    this.draw = function() {

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
            this.table.appendChild(tr);
        }
        return this;
    };
}


function Chess(elemIdToInsert) {
    ChessBase.apply(this,[8,8]);

    var that = this;

    //элемент для добавления к которому можно поменять без пересоздания
    this.elemIdToInsert = elemIdToInsert;


    //добавляем прослышивание собятия собственными функциями извне
    this.addClickEvent = function(func) {
        this.table.addEventListener('click',func);
    };

    //Получение элемента
    this.getTD = function(name) {
        return document.getElementById(name);
    };

    //Получение элемента
    this.getActiveTD = function() {
        var obj = this.table.querySelector("TD.selected");
        if(obj === null)
            return this.table;
        else
            return obj;
    };

    //установка активной ячейки
    this.setActiveTD = function(target) {
        target.classList.add('selected');
        return target.id;
    };

    //публичный метод для вывода доски на экран
    this.show = function() {
        this.draw();
        document.getElementById(this.elemIdToInsert).appendChild(this.table);
    };



}
