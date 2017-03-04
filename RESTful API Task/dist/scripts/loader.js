(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _newsapi = require('./modules/newsapi.es6');

var newsapi = _interopRequireWildcard(_newsapi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

newsapi.getAllNews();

},{"./modules/newsapi.es6":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createElementForAll = createElementForAll;
exports.createElementForAny = createElementForAny;
var allEventsContainer = 'events-container';
var anyEventContainer = 'any-event';

function createElementForAll(elem, index) {
    document.getElementsByClassName(anyEventContainer)[0].style.display = 'none';
    var htmlText = '<div class="event-item row">' + '<div class="col-md-1">' + '<span class="month">' + new Date(elem.publishedAt).getMonth() + '<span class="under">_</span></span>' + '<span class="day">' + new Date(elem.publishedAt).getDay() + '</span></div>' + '<div class="col-md-5 img"><img src=' + elem.urlToImage + '></div>' + '<div class="col-md-5 text">' + '<h4>' + elem.title.substring(0, 19) + '...' + '</h4><h5>' + elem.author + '</h5><h5>Descrition</h5><p class="descriptionitem">' + elem.description.substring(0, 117) + '...' + '</p><div id=' + index + ' class="button">View Event Details</div></div></div>';
    var htmlCont = document.getElementsByClassName(allEventsContainer)[0];
    htmlCont.insertAdjacentHTML('beforeEnd', htmlText);
    htmlCont.style.display = 'block';
}

function createElementForAny(elem) {
    document.getElementById('testAll').style.display = 'none';
    var text = '<div><ul><li>Title: ' + elem.title + '</li><li>Author: ' + elem.author + '</li><li>Published at: ' + elem.publishedAt + '</li><li>Description: ' + elem.description + '</li><li>Url: ' + elem.url + '<li><img style="width: 200px" src=' + elem.urlToImage + '></li></ul></div>';
    var htmlcont = document.getElementById('testAny');
    htmlcont.innerHTML = "";
    htmlcont.insertAdjacentHTML('beforeEnd', text);
    document.getElementById('testAny').style.display = 'block';
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllNews = getAllNews;
exports.getAnyNews = getAnyNews;

var _formatter = require('./formatter.es6');

var formatter = _interopRequireWildcard(_formatter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ApiKey = 'fcd23384830044aaae4949fb0f7f2341';
var source = 'bbc-news';

function getAllNews() {
    var _this = this;

    fetch('https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + ApiKey).then(function (response) {
        return response.json();
    }).then(function (data) {
        var index = 0;
        data.articles.forEach(function (element) {
            formatter.createElementForAll(element, index);
            index++;
        }, _this);
    }).catch(function (ex) {
        return console.log('parsing failed', ex);
    });
}

function getAnyNews(num) {
    fetch('https://newsapi.org/v1/articles?source=abc-news-au&apiKey=' + ApiKey).then(function (response) {
        return response.json();
    }).then(function (data) {
        return num < data.articles.length ? formatter.createElementForAny(data.articles[num]) : '';
    }).catch(function (ex) {
        return console.log('parsing failed', ex);
    });
}

},{"./formatter.es6":2}]},{},[1]);
