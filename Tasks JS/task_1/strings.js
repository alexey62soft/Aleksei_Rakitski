/*
    This script for Strings part fo JS Task 1
    By Rakitski Aleksei
*/

//Define new String.prototype functions
String.prototype.toCamelCase = function() { 
    'use strict';
    var that = this.toLowerCase().replace(/[-,_](.)/g, function(match, group) {
        return group.toUpperCase();
    });
    return ((this.toLowerCase() === that) ? this : that);
}

String.prototype.toPascalCase = function() { 
    'use strict';
    return this.replace(/(?:^|\.?)([A-Z])/g, function (match, group) {
        return "_" + group.toLowerCase();
    }).replace(/^_/, "");
}

//define Execute objects constructor
function Execute(str){
    this.str = str;
}

//Define Execute.prototype functions 
Execute.prototype.reverseString = function(){
    return this.str.split("").reverse().join("");
}

Execute.prototype.startWith = function(sub){
    return this.str.startsWith(sub);
}

Execute.prototype.endWith = function(sub){
    return this.str.endsWith(sub);
}

Execute.prototype.isCamelCase = function(){
    var that = this.str;
    var tempStr = that.toCamelCase();
    return ((tempStr === that) ? true : false);
}

Execute.prototype.isPascalCase = function(){
    var that = this.str;
    var tempStr = that.toPascalCase();
    return ((tempStr === that) ? true : false);
}

//Build new instance of Execute object
var obj = new Execute('camelCaseExample');

//Execute task =)
console.log(obj.reverseString());
console.log(obj.startWith('camelC'));
console.log(obj.endWith('_example'));
console.log(obj.isCamelCase());
console.log(obj.isPascalCase());

