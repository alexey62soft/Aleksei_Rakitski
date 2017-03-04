import * as formatter from './formatter.es6'

const ApiKey = 'fcd23384830044aaae4949fb0f7f2341';
const source = 'bbc-news';

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
        .catch((ex) => console.log('parsing failed', ex))

}

export function getAnyNews(num){
	fetch('https://newsapi.org/v1/articles?source=abc-news-au&apiKey=' + ApiKey)
        .then((response) => response.json())
        .then((data) => num < data.articles.length ? formatter.createElementForAny(data.articles[num]): '')
        .catch((ex) => console.log('parsing failed', ex));
}