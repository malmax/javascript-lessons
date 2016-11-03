// Малахов Максим
// •	Написать функцию преобразования цвета из 10-ного представления в 16-ный. Функция должна принимать 3 числа от 0 до 255 и возвращать строковый хеш.
"use strict";

function dectohex(x, y, z) {
    x = (x > 255 || x < 0) ? 255 : x;
    y = (y > 255 || y < 0) ? 255 : y;
    z = (z > 255 || z < 0) ? 255 : z;

    var hexarr = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];

    function helper(num) {
        var out = "";
        var end = 0;
        while(num > 16) {
            end = num % 16;
            out = hexarr[end] + out;            
            num = (num - end)/16;
        }
        out = hexarr[num] + out;
        if(out.length == 1) {
            out = "0" + out;
        }
        return out;
    }

    return helper(x) + helper(y) + helper(z);
}


console.log(dectohex(134,0,255));
