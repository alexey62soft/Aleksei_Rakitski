//By Aleksei Rakitski 2017


//for first slider
function firstCurrentDiv(n) {
    firstShowDivs(n);
}

function firstShowDivs(n) {
    var i, firstSlideIndex = n;
    var x = document.getElementsByClassName('mySlide firstInScript');
    var dots = document.getElementsByClassName('dot firstInScript');
    if (n > x.length) {firstSlideIndex = 1}    
    if (n < 1) {firstSlideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    x[firstSlideIndex-1].style.display = "block";  
    dots[firstSlideIndex-1].className += " active";
}