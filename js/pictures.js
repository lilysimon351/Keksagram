var photos = [],
    comments = [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ],
    description = [
        'Тестим новую камеру!',
        'Затусили с друзьями на море',
        'Как же круто тут кормят',
        'Отдыхаем...',
        'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
        'Вот это тачка!'
    ];

function getRandNum(number) {
    return Math.floor(Math.random() * number);
}

function initCommentsData() {
    for(var i = 0; i < 25; i++) {    
        var randomComments = [];
        var commentsCount = getRandNum(2) + 1; // 1 or 2 sentences
    
        for(var j = 0; j < commentsCount; j++) {
            randomComments[j] = comments[getRandNum(comments.length)]; // index for random comment text
        }  

        photos[i] = {
            url: `photos/${i + 1}.jpg`,
            likes: getRandNum(186) + 15,
            comments: randomComments,
            description: description[getRandNum(description.length)]
        }
    }
}

function renderUserItems() {
    var template = document.querySelector('#picture').content;
    var fragment = document.createDocumentFragment();
    var photoContainer = document.querySelector('.pictures');
   
    photos.forEach(photo => {
        var elem = template.cloneNode(true);
        var currElem = elem.children[0];
 
        currElem.querySelector('.picture__img').src = photo.url;
        currElem.querySelector('.picture__stat--likes').textContent = photo.likes;
        currElem.querySelector('.picture__stat--comments').textContent = photo.comments.length;
        
        fragment.appendChild(elem);
    });

    photoContainer.appendChild(fragment);
}

function renderPhotoData() {
    var bigPicture = document.querySelector('.big-picture');
    var firstPhoto = photos[0];

    bigPicture.classList.remove('hidden');
    
    bigPicture.querySelector('.big-picture__img').src = firstPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = firstPhoto.likes;
    bigPicture.querySelector('.comments-count').textContent = firstPhoto.comments.length;

    for(var l = 0; l < firstPhoto.comments.length; l++){
        var comment = `<li class="social__comment social__comment--text"> <img class="social__picture" src="img/avatar-${getRandNum(6)+1}.svg"  alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text">${firstPhoto.comments[l]}</p></li>`;
        var commsContainer = document.querySelector('.social__comments');
        commsContainer.insertAdjacentHTML('afterBegin', comment);
    }

    bigPicture.querySelector('.social__caption').textContent = firstPhoto.description;
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.social__loadmore').classList.add('visually-hidden');
}
 

initCommentsData();
renderPhotoData();
renderUserItems();
