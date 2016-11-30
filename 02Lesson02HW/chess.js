/* jshint browser: true */
/* jshint node: true */
"use strict";

// Малахов Максим
// ●	Добавить вывод фигур в шахматную доску из предыдущего урока.
// ●	Написать инициализацию расположения фигур с помощью ajax-запроса к json-файлу. Формат данного файла придумать и осуществить самостоятельно.
// ●	* Добавить возможность отсутствия фигур (например, если они были срублены) и предусмотреть проверку корректности данных (например, что на доске сейчас находится не больше двух королей и тп.), в случае, если данные некорректны – выдать человекопонятную ошибку.


var DEBUG = false;

function ChessBase(elemIdToInsert) {

    this._elementToInsert = document.getElementById(elemIdToInsert) || document.body;

    //публичное свойтсво, т.к. нужно использовать в наследнике. Это - ссылка на дом-объект таблица
    this._table = document.createElement('table');

    //приватный метод создания ячйки
    function createTD(i, j) {
        // Создаем ячейки, они имеют адрес
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
        for (var i = rows + 1; i >= 1; i--) {
            //Создаем строку
            var tr = document.createElement("tr");

            for (var j = 0; j <= cols; j++) {
                var inner = null;
                //создание ячейки
                var td = createTD(i, j);

                //Если заголовки то меняем на класс header
                if (i === (rows + 1) || j === 0) {
                    td.classList.add("header");
                    //Создание заголовки таблицы
                    var number = !j ? parseInt(i) : "";
                    var letter = i === (rows + 1) ? String.fromCharCode(64 + j) : "";
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
        while (target.nodeName != 'TD') {
            target = target.parentElement;
        }
        target.classList.add('selected');
        return target.id;
    };

    //выводим фигуры
    this.drawStartFigures = function() {
        var chessTable = this;
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

                            //проверка правильности координат фигур
                            if(!(function() {
                                var reg = /^[a-h][1-9]$/i;
                                console.log(location.search(reg));
                                if(location.search(reg) === 0)
                                    return true;
                                else
                                    return false;

                            }()))
                                throw console.error("Не правильно заданы координаты юнита");

                            //создаем объект фигуру
                            var unitRender = new GameUnit(unitTypeName,colorName,location,unitValues.unitClass,++unitCount);
                            //выводим на доску
                            unitRender.render();
                            //добавляем обработчик для каждой фигуры
                            //при клике по фигуре будет возможность ее передвигать
                            //поедание пока недоступно =(
                            var fun = function(e) { this.makeMoveEvents(chessTable._elementToInsert,e); };
                            unitRender.unit.addEventListener('click',fun.bind(unitRender));
                        });
                    });
                });
            }
        };
        xmlhttp.send(null);
    };

}

