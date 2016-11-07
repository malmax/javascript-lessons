function isPalindrome(s) {
    // return(s=s.toLowerCase().match(/\w/g))+''==s.reverse();
    s=s.toLowerCase().match(/\w|\d/g);return s.slice(0).reverse()+""==s;
}
console.log(isPalindrome("level"));                   // logs 'true'
console.log(isPalindrome("levels"));                  // logs 'false'
console.log(isPalindrome("A car, a man, a maraca"));  // logs 'true'
