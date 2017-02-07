/*
    This script for Statements part fo JS Task 1
    By Rakitski Aleksei
*/

function convertNumbers(str) {
    var result = '';
    // replacing hex numbers in prefixed (\x or 0x) format
    if (str.search(/^([\\0]*x([0-9a-fA-F]+))$/g) !== -1) {
        str = str.replace(/^([\\0]*x([0-9a-fA-F]+))$/g, function(completeMatch, prefix, hexNum, offset, inputString) {
            result = hexNum;
        });
        return parseInt(result, 16);
    }
    // replacing hex humbers in non-prefixed format
    if (str.search(/^([a-fA-F][0-9a-fA-F]*)$/g) !== -1) {
        str = str.replace(/^([a-fA-F][0-9a-fA-F]*)$/g, function(completeMatch, hexNum, offset, inputString) {
            result = hexNum;
        });
        return parseInt(result, 16);
    }
    // replacing numbers in decimal format
    str = str.replace(/([0-9]+)/g, function(completeMatch, decNum, offset, inputString) {
        result = result.concat(decNum);
    });
    return parseInt(result, 10);
}

function sumNumbers() {
    var sum = 0;
    Array.prototype.slice.call(arguments).forEach(function(item) {
        if(typeof item == 'string') {
            var number = convertNumbers(item);
            sum += number; 
        }
    });
    return sum;
}

function parseObject(str) {
    var regexArrayStart = /:([a-zA-Z_][0-9a-zA-Z\-_]*,[0-9a-zA-Z\-_]*);/g;
    var regexArrayMiddle = /\\([a-zA-Z_][0-9a-zA-Z\-_]*,[0-9a-zA-Z\-_]*);/g;
    var regexArrayEnd = /\\([a-zA-Z_][0-9a-zA-Z\-_]*,[0-9a-zA-Z\-_]*)$/g;
    // trim start spaces and empty semicolons
    str = str.replace(/^[\s;]*/,'');
    // trim end spaces and empty semicolons
    str = str.replace(/[\s;]*$/,'');
    // array in the end create
    str = str.replace(regexArrayStart,':[{$1};\\');
    while(str.search(regexArrayMiddle) !== -1) {
        str = str.replace(regexArrayMiddle,'{$1};\\');
    }
    str = str.replace(regexArrayEnd,'{$1}]');
    str = str.replace(/,/g,':'); // , -> :
    str = str.replace(/;/g,','); // ; -> ,
    str = str.replace(/([a-zA-Z_][0-9a-zA-Z\-_]*)/g,'"$1"'); // quoting
    return JSON.parse('{' + str + '}');
}

var strings = ['123x1z13', 'a123', '0xBB123', '\\xF'];
console.log(strings);
console.log(sumNumbers.apply(null, strings));
var data = ";key,value;key1,value;key3,value3;";
var output = parseObject(data);
console.log(output);
var str = '\r;key,value;key1,value;key3,value3;arrayHere:k1,v1;k2,v2;k3,v3;k4,v4;\t;\n';
var obj = parseObject(str);
console.log(obj);