"use strict";

function isPalindrome(str,fromstart,fromend) {
    str = str.toLowerCase().replace(/[, ]/g,"");
    fromstart = fromstart||0;
    fromend = fromend||(str.length-1);

    if(fromend-fromstart>=1) {
        if(str.charAt(fromend) == str.charAt(fromstart)) {
            return isPalindrome(str,fromstart+1,fromend-1);
        }
        else {
            return false;
        }
    }
    return true;
}

//тесты:
console.log(isPalindrome("v"));
console.log(isPalindrome("ev"));
console.log(isPalindrome("level"));                   // logs 'true'
console.log(isPalindrome("levels"));                  // logs 'false'
console.log(isPalindrome("A car, a man, a maraca"));  // logs 'true'
