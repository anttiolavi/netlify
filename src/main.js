(function() {
    var url = '/api/quote';

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var quote = document.getElementById('myquote');
            quote.innerHTML = data[0].content;
        })
        .catch(function(err) {
            console.error(err);
        });     
})();
