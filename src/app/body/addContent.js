var id = 11;
var backdroplink = '';
const moviesContainer = document.getElementById("movies");
API_KEY = '0f64fe97c07143eb0beeefb7beb2cd3a';

/* <iframe width="560" height="315" src="https://www.youtube.com/embed/57d95e019251416851005d34?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */

function addContent() {
    var requestCounter = 0;

    doShit()   

    function doShit() {
        const apiUrl = 'https://api.themoviedb.org/3/movie/' + 
            id + '?api_key=' + API_KEY + '&append_to_response=videos';
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
    
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    
                    backdroplink = data.backdrop_path;
                    if (backdroplink == null)  {
                        id += 1;
                        doShit();
                    }
                    else {
                        const imgUrl = 'https://image.tmdb.org/t/p/original' + backdroplink;    
                        const imgClassName = "img-fluid";
                    
                        const column = document.createElement("div");
                        column.className = "col-sm-6";
            
                        const hyper = document.createElement("a");
                        if (data.videos.results.length > 0) {
                            hyper.href = "https://www.youtube.com/watch?v=" + data.videos.results[0].key;
                            hyper.target = "_blank";
                        }
                        else {
                            hyper.href = "#";
                        }

                        const image = document.createElement("img");    
                        image.src = imgUrl;
                        image.className = imgClassName;
            
                        const blur = document.createElement("div");
                        blur.className = "blur";
            
                        const blurImage = document.createElement("img");
                        blurImage.src = imgUrl;
                        blurImage.className = imgClassName;
            
                        hyper.appendChild(image);
                        blur.appendChild(blurImage);
                        hyper.appendChild(blur);
                        column.appendChild(hyper);
                        moviesContainer.appendChild(column);
            
                        id += 1;
                        requestCounter++;
            
                        if (requestCounter < 4 ) {
                            doShit(); // Aufruf der Funktion für die nächste Anfrage
                        }
                    }
                }
                else {
                    console.log("Fehlerhafte id - suche weiter");
                    id += 1;
                    doShit();
                }
            }
        };
        xhttp.open("GET", apiUrl, true);

        xhttp.onerror = function() {
            console.log("Fehler beim Öffnen der Anfrage. ID wird erhöht.");
            id += 1;
            doShit(); // Erneuter Aufruf mit der nächsten ID
        };

        xhttp.send();
    }
}
