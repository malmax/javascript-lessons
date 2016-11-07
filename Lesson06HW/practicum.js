"use strict";

// User storage
var users = [{
    id: 1,
    firstName: 'Dmitry',
    lastName: 'Kozlov',
    birthDay: '16.07.1990',
    phones: [
        '89001234567',
        '83431234567'
    ]
}, {
    id: 2,
    firstName: 'Ivan',
    lastName: 'Petrov',
    birthDay: '08.06.1956',
    phones: [
        '89001234567',
        '83431234567'
    ]
}];

function addUser() {
    var user = {};

    user.firstName = prompt('Введите имя:');
    user.lastName = prompt('Введите фамилию:');
    user.birthDay = prompt('Дату рождения:');
    user.phones = [];
    while (true) {
        var phone = prompt('Номер телефона:(для выхода введите пустой номер)');
        if (!phone) break;
        user.phones.push(phone);
    }

    user.id = getUserId();

    users.push(user);
}

function getUserId() {
    var id = 0;
    users.forEach(function(user) {
        if (user.id > id) {
            id = user.id;
        }
    });
    return ++id;
}

function delUser(id) {
    if (!id) {
        return false;
    }
    var newusers = [];
    users.forEach(function(user) {
        if (user.id != id) {
            newusers.push(user);
        }
    });
    users = newusers;
}

function csvFormat() {
    return users.map(function(user) {
        return Object.keys(user).map(function(key) {
            if (typeof user[key] == 'string') return "'" + user[key] + "'";
            else if (typeof user[key] == "object") {
                return user[key].map(function(phone) {
                    return "'" + phone + "'";
                }).join(",");
            }
        }).join(";");
    }).join("\r\n");
}

function search(str) {
  var result = [];
  var userName;
  this.forEach(function(item) {
    userName = (item.firstName + " " + item.lastName).toLowerCase();
    if(~userName.indexOf(str.toLowerCase())) {
      result.push(item);
    }
  });
  return result;
}

console.log(search.call(users,"koz"));

for (var i = 0; i < users.length; ++i) {
    console.log('Имя: ' + users[i].firstName, ' Фамилия: ' + users[i].lastName, ' Дата рождения: ' + users[i].birthDay, ' Телефоны: ' + users[i].phones.join(', '));
}
