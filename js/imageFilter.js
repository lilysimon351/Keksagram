var filtersButtons = document.querySelectorAll('.img-filters__button');

filtersButtons[0].addEventListener('click', function () {
    
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    var elem = this;
    elem.classList.add('img-filters__button--active');

    getImages();
});

filtersButtons[1].addEventListener('click', function () {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    var elem = this;
    elem.classList.add('img-filters__button--active');
    shuffle(photos);
    renderImages(10);
})

filtersButtons[2].addEventListener('click', function() {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    var elem = this;
    elem.classList.add('img-filters__button--active');

    photos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
    });
    renderImages(photos.length);
})