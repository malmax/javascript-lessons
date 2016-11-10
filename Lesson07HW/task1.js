// Малахов Максим
// •	Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-тэги по своему желанию. Доска должна быть разленована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
"use strict";

var table = document.createElement("table");
var trs = newlist();
var tds = newlist();
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
    'h60': 7,
    'h70': 8,
}

for (var i = 0; i < 8; i++) {
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
            if(!(!i && !j))
                inner = document.createTextNode(headerNames['h' + i + j]);
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
