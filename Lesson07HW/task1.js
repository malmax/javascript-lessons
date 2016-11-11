// Малахов Максим
// •	Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-тэги по своему желанию. Доска должна быть разленована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.


"use strict";

var DEBUG = true;
var table = document.createElement("table");
var trs = newlist();
var tds = newlist();
var playerWhiteUnits = newlist();
var playerBlackUnits = newlist();
var contents = newlist();
var inner = {};
var className = "";
var elem = {};
var headerNames = {
    'h01': 'A',
    'h02': 'B',
    'h03': 'C',
    'h04': 'D',
    'h05': 'E',
    'h06': 'F',
    'h07': 'G',
    'h08': 'H',
    'h10': 1,
    'h20': 2,
    'h30': 3,
    'h40': 4,
    'h50': 5,
    'h60': 6,
    'h70': 7,
    'h80': 8,
}

var playerWhite = {
    "className": "white-icon unit",
    "units": {
        "pawn": {
            "src": "src/Chess_plt45.svg",
            "letter": "П",
            "positions": [{
                "x": 1,
                "y": 7,
                "id": 1
            }, {
                "x": 2,
                "y": 7,
                "id": 2
            }, {
                "x": 3,
                "y": 7,
                "id": 3
            }, {
                "x": 4,
                "y": 7,
                "id": 4
            }, {
                "x": 5,
                "y": 7,
                "id": 5
            }, {
                "x": 6,
                "y": 7,
                "id": 6
            }, {
                "x": 7,
                "y": 7,
                "id": 7
            }, {
                "x": 8,
                "y": 7,
                "id": 8
            }, ],
        },
        "king": {
            "src": "src/Chess_klt45.svg",
            "letter": "К",
            "positions": [{
                "x": 4,
                "y": 8,
                "id": 1
            }, ],
        },
        "queen": {
            "src": "src/Chess_qlt45.svg",
            "letter": "Ф",
            "positions": [{
                "x": 5,
                "y": 8,
                "id": 1
            }, ],
        },
        "knight": {
            "src": "src/Chess_nlt45.svg",
            "letter": "Р",
            "positions": [{
                "x": 3,
                "y": 8,
                "id": 1
            }, {
                "x": 6,
                "y": 8,
                "id": 2
            }, ],
        },
        "bishop": {
            "src": "src/Chess_blt45.svg",
            "letter": "Л",
            "positions": [{
                "x": 2,
                "y": 8,
                "id": 1
            }, {
                "x": 7,
                "y": 8,
                "id": 2
            }, ],
        },
        "rok": {
            "src": "src/Chess_rlt45.svg",
            "letter": "Б",
            "positions": [{
                "x": 1,
                "y": 8,
                "id": 1
            }, {
                "x": 8,
                "y": 8,
                "id": 2
            }, ],
        },
    },
}

var playerBlack = {
    "className": "black-icon unit",
    "units": {
        "pawn": {
            "src": "src/Chess_pdt45.svg",
            "letter": "П",
            "positions": [{
                "x": 1,
                "y": 2,
                "id": 1
            }, {
                "x": 2,
                "y": 2,
                "id": 2
            }, {
                "x": 3,
                "y": 2,
                "id": 3
            }, {
                "x": 4,
                "y": 2,
                "id": 4
            }, {
                "x": 5,
                "y": 2,
                "id": 5
            }, {
                "x": 6,
                "y": 2,
                "id": 6
            }, {
                "x": 7,
                "y": 2,
                "id": 7
            }, {
                "x": 8,
                "y": 2,
                "id": 8
            }, ],
        },
        "king": {
            "src": "src/Chess_kdt45.svg",
            "letter": "К",
            "positions": [{
                "x": 4,
                "y": 1,
                "id": 1
            }, ],
        },
        "queen": {
            "src": "src/Chess_qdt45.svg",
            "letter": "Ф",
            "positions": [{
                "x": 5,
                "y": 1,
                "id": 1
            }, ],
        },
        "knight": {
            "src": "src/Chess_ndt45.svg",
            "letter": "Р",
            "positions": [{
                "x": 3,
                "y": 1,
                "id": 1
            }, {
                "x": 6,
                "y": 1,
                "id": 2
            }, ],
        },
        "bishop": {
            "src": "src/Chess_bdt45.svg",
            "letter": "Л",
            "positions": [{
                "x": 2,
                "y": 1,
                "id": 1
            }, {
                "x": 7,
                "y": 1,
                "id": 2
            }, ],
        },
        "rok": {
            "src": "src/Chess_rdt45.svg",
            "letter": "Б",
            "positions": [{
                "x": 1,
                "y": 1,
                "id": 1
            }, {
                "x": 8,
                "y": 1,
                "id": 2
            }, ],
        },
    },
}

