var str = "test test test";
var num = 2;
var truncateSentence = function(s, k) {
    return s.split(' ').slice(0,k).join(' ');
};
console.log(truncateSentence(str, 2));
//Accepted Runtime: 92 ms

var coordinates = "c3";
var squareIsWhite = function(coordinates) {
    var charArr = coordinates.split('');
    return (charArr[0].charCodeAt()+parseInt(charArr[1]))%2
};
console.log(squareIsWhite(coordinates));