//базовый класс фигуры
function GameUnit(elemType, color, startLocation, unitClass, unitId) {

    var that = this;

    //приватное свойство - цвет фигуры
    var colorUnit = 'black';
    var moveUp = false;
    //цвет и направление движения
    if (color == 'white') {
        colorUnit = 'white';
        moveUp = true;
    }

    //приватное совйство - тип фигуры
    var type = 'тип фигуры';
    //приватная функция сеттер
    function setType(elemType) {
        var possibleTypes = {
            'pawn': true,
            'tower': true,
            'knight': true,
            'bishop': true,
            'queen': true,
            'king': true
        };
        if (elemType in possibleTypes) {
            type = elemType;
        } else {
            throw "Неправильно задан тип фигуры " + elemType;
        }
    }
    setType(elemType);
    //id нужен чтобы отследить конкретную фигуру
    this.id = colorUnit + type + unitId;
    //приватное свойство - состояние фигуры
    var live = true;
    //приватное свойство - текущая локация
    var currentLocation = document.getElementById(startLocation);
    //создаем дом-элемент для вывода юнита
    this.unit = document.createElement('span');
    this.unit.classList.add('glyphicon'); //класс иконки базовая
    this.unit.classList.add(colorUnit); //цвет
    this.unit.classList.add(unitClass); //класс иконки юнита
    this.unit.id = this.id; //id
    this.unit.setAttribute('aria-hidden', 'true');

    //двигаемся в ячейку
    function moveTo (destination) {
        //получение относительных координат
        destination.appendChild(that.unit);
        currentLocation = destination;
        //убираем обработчик с точки куда переместились
        destination.onclick = null;
        //убираем не нужные классы can-move-there
        var parent = document.getElementsByTagName('table')[0];
        parent.querySelectorAll('td.can-move-there').forEach(function(item) {
            if (!item.classList.contains('header')) {
                //убираем не нужные классы can-move-there
                item.classList.remove('can-move-there');
            }
        });

    }
    //можно ли передвинуться на точку с относительными от текущей фигуры координатами (x,y)
    function couldMoveTo(x, y) {
        var check = false;

        switch (type) {
            case 'pawn': //пешка ходит только на клетку вперед
                var pawnCheckY = moveUp ? 1 : -1;
                if (x === 0 && y === pawnCheckY)
                    check = true;
                break;
            case 'tower'://башня
                if ((Math.abs(x) < 100 && y === 0) || (x === 0 && Math.abs(y) < 100))
                    check = true;
                break;
            case 'bishop': //ладья
                if (Math.abs(x) === Math.abs(y))
                    check = true;
                break;
            case 'knight'://конь
                if ((Math.abs(x) === 2 && Math.abs(y) === 1) || (Math.abs(x) === 1 && Math.abs(y) === 2))
                    check = true;
                break;
            case 'queen': //королева
                if ((Math.abs(x) === 0 && Math.abs(y) < 100) || (Math.abs(x) < 100 && Math.abs(y) === 0) || (Math.abs(x) === Math.abs(y)))
                    check = true;
                break;
            case 'king': //король
                if ((Math.abs(x) === 1 && y === 0) || (x === 0 && Math.abs(y) === 1) || (Math.abs(y) === Math.abs(x) && Math.abs(x) === 1))
                    check = true;
                break;

        }

        return check;
    }

    //выводим
    this.render = function() {
        //если фигура "не срублена" то выводим ее
        if (live) {
            //находим ячейку в которую надо будет поместить фигуру
            var td;
            if (!(td = currentLocation))
                throw 'Не найдена ячейка ' + currentLocation;
            //очищаем элементы внутри td
            while (td.firstChild) {
                td.removeChild(td.firstChild);
            }
            //добавляем юнит в ячейку
            td.appendChild(this.unit);
        } else {
            this.unit.remove();
        }
    };

    //создаем события для передвижения
    this.makeMoveEvents = function(parentTag, e) {
        var tds = getRelativeTD(parentTag, e);
        if(tds) {
            tds.forEach(function(obj) {
                obj.dest.classList.add('can-move-there');
                var fun = function(e) { moveTo(obj.dest);};
                obj.dest.onclick = fun.bind(this);

                //TODO: здесь надо делать рассчет коллизий
            });
        }
    };

    //получение списка относительных ячеек
    function getRelativeTD(parentTag, e) {

        //т.к. у нас куча обработчиков, то надо отбросить не активные
        var target = e.target;
        while (target.nodeName != 'TD') {
            target = target.parentElement;
        }
        //смотрим только тот обработчик, который находится в target
        if (target != currentLocation)
            return;

        //дом-доска
        var parent = parentTag || document.getElementsByTagName('table')[0];
        //текущие координаты относительно левого нижнего угла
        var xCur = currentLocation.id.charCodeAt(0);
        var yCur = parseInt(currentLocation.id.substr(1));
        //будем возвращать массив всех возможных точек перемещения без учета коллизии
        var result = [];
        //обходим все ячейки доски
        parent.querySelectorAll('td').forEach(function(item) {
            if (!item.classList.contains('header')) {
                //убираем не нужные классы can-move-there
                item.classList.remove('can-move-there');
                //убираем обработчик с пустых клеток
                if(!item.children[0]) {
                    item.onclick = null;
                }
                //координаты ячейки относительно левого нижнего угла
                var x = item.id.charCodeAt(0);
                var y = parseInt(item.id.substr(1));

                //TODO: лучше перенести функционал присваивания класса в отдельную функцию
                if (couldMoveTo((x - xCur), (y - yCur)) && (!item.children[0])) {
                    result.push({
                        'dest': item,
                        'destX': x,
                        'destY': y,
                        'cur':currentLocation,
                        'curX':xCur,
                        'curY':yCur,
                    });
                }
            }
        });
        return result;
    }
}
