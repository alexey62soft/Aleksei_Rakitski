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
    let text = '<div><ul><li>Title: ' + elem.title + 
        '</li><li>Author: ' + elem.author + 
        '</li><li>Published at: ' + elem.publishedAt + 
        '</li><li>Description: ' + elem.description + 
        '</li><li>Url: ' + elem.url + 
        '<li><img style="width: 200px" src=' + elem.urlToImage +
        '></li></ul></div>';
    var htmlcont = document.querySelector(anyEventContainer);
    htmlcont.innerHTML = "";
    htmlcont.insertAdjacentHTML('beforeEnd', text);
    document.querySelector(anyEventContainer).style.display = 'block';
}