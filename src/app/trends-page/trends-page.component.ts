import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { HttpClient } from '@angular/common/http';
import { forkJoin, skip } from 'rxjs';

@Component({
  selector: 'app-trends-page',
  templateUrl: './trends-page.component.html',
  styleUrls: ['./trends-page.component.scss']
})
export class TrendsPageComponent implements OnInit{
  API_KEY = '0f64fe97c07143eb0beeefb7beb2cd3a';
  errMsg = 'Entschuldigung, zu diesem Film steht uns leider kein Trailer zur Verfügung';
  
  results: any = []
  movies: Movie[] = [];

  curPage = 1;
  curTrend = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTrends();
  }

  getTrends(): void {
    const apiRequest = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&vote_average.gte=9&page=${this.curPage}&&with_original_language=en&api_key=${this.API_KEY}`;
  
    this.http.get(apiRequest).subscribe(
      (data: any) => {
        const results = data.results;
        const requests = [];
  
        for (const movie of results) {
          // if (movie.poster_path != null) {
            const id = movie.id;
            const movieAPILink = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=${this.API_KEY}`;
  
            requests.push(this.http.get(movieAPILink));
          // }
        }
  
        forkJoin(requests).subscribe(
          (responses: any[]) => {
            for (const movieData of responses) {
              this.results.push(movieData);
            }
  
            this.curPage++;
            this.loadNewest();
          },
          error => {
            console.log('Fehler beim Laden der Links:', error);
          }
        );
      },
      error => {
        console.log('Fehler bei der Suche nach Filmen:', error);
      }
    );
  }

  loadNewest() {    
    for (let i = this.curTrend; i < this.results.length; i++) {

      const movieData = this.results[i]
      var videoLink = '#';
      movieData.videos.results.length > 0 ? videoLink = `https://www.youtube.com/watch?v=${movieData.videos.results[0].key}` : skip;
      var note = '';
      videoLink == '#' ? note = this.errMsg : skip;
      var movieTitle = `${movieData.original_title} (${movieData.release_date.split('-')[0]}) - ${movieData.vote_average}/10`;

      var newMovie: Movie = {
        imageUrl: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
        href: videoLink,
        notification: note,
        title: movieTitle
      };

      this.movies.push(newMovie);
      
      this.curTrend++;
    }
  }
}
