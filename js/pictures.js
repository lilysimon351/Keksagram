// Image preview: open/close preview window 

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
    document.querySelector('.img-upload__scale').classList.add('hidden');
    preview.src = defaultSrc;
    preview.className  = '';
    uploader.value = '';
    description.value = '';
    hashtags.value = '';
    
    onZoomValueChange(100);
    resetValues('none', 100);

    document.removeEventListener('keydown', onPreviewEscPress);
}

function onPreviewEscPress(e) {
    
    if (hashtags === document.activeElement || hashtags === description.activeElement) {
        return e;
    } else if(e.key === 'Escape') { 
        closeImgPreview();
    }
}

// Zooming

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
    preview.style.transform = `scale(${zoomVal/100})`;
} 

// Applying an effect to an image

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

// Change the contrast of the effect on the image

var spin = document.querySelector('.scale__pin');
spin.addEventListener('mousedown', onSpinMousedown);

function onSpinMousedown() {
    var spinLineWidth = document.querySelector('.scale__line').clientWidth;
    
    document.addEventListener('mousemove', onSpinMousemove);
    document.addEventListener('mouseup', onSpinMouseup);
    
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
        document.removeEventListener('mousemove', onSpinMousemove);
        document.removeEventListener('mouseup', onSpinMouseup);
    }
}

function changeEffectContrast(effect, unit) {
    let filterName = '';
    
    switch (effect) {
        case 'chrome':
            filterName = `grayscale(${unit/100})`;
            break;
        case 'sepia':
            filterName = `sepia(${unit/100})`;
            break;
        case 'marvin':
            filterName = `invert(${unit}%)`;
            break;
        case 'phobos':
            filterName = `blur(${(unit/100)*3}px)`;
            break;
        case 'heat':
            filterName = `brightness(${(unit/100)*2+1})`;
            break;
        case 'none':
            filterName = 'none';
            break;
    }
    
    preview.style.filter = filterName;
    preview.style.WebkitFilter = filterName;
}

function resetValues(effectName, unit) {
    changeEffect(effectName);
    changeEffectContrast(effectName, unit);

    document.querySelector('.scale__value').value = unit;
    spin.style.left = unit + '%';
}