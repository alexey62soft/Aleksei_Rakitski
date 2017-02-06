/*
    This script for Arrays part fo JS Task 1
    By Rakitski Aleksei
*/

//Define new String.prototype functions
Array.prototype.matrixToArray = function() {
    var isMatrix = true;
    //is matrix?
    for (var i = 0; i < this.length; i++) {
        if (Array.isArray(this[i]) === true) {
            for (var j = 0; j < this[i].length; j++) {
                if (Array.isArray(this[i][j] === true)) {
                    isMatrix = false;
                    break;
                }
            }
        }
        else {
            isMatrix = false;
            break;
        }
    }
    if(isMatrix === true){
        var tempArray = [];
        this.forEach(function(item) {
            item.forEach(function(elem) {
                tempArray.push(elem);
            });
        });
        
        return tempArray;
    }
    
    return [];
}

Array.prototype.arrayToMatrix = function(output) {
    var isTrue = true;
    var countOfElements = 0;
    //is array?
    for (var i = 0; i < this.length; i++) {
        if (Array.isArray(this[i] === true)) {
            isTrue = false;
            break;
        }
    }
    //is matrix?
    for (var i = 0; i < output.length; i++) {
        if (Array.isArray(output[i]) === true) {
            for (var j = 0; j < output[i].length; j++) {
                if (Array.isArray(output[i][j] === true)) {
                    isTrue = false;
                    break;
                }
                else {
                    countOfElements++;
                }
            }
        }
        else {
            isTrue = false;
            break;
        }
    }
    if (isTrue === true && this.length === countOfElements){
        var tempArray = this.slice();
        var tempMatrix = [];
        for (var i = 0; i < output.length; i++)  {
            tempMatrix[i] = [];
            for (var j = 0; j < output[i].length; j++) {
                tempMatrix[i][j] = tempArray.shift();
            }
        }; 

        return tempMatrix;
    }
    
    return [];
}

//Inseriton sort
Array.prototype.insertionSort = function() {
    for (var i = 0; i < this.length; i++) {
        var x = this[i];
        for (var j = i - 1; j >= 0 && this[j] > x; j--) {
            this[j+1] = this[j];
        }
        this[j+1] = x;
    }
    return this;
}

//QuickSort
Array.prototype.quickSort = function() {
    if(this.length <= 1) return this;
    
    var left = [], right = [], middle = this[0];
    
    for (var i = 1; i < this.length; i++) {
        this[i] < middle ? left.push(this[i]) : right.push(this[i])
    }
    
    return [...left.quickSort(), middle, ...right.quickSort()];
}

//Merge sort
function merge(left, right) {
    var result = [];
 
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
}

Array.prototype.mergeSort = function() {
    if (this.length < 2)
        return this;
 
    var middle = parseInt(this.length / 2);
    var left   = this.slice(0, middle);
    var right  = this.slice(middle, this.length);
 
    return merge(left.mergeSort(), right.mergeSort());
}

//Bubble sort
Array.prototype.bubbleSort = function() {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < this.length-1; i++) {
            if (this[i] > this[i+1]) {
                var temp = this[i];
                this[i] = this[i+1];
                this[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    
    return this;
}

//Shell sort
Array.prototype.shellSort = function() {
	var middle = parseInt(this.length / 2);
 
	while(middle > 0)
	{
		for(var i = middle; i < this.length; i++) {
			var temp = this[i];
			var j = i;
			while(j >= middle && this[j - middle] > temp) {
				this[j] = this[j - middle];
				j -= middle;
			}
			this[j] = temp;
		}
		middle = parseInt(middle / 2);
	}
 
	return this;
}

//Counting sort
Array.prototype.countingSort = function() {
    
	var index = 0;
	var min, max;
    
	min = max = this[0];
	for(var i = 1; i < this.length; i++) {
		min = (this[i] < min) ? this[i] : min;
		max = (this[i] > max) ? this[i] : max;
	}
 
	var k = max - min + 1;
	var buckets = new Array(k);
    buckets.fill(0);

	for(var i = 0; i < this.length; i++) {
        buckets[this[i] - min]++;
    }
    
	for(var i = min; i <= max; i++) {
        for(var j = 0; j < buckets[i - min]; j++) {
            this[index++] = i;
        }
    } 

    return this;
}

//Max
Array.prototype.findMax = function() {
    var max = this[0][0];
    this.forEach(function(item) {
        item.forEach(function(elem) {
            max = (elem > max) ? elem : max;
        });
    });
    return max;
}

//Min
Array.prototype.findMin = function() {
    var min = this[0][0];
    this.forEach(function(item) {
        item.forEach(function(elem) {
            min = (elem < min) ? elem : min;
        });
    });
    return min;
}

//Avg
Array.prototype.findAvg = function() {
    var sum = 0;
    this.forEach(function(item) {
        item.forEach(function(elem) {
            sum += elem;
        });
    });
    return sum / this.length;
}

//Printing hourglass
function hourglassPrint(n) {
    var array = new Array(n);
    for(var i = 0; i < n; i++) {
        //Fill row of square array by 0
        array[i] = new Array(n);
        array[i].fill(0);
        //Fill part of hourglass by 1
        var fillFrom = Math.min(i, n - i - 1);
        var fillTo = Math.max(i, n - i - 1);
        array[i].fill(1, fillFrom, fillTo + 1);
    }
    return array;
}

//Printing left triangle
function leftTrianglePrint(n) {
    var array = new Array(n);
    for(var i = 0; i < n; i++) {
        //Fill row of square array by 0
        array[i] = new Array(n);
        array[i].fill(0);
        //Fill part of left triangle by 1
        var fillTo = Math.min(i, n - 1 - i);
        array[i].fill(1, 0, fillTo + 1);
    }
    return array;
}

function objSort(array, order) {
    //Sorting functions
    function compareByAsc(a, b) {
        return Object.keys(a).length - Object.keys(b).length;
    }
    function compareByDesc(a, b) {
        return Object.keys(b).length - Object.keys(a).length;
    }
    
    //Execute method
    if(order.toString().toUpperCase() === 'ASC') {
        return array.sort(compareByAsc);
    } 
    else if (order.toString().toUpperCase() === 'DESC') {
        return array.sort(compareByDesc);
    } 
    else {
        console.log('Unknown order: ' + order.toString().toUpperCase() + '.');
    }
}

//Execute task =)
var array = [[5, 2, 13], [-1, -3, -12], [5, -24, 3]];

//Square arrays (numbers)
console.log(array.matrixToArray().insertionSort().arrayToMatrix(array));
console.log(array.matrixToArray().quickSort().arrayToMatrix(array));
console.log(array.matrixToArray().mergeSort().arrayToMatrix(array));
console.log(array.matrixToArray().bubbleSort().arrayToMatrix(array));
console.log(array.matrixToArray().shellSort().arrayToMatrix(array));
console.log(array.matrixToArray().countingSort().arrayToMatrix(array));
console.log(array.findMax());
console.log(array.findMin());
console.log(array.findAvg());
console.log(hourglassPrint(5));
console.log(leftTrianglePrint(5));

//Array of bjects
var obj1 = { a: 2, c: 3, d: 3};
var obj2 = { a: 1 };
var obj3 = { a: 2, c: 3};
var arOfObj = [obj1, obj2, obj3];

// Calling method
console.log(objSort(arOfObj, 'asc'));
console.log(objSort(arOfObj, 'desc'));