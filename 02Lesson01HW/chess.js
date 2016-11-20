/* jshint browser: true */
/* jshint node: true */
"use strict";

// Малахов Максим
// ●	Разработать класс, генерирующий шахматную доску на странице. Конструктор в качестве параметра должен принимать селектор элемента в котором должна создаться доска, либо DOM Node. При этом должна быть возможность подписаться на события доски через созданный объект (не напрямую к DOM Node, а именно извне используя только объект доски), получения и установки координаты активной ячейки (шахматной координаты вида “A1”). Для генерации доски можно использовать произвольные html-тэги. Подумать какие свойства должны быть скрыты, а какие нет решение аргументировать в комментариях к коду.
// ●	Добавить базовый класс, который мог бы генерировать таблицы (доски) любого размера и унаследовать от него разработанный класс шахматной доски.
// ●	* Все то же самое с помощью ООП в прототипном стиле (разобраться самостоятельно).

var DEBUG = false;

function ChessBase(elemIdToInsert) {

    this._elementToInsert = document.getElementById(elemIdToInsert) || document.body;

    //публичное свойтсво, т.к. нужно использовать в наследнике. Это - ссылка на дом-объект таблица
    this._table = document.createElement('table');

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
            obj.id = String.fromCharCode(64+i) + j;
        }

        return obj;
    }

    // метод рисования доски
    this.draw = function(rows,cols) {
        //значения по-умолчанию
        rows = rows || 8;
        cols = cols || 8;

        for (var i = 0; i <= rows; i++) {
            //Создаем строку
            var tr = document.createElement("tr");

            for (var j = 0; j <= cols; j++) {
                var inner = null;
                //создание ячейки
                var td = createTD(i, j);

                //Если заголовки то меняем на класс header
                if (i === 0 || j === 0) {
                    td.classList.add("header");
                    //Создание заголовки таблицы
                    var number = !i ? parseInt(j):"";
                    var letter = !j ? String.fromCharCode(64+i):"";
                    //если i и j одновременно 0, то не выводим заголовок
                    inner = document.createTextNode(letter+number);
                    td.appendChild(inner);
                } else if (DEBUG) {
                    //отладка
                    var txt = document.createTextNode(String.fromCharCode(64+i) + j);
                    inner = document.createElement('div');
                    inner.className = "small";
                    inner.appendChild(txt);
                    td.appendChild(inner);
                }
                tr.appendChild(td);
            }
            this._table.appendChild(tr);
        }
        //выводим доску
        this._elementToInsert.appendChild(this._table);
        //возвращаем текущий объект
        return this;
    };
}


function Chess(elemIdToInsert) {
    //Подключаем базовый класс
    ChessBase.apply(this,[elemIdToInsert]);

    //добавляем прослышивание собятия собственными функциями извне
    this.addClickEvent = function(func) {
        this._table.addEventListener('click',func);
    };

    //Получение элемента
    this.getTD = function(name) {
        return document.getElementById(name);
    };

    //Получение элемента
    this.getActiveTD = function() {
        var obj = this._table.querySelector("TD.selected");
        if(obj === null)
            return this._table;
        else
            return obj;
    };

    //установка активной ячейки
    this.setActiveTD = function(target) {
        target.classList.add('selected');
        return target.id;
    };

}
