// Малахов Максим
// * Реализовать функцию objectToQueryString(object), которая принимает аргументом объект, возвращает строку. Примеры работы:
// console.log(objectToQueryString({user: 'Dmitry'}));
// user=Dmitry
// console.log(objectToQueryString({user: 'Dmitry', password: 'pass'}));
// user=Dmitry&password=pass
// console.log(objectToQueryString({user: 'Dmitry', password: 'pass', id=1}));
// user=Dmitry&password=pass&id=1
"use strict";

function objectToQueryString(object) {
    var name, value;
    var url = [];
    for(name in object) {
        value = object[name].toString().replace(/ /g,"");
        url.push(name+"="+value);
    }
    return url.join("&");
}

console.log(objectToQueryString({user: 'Dmitry', password: 'pass', id:1}));
