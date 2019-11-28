var photos = '';
function getImages() {
    let xhr = new XMLHttpRequest();
    let url = 'https://js.dump.academy/kekstagram/data'; 
    xhr.responseType = 'json';

    xhr.addEventListener('loadend', function () {
        if( xhr.status === 200 ) {
            photos = xhr.response;
            renderImages(photos.length);
            document.querySelector('.img-filters').classList.remove('img-filters--inactive');
        } else {
            alert(`Ошибка: ${xhr.status}`);
        }
    });
    
    xhr.addEventListener('error', function () {
        alert(`Произошла ошибка во время отправки: ${xhr.status}`);
    });
    
    xhr.open('GET', url);
    xhr.send(); 
}

function renderImages(length) {
    var template = document.querySelector('#picture').content;
    var fragment = document.createDocumentFragment();
    var photoContainer = document.querySelector('.pictures');
    var images = document.querySelectorAll('.picture__link');
    var bg = document.querySelector('.img-upload');
    var pageTitle = document.querySelector('.pictures__title');
    
    if(images.length > 0 ) {
        photoContainer.innerHTML = '';
        photoContainer.append(bg);
        photoContainer.append(pageTitle);
    }
    
    for(var i = 0; i < length; i++){
        var elem = template.cloneNode(true);
        var currElem = elem.children[0];
 
        currElem.querySelector('.picture__img').src = photos[i].url;
        currElem.querySelector('.picture__stat--likes').textContent = photos[i].likes;
        currElem.querySelector('.picture__stat--comments').textContent = photos[i].comments.length;
        
        fragment.appendChild(elem);
    }

    photoContainer.appendChild(fragment);
}

document.addEventListener('click', openImageData);

function openImageData(e) {
    let elem = e.target;
    if(e.target.nodeName === 'IMG') {
        var list = document.querySelectorAll('.picture__img');
        for(var i = 0; i < list.length; i++){
            if(list[i] == elem){                
                renderPhotoData(i);
                break;
            }
        }
        
        document.querySelector('body').classList.add('modal-open');
        document.querySelector('.big-picture').classList.remove('hidden');

        document.addEventListener('keydown', onImagePopupEscPress);
    }
} 

let imagePopupCloseBtn = document.querySelector('.big-picture__cancel');
imagePopupCloseBtn.addEventListener('click', imagePopupClose);

function imagePopupClose() {
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('.social__loadmore').classList.remove('visually-hidden');
    count = 5;

    document.removeEventListener('keydown', onImagePopupEscPress);
}

function onImagePopupEscPress(e) {
    if(e.key === 'Escape') { 
        imagePopupClose();
    }
}
var loadMore = document.querySelector('.social__loadmore');
var count = 5;

function renderPhotoData(i) {
    var bigPicture = document.querySelector('.big-picture');
    var img = photos[i];

    bigPicture.classList.remove('hidden');
    
    bigPicture.querySelector('.big-picture__img img').src = img.url;
    bigPicture.querySelector('.likes-count').textContent = img.likes;
    bigPicture.querySelector('.comments-count').textContent = img.comments.length;
    bigPicture.querySelector('.social__caption').textContent = img.description;

    renderComments(img.comments, 5);

    loadMore.addEventListener('click', function () {
        count+=5;
        renderComments(img.comments, count);    
    });
}

function renderComments(comments, length) {
    var template = document.querySelector('#comment').content;
    var fragment = document.createDocumentFragment();
    var commentsContainer = document.querySelector('.social__comments');
    commentsContainer.innerHTML = '';

    if( comments.length <= 5 || length > comments.length) {
        length = comments.length;
        document.querySelector('.social__loadmore').classList.add('visually-hidden');
    }

    document.querySelector('.social__comment-loaded').textContent = length;

    for(var l = 0; l < length; l++){
        let elem = template.cloneNode(true);
        var currElem = elem.children[0];

        currElem.querySelector('.social__picture').src = comments[l].avatar;
        currElem.querySelector('.social__text').textContent = comments[l].message;
        
        fragment.appendChild(elem);
    }

    commentsContainer.appendChild(fragment);
}

getImages();