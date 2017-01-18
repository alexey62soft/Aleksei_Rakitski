'use strict';

//By Aleksei Rakitski 2017

//fields
var firstSlideIndex = 1;
var secondSlideIndex = 1;

//for first slider
function firstShowDivs(n) {
    var i,
        x = document.getElementsByClassName('mySlide firstInScript'),
        dots = document.getElementsByClassName('dot firstInScript');
    if (n > x.length) {firstSlideIndex = 1; }
    if (n < 1) {firstSlideIndex = x.length; }
    for (i = 0; i < x.length; i = i + 1) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i = i + 1) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    x[firstSlideIndex - 1].style.display = "block";
    dots[firstSlideIndex - 1].className += " active";
}

function firstCurrentDiv(n) {
    firstShowDivs(firstSlideIndex = n);
}

//for second slider
function secondShowDivs(n) {
    var i, x = document.getElementsByClassName('mySlide secondInScript');
    if (n > x.length) {secondSlideIndex = 1; }
    if (n < 1) {secondSlideIndex = x.length; }
    for (i = 0; i < x.length; i = i + 1) {
        x[i].style.display = "none";
    }
    x[secondSlideIndex - 1].style.display = "block";
}

function secondPlusDiv(n) {
    secondShowDivs(secondSlideIndex += n);
}