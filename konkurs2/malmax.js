"use strict";

function check(str) {    
    var a = str.match(/[\(\{\[\]\}\)]/g);    
    do {
        var b = a.shift().charCodeAt();
        b = b == 40 ? b + 1 : b + 2; //( - 40 ) - 41        
    } while(b == a.pop().charCodeAt() && a.length > 1)
    return !a.length;
}

['({})', '[]', '[{()}]', ' {(})', '([]', '[])','(])'].forEach(function(test) {
    console.log(test + ' - ' + check(test));
});


