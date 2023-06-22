import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie';
import { skip } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultsComponent implements OnInit {
  API_KEY = '0f64fe97c07143eb0beeefb7beb2cd3a';
  errMsg = 'Entschuldigung, zu diesem Film steht uns leider kein Trailer zur Verfügung';
  movies: Movie[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 0) {
        const encodedPart = urlSegments[urlSegments.length - 1].toString();
        const decodedPart = decodeURIComponent(encodedPart).replace("%20", " ");
        const lastWord = decodedPart.split("=")[1];
        // console.log(lastWord);
        this.search(encodeURIComponent(lastWord));
      }
    });
  }

  search(searchText: string): void {
    const apiRequest = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${searchText}`;
  
    this.http.get(apiRequest).subscribe(
      (data: any) => {
        const results = data.results;
                
        for (var movie of results) {
          if (movie.poster_path != null) {

            var id = movie.id;

            // get more data for each movie including video link
            const movieAPILink = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=${this.API_KEY}`;
            
            this.http.get(movieAPILink).subscribe(
              (movieData: any) => {
                
                var videoLink = '#';
                movieData.videos.results.length > 0 ? videoLink = `https://www.youtube.com/watch?v=${movieData.videos.results[0].key}` : skip;
                var note = '';
                videoLink == '#' ? note = this.errMsg : skip;

                var newMovie: Movie = {
                  imageUrl: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
                  href: videoLink,
                  notification: note
                };
                this.movies.push(newMovie);
              },
              error => {
                console.log('Fehler beim Laden des Link:', error);
              }
            );
          }          
        }
      },
      error => {
        console.log('Fehler bei der Suche nach Filmen:', error);
      }
    );
  }
}