// Рисуем игровую доску
for (var i = 0; i < 9; i++) {
    //Строки имеют адрес tr_{row}, tr_4
    trs.prepend("tr" + i, document.createElement("tr"));

    for (var j = 0; j < 9; j++) {
        inner = null;

        //Делим на черные/белые
        if ((j + i) % 2 === 0) {
            className = "white";
        } else {
            className = "black";
        }

        //Если заголовки то меняем на класс header
        if (i === 0 || j === 0) {
            className = "header";
            if (!(!i && !j))
                inner = document.createTextNode(headerNames['h' + i + j]);
        } else if (DEBUG) {
            var txt = document.createTextNode('td_' + i + '_' + j);
            inner = document.createElement('div');
            inner.className = "small";
            inner.appendChild(txt);

        }
        // Создаем ячейки, они имеют адрес td_{row}_{col}, td_6_4
        elem = document.createElement("td");
        elem.className = className;
        if (inner !== null) {
            elem.appendChild(inner);
        }
        tds.prepend("td_" + i + "_" + j, elem);
        trs.findInList("tr" + i).value.appendChild(tds.findInList("td_" + i + "_" + j).value);
    }
    table.appendChild(trs.findInList("tr" + i).value);
}

//Создаем фигуры белого игрока
Object.keys(playerWhite.units).forEach(function(unitName) {
    if (unitName !== undefined) {
        playerWhite.units[unitName].positions.forEach(function(coordinate) {
            if (coordinate !== undefined) {
                //Создаем обертку для фигуры + название, чтобы двигать именно ее
                var wrapper = document.createElement('div');
                wrapper.id = "white_" + unitName + "_" + coordinate.id;
                //Создаем название фигуры
                var txt = document.createTextNode(playerWhite.units[unitName].letter);
                var inner = document.createElement('div');
                inner.className = "letter";
                inner.appendChild(txt);
                // добавляем в wrapper
                wrapper.appendChild(inner);

                //создаем фигуру и добавляем ей свойств
                var elem = document.createElement("object");
                elem.type = "image/svg+xml";
                elem.data = playerWhite.units[unitName].src;
                elem.className = playerWhite.className + " " + unitName;
                playerWhiteUnits.prepend(unitName + "_" + coordinate.id, elem);
                // добавляем в wrapper
                wrapper.appendChild(elem);

                //добавляем на доску
                tds.findInList("td_" + coordinate.y + "_" + coordinate.x).value.appendChild(wrapper);
            }
        });
    }

});

//Создаем фигуры черного игрока
Object.keys(playerBlack.units).forEach(function(unitName) {
    if (unitName !== undefined) {
        playerBlack.units[unitName].positions.forEach(function(coordinate) {
            if (coordinate !== undefined) {
                //Создаем обертку для фигуры + название, чтобы двигать именно ее
                var wrapper = document.createElement('div');
                wrapper.id = "black_" + unitName + "_" + coordinate.id;
                //Создаем название фигуры
                var txt = document.createTextNode(playerBlack.units[unitName].letter);
                var inner = document.createElement('div');
                inner.className = "letter";
                inner.appendChild(txt);
                // добавляем в wrapper
                wrapper.appendChild(inner);

                //создаем фигуру и добавляем ей свойств
                var elem = document.createElement("object");
                elem.type = "image/svg+xml";
                elem.data = playerBlack.units[unitName].src;
                elem.className = playerBlack.className + " " + unitName;
                playerBlackUnits.prepend(unitName + "_" + coordinate.id, elem);
                // добавляем в wrapper
                wrapper.appendChild(elem);

                //добавляем на доску
                tds.findInList("td_" + coordinate.y + "_" + coordinate.x).value.appendChild(wrapper);
            }
        });
    }

});


//Выводим все на экран
document.body.appendChild(table);


// var list = {
//             name: td_5_3,
//             value: document.object,
//             rest: {
//               value: 2,
//               rest: {
//                 value: 3,
//                 rest: null
//               }
//             }
//           };

function newlist() {
    var obj = {};
    bindfunc(obj);
    return obj;
}

function bindfunc(obj) {
    obj = obj || {};
    obj.prepend = prepend.bind(obj);
    obj.findInList = findInList.bind(obj);
    return obj;
}

function prepend(name, value) {
    name = name || 'noname';
    value = value || {};

    var rest = {
        'name': this.name,
        'value': this.value,
        'rest': this.rest,
    };

    //Проверка есть ли такое имя уже в списке
    if (this.findInList(name) == undefined) {
        delete this.prepend;
        delete this.findInList;

        this.name = name; //название элемента для поиска
        this.value = value; //значение элемента
        this.rest = rest;

        bindfunc(this);
    }

    return this;
}

function findInList(name) {
    //копирование списка
    var list = {
        'name': this.name,
        'value': this.value,
        'rest': this.rest,
    };

    while (list.name !== undefined && list !== null) {
        if (name == list.name) {
            return list;
        }
        list = list.rest;
    }
    return undefined;
}
