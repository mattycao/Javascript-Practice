var initalCat = [
    {
        clickCount: 0,
        name: 'Tabby',
        imgSrc: 'img/1.jpg',
        nickName: ['a', 'b', 'c', 'd', 'e']
    },
    {
        clickCount: 0,
        name: 'RagDull',
        imgSrc: 'img/2.jpg',
        nickName: ['b', 'b', 'c', 'd', 'e']
    },
    {
        clickCount: 0,
        name: 'Tiger',
        imgSrc: 'img/3.jpg',
        nickName: ['c', 'b', 'c', 'd', 'e']
    },
    {
        clickCount: 0,
        name: 'Scaredy',
        imgSrc: 'img/4.jpg',
        nickName: ['d', 'b', 'c', 'd', 'e']
    },
    {
        clickCount: 0,
        name: 'Shadow',
        imgSrc: 'img/5.jpg',
        nickName: ['e', 'b', 'c', 'd', 'e']
    },
];

var Cat = function (data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nickName = ko.observableArray(data.nickName);
    this.title = ko.computed(function () {
        var num = this.clickCount();
        var title = '';
        switch (true) {
            case num < 10:
                title = 'infant';
                break;
            case num < 20:
                title = 'child';
                break;
            case num < 30:
                title = 'teen';
                break;
            case num < 40:
                title = 'adult';
                break;
            default:
                title = 'GrownUp';
        }
        return title;
    }, this);
}

var ViewModel = function () {
    var self = this;// the viewModel
    this.catList = ko.observableArray([]);
    initalCat.forEach(function (catItem) {
        self.catList.push(new Cat(catItem));
    });
    this.CurrentCat = ko.observable(this.catList()[0]);

    this.incrementCounter = function () {
        // after using the with, the this here is refer to the CurrentCat
        this.clickCount(this.clickCount() + 1);
    };

    this.catChange = function(currCat) {
        self.CurrentCat(currCat);
    }
}

ko.applyBindings(new ViewModel());