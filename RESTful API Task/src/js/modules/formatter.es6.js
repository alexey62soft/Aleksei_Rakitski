const allEventsContainer = '.events-container'
const anyEventContainer = '.any-event';

export function createElementForAll(elem, index)
{
    document.querySelector(anyEventContainer).style.display = 'none';
    let newEvent = document.createElement('event-general');
    let root = newEvent.shadowRoot;
    root.querySelector('.month').innerHTML = new Date(elem.publishedAt).getMonth();
    root.querySelector('.day').innerHTML = new Date(elem.publishedAt).getDay()
    root.querySelector('img').src = elem.urlToImage;
    root.querySelector('h4').innerHTML = elem.title.substring(0, 19) + '...';
    root.querySelector('h5').innerHTML = elem.author;
    root.querySelector('.descriptionitem').innerHTML = elem.description.substring(0, 117) + '...';
    root.querySelector('.button').id = index;
    let htmlCont = document.querySelector(allEventsContainer);
    htmlCont.appendChild(newEvent);
    htmlCont.style.display = 'block';
}

export function createElementForAny(elem)
{
    document.querySelector('.events').style.display = 'none';
    let newEvent = document.createElement('event-advanced');
    let root = newEvent.shadowRoot;
    root.querySelector('.info-date').innerHTML = new Date(elem.publishedAt).toDateString();
    root.querySelector('.full-link').href = elem.url;
    root.querySelector('.info-title').innerHTML = elem.title;
    root.querySelector('.info-author').innerHTML = elem.author;
    root.querySelector('.info-details').innerHTML = elem.description;
    var htmlCont = document.querySelector(anyEventContainer);
    htmlCont.innerHTML = '';
    htmlCont.appendChild(newEvent);
    document.querySelector(anyEventContainer).style.display = 'block';
}