import * as formatter from './formatter.es6'

const ApiKey = '22c7d2614bec413494f1ba7b26b43c89';
const source = 'bbc-news';
const sortBy = 'latest';
let funcs = this;

function gAllN() {
    fetch('https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + ApiKey)
        .then((response) => response.json())
        .then((data) => {
            let index = 0;
            data.articles.forEach((element) => {
                formatter.createElementForAll(element, index);
                index++;
            }, this);
            let elements = document.getElementsByTagName('event-general');
            for (var i = 0; i < elements.length; i++) {
                let button = elements[i].shadowRoot.querySelector('.button');
                button.addEventListener('click', () => {
                    gAnyN(button.id);
                }, false);
            }
        })
        .catch((ex) => console.log('Parsing failed', ex));
}

function gAnyN(id) {
    fetch('https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + ApiKey)
        .then((response) => response.json())
        .then((data) => {
            id < data.articles.length ? formatter.createElementForAny(data.articles[id]): '';
        })
        .catch((ex) => console.log('Parsing failed', ex));
}

export function getAllNews(){
    gAllN();
}

export function getAnyNews(id){
    gAnyN(id);
}