/**
 * Created by caoyangkaka on 5/28/15.
 *
 * Revise in May, 29, 2015, about the MVO model
 */
(function () {
    "use strict";

    /* ======Model======  */
    var model = {
        catList: [
            {
                name: 'Cat 1',
                src: 'src/img/1.jpg',
                click: 0
            },
            {
                name: 'Cat 2',
                src: 'src/img/2.jpg',
                click: 0
            },
            {
                name: 'Cat 3',
                src: 'src/img/3.jpg',
                click: 0
            },
            {
                name: 'Cat 4',
                src: 'src/img/4.jpg',
                click: 0
            },
            {
                name: 'Cat 5',
                src: 'src/img/5.jpg',
                click: 0
            }
        ],
        currentCat: null
};

    /* ======Octopus======  */

    var octopus = {
        init: function() {
            model.currentCat = model.catList[0];
            listView.init();
            imgView.init();
            formView.init();
        },
        getCatList: function() {
            return model.catList;
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },
        incrementNum: function() {
            model.currentCat.click++;
            imgView.render();
        },
        updateCat: function(cat) {
            model.currentCat.name = cat.name;
            model.currentCat.src = cat.src;
            model.currentCat.click = cat.click;
        }

    };

    /* ======ListView======  */

    var listView = {
        init: function() {
            this.catSelect = document.getElementById('select');
            this.render();
        },
        render: function() {
            var cats, elem, cat;
            cats = octopus.getCatList();

            this.catSelect.innerHTML = '';

            for(var i = 0; i < cats.length; i++) {
                cat = cats[i];
                elem = document.createElement('li');
                elem.style.float = 'left';
                elem.style.margin = '10px';
                elem.style.border = '1px solid rgb(100, 238, 200)';
                elem.style.background = '#9ee';
                elem.style.borderRadius = '10%';
                elem.textContent = cat.name;
                elem.addEventListener('click', (function(cat) {
                    return function() {
                        octopus.setCurrentCat(cat);
                        imgView.render();
                    }
                })(cat));
                this.catSelect.appendChild(elem);
            }
        }

    };

    /* ======imgView======  */

    var imgView = {
        init: function() {
            this.catName = document.getElementById('catName');
            this.catImage = document.getElementById('catImage');
            this.catNum = document.getElementById('catNum');

            // add the event
            this.catImage.addEventListener('click', function() {
                octopus.incrementNum();
            });

            //render the page
            this.render();
        },
        render: function() {
            //get the currentCat
            var currCat = octopus.getCurrentCat();
            this.catName.textContent = currCat.name;
            this.catImage.src = currCat.src;
            this.catNum.value = (currCat.click > 1)? currCat.click + ' Clicks': currCat.click + ' Click';
        }
    };

    /* ======formView======  */
    var formView = {
        init: function() {
            this.admin = document.getElementById('admin');
            this.admin.addEventListener('click', function() {
                formView.render();
            });
            this.submit = document.getElementById('submit');
            this.submit.addEventListener('click', function() {
                var editName = document.getElementById('editName').value;
                var editUrl = document.getElementById('editUrl').value;
                var editNum = document.getElementById('editNum').value;
                octopus.updateCat({name: editName, src: editUrl, click: parseInt(editNum)});
                listView.render();
                imgView.render();
                document.getElementById('catForm').style.display = 'none';
            });

            this.cancel = document.getElementById('cancel');
            this.cancel.addEventListener('click', function() {
                document.getElementById('catForm').style.display = 'none';
            })
        },

        render: function() {
            this.catForm = document.getElementById('catForm');
            this.catForm.style.display = 'block';
            var cat = octopus.getCurrentCat();
            document.getElementById('editName').value = cat.name;
            document.getElementById('editUrl').value = cat.src;
            document.getElementById('editNum').value = cat.click;
        }
    }

    octopus.init();
}());