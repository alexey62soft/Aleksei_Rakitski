const allEventsContainer = 'events-container'
const anyEventContainer = 'any-event';

export function createElementForAll(elem, index)
{
    document.getElementsByClassName(anyEventContainer)[0].style.display = 'none';
    let htmlText = '<event-general><div class="row">'+
                    '<div class="col-first">' +
                        '<span class="month">' + new Date(elem.publishedAt).getMonth() +
                            '<span class="under">_</span></span>' + 
                        '<span class="day">' + new Date(elem.publishedAt).getDay() + 
                        '</span></div>' +
                    '<div class="col-second"><img src=' + elem.urlToImage + '></div>' +
                    '<div class="col-third">' + 
                        '<h4>' + elem.title.substring(0, 19) + '...' +
                        '</h4><h5>' + elem.author + 
                        '</h5><h5>Descrition</h5><p class="descriptionitem">' + elem.description.substring(0, 117) + '...' +
                        '</p><div id=' + index + ' class="button">View Event Details</div></div></div></event-general>'
    let htmlCont = document.getElementsByClassName(allEventsContainer)[0];
    htmlCont.insertAdjacentHTML('beforeEnd', htmlText);
    htmlCont.style.display = 'block';
}

export function createElementForAny(elem)
{
    document.getElementsByClassName('.events')[0].style.display = 'none';
    let text = '<div><ul><li>Title: ' + elem.title + 
        '</li><li>Author: ' + elem.author + 
        '</li><li>Published at: ' + elem.publishedAt + 
        '</li><li>Description: ' + elem.description + 
        '</li><li>Url: ' + elem.url + 
        '<li><img style="width: 200px" src=' + elem.urlToImage +
        '></li></ul></div>';
    var htmlcont = document.getElementById('testAny');
    htmlcont.innerHTML = "";
    htmlcont.insertAdjacentHTML('beforeEnd', text);
    document.getElementById('testAny').style.display = 'block';
}