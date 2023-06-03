API_KEY = '0f64fe97c07143eb0beeefb7beb2cd3a';
var searchText = '';

function clearPage(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        searchText = event.target.value.replace(/\s+/g, '+');
        console.log(searchText);

        setTimeout( function() {
            window.open('searchResults.html?search=' + encodeURIComponent(searchText), '_self');
        },100);
    }
}

function startSearch() {
    console.log('should start search')
    setTimeout(search(), 200);
}

function search() {        

    var urlParams = new URLSearchParams(window.location.search);
    searchText = urlParams.get('search');
    console.log(searchText);

    const apiRequest = 'https://api.themoviedb.org/3/search/movie?api_key=' + 
        API_KEY + '&query=' + searchText;

    console.log("sent request: " + apiRequest)
    console.log(searchText);


    const resultContainer = document.getElementById("results");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data)

            for (let i = 0; i < data.results.length; i++) {
                
                const elem = data.results[i];
                var backdroplink = '';
                if (elem.poster_path != null) {
                    backdroplink = elem.poster_path;

                    const movieTitle = document.createElement("span");
                    movieTitle.textContent = elem.original_title;
                    movieTitle.color = '#FFF';

                    const imgUrl = 'https://image.tmdb.org/t/p/original' + backdroplink;    
                    const imgClassName = "img-fluid";
                
                    const column = document.createElement("div");
                    column.className = "col-sm-6";
        
                    const hyper = document.createElement("a");
                    // if (elem.videos =! false) {
                    //     hyper.href = "https://www.youtube.com/watch?v=" + elem.videos.results[0].key;
                    //     hyper.target = "_blank";
                    // }
                    // else {
                    //     hyper.href = "#";
                    // }
                    hyper.href = "#";

                    const image = document.createElement("img");    
                    image.src = imgUrl;
                    image.className = imgClassName;
        
                    const blur = document.createElement("div");
                    blur.className = "blur";
        
                    const blurImage = document.createElement("img");
                    blurImage.src = imgUrl;
                    blurImage.className = imgClassName;
        
                    column.appendChild(movieTitle);
                    column.appendChild(hyper);
                    hyper.appendChild(image);
                    hyper.appendChild(blur);
                    blur.appendChild(blurImage);
                    resultContainer.appendChild(column);
                }
            }
        }
    }
    xhttp.open("GET", apiRequest, true);
    xhttp.send();
}







//TODO: auf auslagerung umschreiben: erst neue Seite öffnen, von dort automatiusches Skript für Suche laufen lassen, Dort dann Ergebnisse einbringen
//      ODER: auf der Seite lassen aber vorher Kontext der Seite leeren
