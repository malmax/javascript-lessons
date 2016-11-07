function isPalindrome(s) {
    s = s.match(/(\w|\d)/gi);
    n = s.slice(0).reverse()+"";
    console.log(n);
    console.log(s+"");
    return (""+s).search(/n/i);
    // return (ns == s ? true : false);
}
console.log(isPalindrome("level"));                   // logs 'true'
console.log(isPalindrome("levels"));                  // logs 'false'
console.log(isPalindrome("A car, a man, a maraca"));  // logs 'true'
