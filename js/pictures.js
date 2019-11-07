var photos = [],
    commentsText = [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ],
    descriptionText = [
        'Тестим новую камеру!',
        'Затусили с друзьями на море',
        'Как же круто тут кормят',
        'Отдыхаем...',
        'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
        'Вот это тачка!'
    ],
    likesRandNum,
    commentsRandNum,
    commentRandIndex,
    descriptionRandNum;

var getRandNum = function (number) {
    return Math.floor(Math.random()*number);
}

for( var i = 0; i < 25; i++) {    
    
    var commentsRandText = [];
    likesRandNum = getRandNum(186) + 15;
    commentsRandNum = getRandNum(2) + 1; // 1 or 2 sentences
    for(var j = 0; j < commentsRandNum; j++) {
        commentRandIndex = getRandNum(commentsText.length); // index for random comment text
        commentsRandText[j] = commentsText[commentRandIndex];
    }  
    
    descriptionRandNum = getRandNum(descriptionText.length) ;
    
    photos[i] = {
        url: `photos/${i+1}.jpg`,
        likes: likesRandNum,
        comments: commentsRandText,
        description: descriptionText[descriptionRandNum]
    }
 }

 var template = document.querySelector('#picture').content;
 var fragment = document.createDocumentFragment();

 for( var k = 0; k < photos.length; k++ ) {
    var elem = template.cloneNode(true);
    currElem = elem.children[0];
    currPhoto = photos[k];
    currElem.querySelector('.picture__img').src = currPhoto.url;
    currElem.querySelector('.picture__stat--likes').textContent = currPhoto.likes;
    currElem.querySelector('.picture__stat--comments').textContent = currPhoto.comments.length;
    fragment.appendChild(elem);
 }

 var photoContainer = document.querySelector('.pictures');
 photoContainer.appendChild(fragment);


 var bigPicture = document.querySelector('.big-picture');
 bigPicture.classList.remove('hidden');
 var firstPhoto = photos[0];
 bigPicture.querySelector('.big-picture__img').src = firstPhoto.url;
 bigPicture.querySelector('.likes-count').textContent = firstPhoto.likes;
 bigPicture.querySelector('.comments-count').textContent = firstPhoto.comments.length;
 for(var l = 0; l < firstPhoto.comments.length; l++){
    var commItem = `<li class="social__comment social__comment--text"> <img class="social__picture" src="img/avatar-${getRandNum(6)+1}.svg"  alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text">${firstPhoto.comments[l]}</p></li>`;
    var commsContainer = document.querySelector('.social__comments');
    commsContainer.insertAdjacentHTML('afterBegin', commItem);
}

 bigPicture.querySelector('.social__caption').textContent = firstPhoto.description;
