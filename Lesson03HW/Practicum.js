// User storage
var users = [{
    firstName: 'Dmitry',
    lastName: 'Kozlov',
    birthDay: '16.07.1990',
    phones: [
        '89001234567',
        '83431234567'
    ]
}, {
    firstName: 'Ivan',
    lastName: 'Petrov',
    birthDay: '08.06.1956',
    phones: [
        '89001234567',
        '83431234567'
    ]
}];

var user = {};

user.firstName = prompt('Введите имя:');
user.lastName = prompt('Введите фамилию:');
user.birthDay = prompt('Дату рождения:');
user.phones = [];
user.phones[0] = prompt('Номер телефона:');

users.push(user);

for (var i = 0; i < users.length; ++i) {
    console.log('Имя: ' + users[i].firstName, ' Фамилия: ' + users[i].lastName, ' Дата рождения: ' + users[i].birthDay, ' Телефоны: ' + users[i].phones.join(', '));
}
