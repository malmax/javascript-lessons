/* jshint browser: true */
/* jshint node: true */
"use strict";

// Малахов Максим
// ●	Добавить вывод фигур в шахматную доску из предыдущего урока.
// ●	Написать инициализацию расположения фигур с помощью ajax-запроса к json-файлу. Формат данного файла придумать и осуществить самостоятельно.
// ●	* Добавить возможность отсутствия фигур (например, если они были срублены) и предусмотреть проверку корректности данных (например, что на доске сейчас находится не больше двух королей и тп.), в случае, если данные некорректны – выдать человекопонятную ошибку.


var DEBUG = true;

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
            obj.id = String.fromCharCode(64 + j) + i;
        }

        return obj;
    }

    // метод рисования доски
    this.draw = function(rows, cols) {
        //значения по-умолчанию
        rows = rows || 8;
        cols = cols || 8;
        //отчет цифр идет снизу вверх
        for (var i = rows+1; i >=1; i--) {
            //Создаем строку
            var tr = document.createElement("tr");

            for (var j = 0; j <= cols; j++) {
                var inner = null;
                //создание ячейки
                var td = createTD(i, j);

                //Если заголовки то меняем на класс header
                if (i === (rows+1) || j === 0) {
                    td.classList.add("header");
                    //Создание заголовки таблицы
                    var number = !j ? parseInt(i) : "";
                    var letter = i === (rows+1) ? String.fromCharCode(64 + j) : "";
                    //если i и j одновременно 0, то не выводим заголовок
                    inner = document.createTextNode(letter + number);
                    td.appendChild(inner);
                } else if (DEBUG) {
                    //отладка
                    var txt = document.createTextNode(String.fromCharCode(64 + j) + i);
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

//основной класс доски
function Chess(elemIdToInsert) {
    //Подключаем базовый класс
    ChessBase.apply(this, [elemIdToInsert]);

    //добавляем прослышивание собятия собственными функциями извне
    this.addClickEvent = function(func) {
        this._table.addEventListener('click', func);
    };

    //Получение элемента
    this.getTD = function(name) {
        return document.getElementById(name);
    };

    //Получение элемента
    this.getActiveTD = function() {
        var obj = this._table.querySelector("TD.selected");
        if (obj === null)
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

//базовый класс фигуры
function GameBaseElement(elemType, color) {

    //цвет и направление движения
    if (color == 'white') {
        this.color = 'white';
        this._moveUp = true;
    } else {
        this.color = 'black';
        this._moveUp = false;
    }
    //тип фигуры
    this._type = 'тип фигуры';
    var setType = function setType(elemType) {
        var possibleTypes = {
            'pawn': true,
            'tower': true,
            'knight': true,
            'bishop': true,
            'queen': true,
            'king': true
        };
        if (elemType in possibleTypes) {
            this._type = possibleTypes[elemType];
        } else {
            throw console.error("Неправильно задана фигура");
        }
    };
    this.setType(elemType);

    //состояние фигуры
    this.live = true;
    //текущая локация
    this.сurentLocation = {};


    //двигаемся в ячейку
    this._moveTo = function(destination) {
        //получение относительных координат
        //TODO: проверку и передвижение юнита
    };
    //можно ли передвинуться на точку с относительными от текущей фигуры координатами (x,y)
    this.couldMoveTo = function(x, y) {
        var check = false;
        switch (this._type) {
            case 'pawn':
                if (x === 0 && y === 1)
                    check = true;
                break;
            case 'tower':
                if ((Math.abs(x) < 100 && y === 0) || (x === 0 && Math.abs(y) < 100))
                    check = true;
                break;
            case 'bishop':
                if (Math.abs(x) === Math.abs(y))
                    check = true;
                break;
            case 'knight':
                if ((Math.abs(x) === 2 && Math.abs(y) === 1) || (Math.abs(x) === 1 && Math.abs(y) === 2))
                    check = true;
                break;
            case 'queen':
                if ((Math.abs(x) === 0 && Math.abs(y) < 100) || (Math.abs(x) < 100 && Math.abs(y) === 0) || (Math.abs(x) === Math.abs(y)))
                    check = true;
                break;
            case 'king':
                if ((Math.abs(x) === 1 && y === 0) || (x === 0 && Math.abs(y) === 1) || (Math.abs(y) === Math.abs(x) && Math.abs(x) === 1))
                    check = true;
                break;

        }

        return check;
    };

    //выводим
    this.draw = function() {

    };
}
