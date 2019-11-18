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

// new


// Предварительный просмотр загруженного изображения и и закрытие окна пред.просмотра

var preview = document.querySelector('.img-upload__preview > img');
const defaultSrc = preview.src;

var uploader = document.querySelector('#upload-file');
uploader.addEventListener('change', openPreview);

function openPreview() {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    let selectedFile = this.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = function() {
        preview.src = reader.result;
    };

    document.addEventListener('keydown', onPreviewEscPress);
} 

var closePreview = document.querySelector('#upload-cancel');
closePreview.addEventListener('click', closeImgPreview);

function closeImgPreview() {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    preview.src = defaultSrc;
    onZoomValueChange(100);
    preview.className  = '';
    uploader.value = '';

    resetValues('none', 100);
    
    document.querySelector('.img-upload__scale').classList.add('hidden');

    document.removeEventListener('keydown', onPreviewEscPress);
}

function onPreviewEscPress(e) {
    if(e.key === 'Escape') {
        closeImgPreview();
    }
}

// Изменение масштаба изображения

var zoomOut = document.querySelector('.resize__control--minus');
var zoomIn = document.querySelector('.resize__control--plus');
var zoomValueInput = document.querySelector('.resize__control--value');
var zoomValue = 100;

zoomOut.addEventListener('click', onZoomOut);
zoomIn.addEventListener('click', onZoomIn);

function onZoomOut() {
    if(zoomValue > 25) {
        zoomValue -= 25;
        onZoomValueChange(zoomValue);
    }
}

function onZoomIn() {
    if(zoomValue < 100) {
        zoomValue += 25;
        onZoomValueChange(zoomValue);
    }
}

function onZoomValueChange(zoomVal) {
    zoomValueInput.value = zoomVal + '%';
    preview.style.transform = 'scale('+ zoomVal/100 +')';
} 

// Наложение эффекта на изображение

var effectName = '';
var effectsCont = document.querySelector('.effects__list');

effectsCont.addEventListener("click", function(event) {
    if (event.target.nodeName == "INPUT") {
        effectName = event.target.value;
        resetValues(effectName, 100);

        if(effectName === 'none') {
            document.querySelector('.img-upload__scale').classList.add('hidden');
        } else {
            document.querySelector('.img-upload__scale').classList.remove('hidden');
        }
    }
  });

function changeEffect(effect) {
    let result = '';

    switch (effect) {
        case 'chrome':
            result = 'effects__preview--chrome';
            break;
        case 'sepia':
            result = 'effects__preview--sepia';
            break;
        case 'marvin':
            result = 'effects__preview--marvin';
            break;
        case 'phobos':
            result = 'effects__preview--phobos';
            break;
        case 'heat':
            result = 'effects__preview--heat';
            break;
        case 'none':
            preview.className  = '';
            return;
    }

    preview.className  = '';
    preview.classList.add(result);
}

// Изменение контрастности эффекта на изображение

var spin = document.querySelector('.scale__pin');
spin.addEventListener('mousedown', onSpinMousedown);

function onSpinMousedown() {
    var spinLineWidth = document.querySelector('.scale__line').clientWidth;
    var spinScale = document.querySelector('.img-upload__scale');
    
    spinScale.addEventListener('mousemove', onSpinMousemove);
    spinScale.addEventListener('mouseup', onSpinMouseup);
    
    function onSpinMousemove(moveEvt) {
        var coordsX = moveEvt.clientX;
        var spinLineLeft = document.querySelector('.scale__line').getBoundingClientRect().left;

        var spinLeft = Math.floor(((coordsX - spinLineLeft) / spinLineWidth) * 100);

        if(spinLeft < 0) {
            spinLeft = 0;
        } else if(spinLeft > 100) {
            spinLeft = 100;
        }
        
        resetValues(effectName, spinLeft);
    }
    
    function onSpinMouseup() {
        spinScale.removeEventListener('mousemove', onSpinMousemove);
        spinScale.removeEventListener('mouseup', onSpinMouseup);
    }
}

function changeEffectContrast(effect, unit) {
    switch (effect) {
        case 'chrome':
            preview.style.filter = `grayscale(${unit/100})`;
            preview.style.WebkitFilter = `grayscale(${unit/100})`;
            break;
        case 'sepia':
            preview.style.filter = 'sepia('+unit/100+')';
            preview.style.WebkitFilter = 'sepia('+unit/100+')';
            break;
        case 'marvin':
            preview.style.filter = 'invert('+unit+'%)';
            preview.style.WebkitFilter = 'invert('+unit+'%)';
            break;
        case 'phobos':
            preview.style.filter = 'blur('+(unit/100)*3+')';
            preview.style.WebkitFilter = 'blur('+(unit/100)*3+'px)';
            break;
        case 'heat':
            preview.style.filter = 'brightness('+((unit/100)*2+1)+')';
            preview.style.WebkitFilter = 'brightness('+((unit/100)*2+1)+')';
            break;
        case 'none':
            preview.style.filter = 'none';
            preview.style.WebkitFilter = 'none';
    }
}

function resetValues(effectName, unit) {
    changeEffect(effectName);
    changeEffectContrast(effectName, unit);

    document.querySelector('.scale__value').value = unit;
    spin.style.left = unit + '%';
}