"use strict";

function check(str) {    
    var a = str.match(/[\(\{\[\]\}\)]/g); // оставляем только скобки и приводим к массиву   
    var total;
    do {
        var b = a.shift().charCodeAt(); // первый элемент массива к коду
        b = b == 40 ? b + 1 : b + 2; //( - 40 ) - 41, а у других скобок разница в 2 
        total = b == a.pop().charCodeAt(); // сравниваем первый и последний элемент массива     
    } while(total && a.length > 1)
    return !a.length && total;
}

['t({e}s)t', 'te[st]', '[t{e(s)t}]', '{t(e}s)t','t {e(}s}t', 't(e[st]', '[])test','(tes]t)'].forEach(function(test) {
    console.log(test.replace(/[^\(\{\[\]\}\)]/g,'') + ' - ' + check(test));
});


