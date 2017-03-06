import * as formatter from './formatter.es6'

const ApiKey = '22c7d2614bec413494f1ba7b26b43c89';
const source = 'bbc-news';
const sortBy = 'latest';
let funcs = this;

export function getAllNews(){
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
                let button = elements[i].querySelector('.button');
                button.addEventListener('click', () => {
                    fetch('https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + ApiKey)
                        .then((response) => response.json())
                        .then((data) => button.id < data.articles.length ? formatter.createElementForAny(data.articles[button.id]): '')
                        .catch((ex) => console.log('Parsing failed', ex));
                }, false);
            }
        })
        .catch((ex) => console.log('Parsing failed', ex));
}