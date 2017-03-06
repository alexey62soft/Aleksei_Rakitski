import * as formatter from './formatter.es6'

const ApiKey = '22c7d2614bec413494f1ba7b26b43c89';
const source = ['bbc-news', 'business-insider', 'the-sport-bible', 'google-news', 'national-geographic', 'new-scientist'];
let indOfS = 0;
const sort = 'top';
let funcs = this;

function gAllN() {
    fetch('https://newsapi.org/v1/articles?source=' + source[indOfS] + '&sortBy=' + sort + '&apiKey=' + ApiKey)
        .then((response) => response.json())
        .then((data) => {
            let index = 0;
            document.querySelector('.events-container').innerHTML = '';
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
    fetch('https://newsapi.org/v1/articles?source=' + source[indOfS] + '&sortBy=' + sort + '&apiKey=' + ApiKey)
        .then((response) => response.json())
        .then((data) => {
            id < data.articles.length ? formatter.createElementForAny(data.articles[id]): '';
        })
        .catch((ex) => console.log('Parsing failed', ex));
}

function chSource(param) {
    document.querySelector('.prev-events').style.display = 'none';
    document.querySelector('.next-events').style.display = 'none';
    if(indOfS + param == 0)
    {
        document.querySelector('.next-events').style.display = 'inline-block';
    }
    else if(indOfS + param == source.length - 1) {
        document.querySelector('.prev-events').style.display = 'inline-block';
    }
    else if(indOfS + param > 0 && indOfS + param < source.length - 1) {
        document.querySelector('.next-events').style.display = 'inline-block';
        document.querySelector('.prev-events').style.display = 'inline-block';
    }
    indOfS = indOfS + param;
    gAllN();
}

export function getAllNews(){
    gAllN();
}

export function getAnyNews(id){
    gAnyN(id);
}

export function changeSource(param){
    chSource(param);
}