function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

window.onload = function () {
    // get the tab index
    var titles = $('notice-title').getElementsByTagName('li'),
        divs = $('notice-con').getElementsByTagName('div');
    var timer = null;

    if (titles.length != divs.length)
        return;
    console.log('a');
    for (var i = 0; i < titles.length; i++) {
        titles[i].onmouseover = (function (i) {
            return function () {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                timer = setTimeout(function () {
                    for (var j = 0; j < titles.length; j++) {
                        titles[j].className = '';
                        divs[j].style.display = 'none';
                    }
                    titles[i].className = 'select';
                    divs[i].style.display = 'block';
                }, 500);

            }
        }(i));
    }
}