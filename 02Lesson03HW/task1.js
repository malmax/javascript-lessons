/* jshint browser: true */
/* jshint node: true */
"use strict";

// Малахов Максим
// Напишите регулярное выражение для поиска HTML-цвета, заданного как #ABCDEF, то есть # и содержит затем 6 шестнадцатеричных символов.

var str = "Необходимо найти #FD23F0 цвет в этой строке и заменить его на #85FDAA";
var reg = /#([A-F0-9]+)/ig;
console.log(str.match(reg));
