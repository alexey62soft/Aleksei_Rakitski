import * as formatter from './formatter.es6'

const ApiKey = '22c7d2614bec413494f1ba7b26b43c89';
const source = 'bbc-news';
const sortBy = 'latest';

export function getAllNews(){
	fetch('https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + ApiKey)
        .then((response) => response.json())
        .then((data) => {
            let index = 0;
            data.articles.forEach(function(element) {
                formatter.createElementForAll(element, index);
                index++;
            }, this);
        })
        .catch((ex) => console.log('Parsing failed', ex));
}

export function getAnyNews(num){
	fetch('https://newsapi.org/v1/articles?source=' + source + '&sortBy=' + sortBy + '&apiKey=' + ApiKey)
        .then((response) => response.json())
        .then((data) => num < data.articles.length ? formatter.createElementForAny(data.articles[num]): '')
        .catch((ex) => console.log('Parsing failed', ex));
}