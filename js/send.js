function sendForm() {
    let uploadForm = document.querySelector('#upload-select-image');

    api.fetch({
        url: 'https://js.dump.academy/kekstagram', 
        data: uploadForm,
        success: closeImgPreview,
        error: () => {
            document.querySelector('.img-upload__message--error').classList.remove('hidden');
        },
        type: "POST"
    });
}