"use strict";

function check(str) {    
    var a = str.match(/[\(\{\[\]\}\)]/g);    
    var total;
    do {
        var b = a.shift().charCodeAt();
        b = b == 40 ? b + 1 : b + 2; //( - 40 ) - 41  
        total = b == a.pop().charCodeAt();      
    } while(total && a.length > 1)
    return !a.length && total;
}

['t({e}s)t', 'te[st]', '[t{e(s)t}]', '{t(e}s)t','t {e(}s}t', 't(e[st]', '[])test','(tes]t)'].forEach(function(test) {
    console.log(test.replace(/[^\(\{\[\]\}\)]/g,'') + ' - ' + check(test));
});


