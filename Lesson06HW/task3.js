// Малахов Максим
// Реализовать функцию pick(obj, keys), которая принимает аргументами объект и массив строк (названия ключей). Возвращает новый объект, куда вошли все ключи, указанные в массиве keys, и соответствующие значения из объекта obj. Если в объекте obj, нет ключа, указанного в массиве keys, в результирующем объекте этот ключ не должен присутствовать.
"use strict";

var user = {
    name: 'Sergey',
    age: 30,
    email: 'sergey@gmail.com',
    friends: ['Sveta', 'Artem']
}
console.log(pick(user, ['name'])); // {name: 'Sergey'}
console.log(pick(user, ['name', 'second-name'])); // {name: 'Sergey'}
console.log(pick(user, ['name', 'friends'])); // {name: 'Sergey', friends:['Sveta', 'Artem']}

function pick(obj, keys) {
  var new_obj = {};
  keys.forEach(function(item) {
    if(obj[item] != undefined) {
      new_obj[item] = obj[item];
    }
  });
  return new_obj;
}
