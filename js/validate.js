// form validation

var submit = document.querySelector('#upload-submit');
var description = document.querySelector('.text__description');
var hashtags = document.querySelector('.text__hashtags');

submit.addEventListener('click', onFormSubmit);

function onFormSubmit() {
    //comments
    if (description.value.length > 140) {
        description.setCustomValidity("Длина комментария не может составлять больше 140 символов");
    } else {
        description.setCustomValidity("");
    }

    // hashtags

    if(hashtags !== "") {
        let errors = {};
        let hashtagsArr = hashtags.value.split(" ");
        hashtagsArr = hashtagsArr.filter(Boolean);
        
        let hashtagError = 0;
        let maxLengthError = 0;
        let minLengthError = 0;

        hashtagsArr.forEach(function(val) {
            if(val[0] !== '#') {
                hashtagError++;
            }
            if(val.length > 20) {
                maxLengthError++;
            }
            if(val.length === 1) {
                minLengthError++;
            }
        });

        // check '#' existence
        
        if(hashtagError > 0) {
            errors.hashtagError = 'Хештэг должен начинаться с символа "#"';
        }
        
        // check hashtag minlength
        
        if(minLengthError > 0) {
            errors.minLengthError = 'Хеш-тег не может состоять только из одной решётки';
        }
        
        // check hashtag repetition in lowercase

        let hashtagsArrLowerCase = hashtagsArr.map( currVal => currVal.toLowerCase() );        

        let repeatTagErrorLowercase = hashtagsArr.every(function(value, index) {
            return hashtagsArrLowerCase.lastIndexOf(value) === index;
        });

        if(!repeatTagErrorLowercase) {
            errors.repeatTagErrorLowercase = '#ХэшТег и #хэштег считаются одним и тем же тегом';
        }

        // check hashtag repetition
        
        let repeatTagError = hashtagsArr.every(function(value, index) {
            return hashtagsArr.lastIndexOf(value) === index;
        });
        
        if(!repeatTagError) {
            errors.repeatTagError = 'Один и тот же хэш-тег не может быть использован дважды';
        } 
        
        // check hashtags' amount
        
        if(hashtagsArr.length > 5) {
            errors.maxAmount = 'Максимальное количество хештэгов 5';
        } 
        
        // check hashtag maxlength
        
        if(maxLengthError > 0) {
            errors.hashtagMaxLength = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
        }

        let errorsLength = Object.keys(errors).length;

        if(errorsLength > 0) {
            for(var key in errors){
                hashtags.setCustomValidity(errors[key]);
            }
        } else {
            hashtags.setCustomValidity('');
        }
    }
}