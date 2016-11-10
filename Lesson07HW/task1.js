// Малахов Максим
// •	Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-тэги по своему желанию. Доска должна быть разленована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
"use strict";

var table = document.createElement("table");
table.width = "900px";
table.height = "900px";
var trs = newlist();
var tds = newlist();
var contents = newlist();
var txt = "";

for (var i = 0; i < 9; i++) {
    trs.prepend("tr"+i, document.createElement("tr"));

    for (var j = 0; j < 9; j++) {
        tds.prepend("td_"+i+"_"+j,document.createElement("td"));
        var elem = (trs.findInList("tr"+i).value);
        elem.appendChild(tds.findInList("td_"+i+"_"+j).value);
    }
    table.appendChild(trs.findInList("tr"+i).value);
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

    while (list.name != undefined && list != null) {
        if (name == list.name) {
            return list;
        }
        list = list.rest;
    }
    return undefined;
}
