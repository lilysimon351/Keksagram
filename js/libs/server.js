(function() {
    function fetch({
        url, 
        data = null, 
        success, 
        error, 
        type = "GET"
    }) {
        let formData = {};

        if(data) {
            formData = new FormData(data);
        }

        let xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        
        xhr.addEventListener('loadend', function () {
            if(xhr.status === 200) {
                success(xhr);
            } else {
                alert(`Ошибка: ${xhr.status}`);
            }
        });
    
        xhr.addEventListener('error', function () {
            error(xhr);
        });
    
        xhr.open(type, url);

        if(!data) {
            xhr.send();
        } else {
            xhr.send(formData);
        }
    }
    
    window.api = {
        fetch
    };
})();