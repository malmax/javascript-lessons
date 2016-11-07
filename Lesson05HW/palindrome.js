function isPalindrome(s) {
    s=s.toLowerCase().match(/(\w|\d)/g);
    return s.slice(0).reverse()+""==s?true:false;
}
console.log(isPalindrome("level"));                   // logs 'true'
console.log(isPalindrome("levels"));                  // logs 'false'
console.log(isPalindrome("A car, a man, a maraca"));  // logs 'true'
