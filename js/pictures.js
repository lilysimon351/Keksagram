var numbers = [],
    photoes = [],
    comments_text = [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ],
    description_text = [
        'Тестим новую камеру!',
        'Затусили с друзьями на море',
        'Как же круто тут кормят',
        'Отдыхаем...',
        'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
        'Вот это тачка!'
    ],
    random_num,
    comments_rand_num,
    comments_rand_text = [],
    comment_rand_index,
    description_rand_num;

for( var i = 0; i < 25; i++) {    
    random_num = Math.floor(Math.random()*186) + 15;
    comments_rand_num = Math.floor(Math.random()*2) + 1;
    for( var j = 0; j < comments_rand_num; j++ ) {
        comment_rand_index = Math.floor(Math.random()*comments_text.length);
        comments_rand_text[j] = comments_text[comment_rand_index];
    }
    description_rand_num = Math.floor(Math.random()*description_text.length) ;
    
    photoes[i] = {
        url: `../photos/${i}.jpg`,
        likes: random_num,
        comments: comments_rand_text,
        description: description_text[description_rand_num]
    }

 }
 console.log(photoes)