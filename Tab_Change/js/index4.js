(function () {
    "use strict";

    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }

    window.onload = tab;

    function tab() {
        var index = 0;
        var timer = null;

        var lis = $('notice-title').getElementsByTagName('li');
        var divs = $('notice-con').getElementsByTagName('div');
        var notice = $('notice');

        notice.onmouseout = function() {
            if(timer) {
                clearInterval(timer);
                timer = null;
            }
            timer = setInterval(autoPlay, 2000);
        }
        //
        for (var i = 0; i < lis.length; i++) {
            lis[i].id = i;
            lis[i].onmouseover = function () {
                clearInterval(timer);
                changeOption(this.id);
                index = this.id;
            }
            lis[i].onmouseout = function () {
                timer = setInterval(autoPlay, 2000);
            }
            divs[i].onmouseover = function() {
                if(timer) {
                    clearInterval(timer);
                    timer = null;
                }
            }
        }
        if(timer) {
            clearInterval(timer);
            timer = null;
        }
        timer = setInterval(autoPlay, 2000);

        function changeOption(index) {
            for (var j = 0; j < lis.length; j++) {
                lis[j].className = '';
                divs[j].style.display = 'none';
            }
            lis[index].className = 'select';
            divs[index].style.display = 'block';
        }

        function autoPlay() {
            index = (++index) % 5;
            changeOption(index);
        }
    }


}());