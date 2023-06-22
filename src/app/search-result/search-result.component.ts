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

        console.log(results); //TODO: Für funktionierende Links zu videos noch extra api abfrage mit der ID vom Film machen
        
        for (var movie of results) {
          if (movie.poster_path != null) {

            var videoLink = '#';
            if (movie.video != false) videoLink = movie.video.results[0].key;
            var note = '';
            videoLink == '#' ? note = this.errMsg : skip;

            var newMovie: Movie = {
              imageUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
              href: videoLink,
              notification: note
            };
            this.movies.push(newMovie);
          }
        }
      },
      error => {
        console.log('Fehler bei der Suche nach Filmen:', error);
      }
    );
  }
}
