import * as newsapi from './modules/newsapi.es6'

document.addEventListener('DOMContentLoaded', () => {
    let prevEventsBtn = document.querySelector('.prev-events');
    let nextEventsBtn = document.querySelector('.next-events');
    prevEventsBtn.addEventListener('click', () => {
        newsapi.changeSource(-1);
    }, false);
    nextEventsBtn.addEventListener('click', () => {
        newsapi.changeSource(1);
    }, false);

    newsapi.changeSource(0);
});

//newsapi.getAnyNews(1);

