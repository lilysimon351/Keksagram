function sendForm() {
    
    let uploadForm = document.querySelector('#upload-select-image');
    let formData = new FormData(uploadForm);

    let request = new XMLHttpRequest();
    let url = 'https://js.dump.academy/kekstagram';
    
    request.addEventListener('loadend', function () {
        if(request.status === 200) {
            closeImgPreview();
        } 
    });

    request.addEventListener('error', function () {
        document.querySelector('.img-upload__message--error').classList.remove('hidden');
    })

    request.open('POST', url);
    request.send(formData);

}