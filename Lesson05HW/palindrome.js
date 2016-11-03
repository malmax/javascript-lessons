function isPalindrome(str) {
    str = str.toLowerCase().replace(/[, ]/g, "");
    var new_str = str.split("").reverse().toString().replace(/,/g, "");
    return (new_str == str ? true : false);
}
