import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie';

@Component({
  selector: 'app-search-result',
  template: `
    <div *ngFor="let movie of movies">
      <a href="{{ movie.href }}" target="{{ movie.href === '#' ? '_blank' : '_self' }}">
        <img [src]="movie.imageUrl" class="img-fluid">
        <div class="blur">
          <img [src]="movie.imageUrl" class="img-fluid">
        </div>
        <div *ngIf="movie.notification">{{ movie.notification }}</div>
      </a>
    </div>
  `,
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultsComponent {
  API_KEY = '0f64fe97c07143eb0beeefb7beb2cd3a';
  movies: Movie[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      const searchText = params['search'];
      if (searchText) {
        this.search(searchText);
      }
    });
  }

  search(searchText: string): void {
    const encodedSearchText = encodeURIComponent(searchText);
    const apiRequest = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${encodedSearchText}`;

    this.http.get(apiRequest).subscribe(
      (data: any) => {
        const results = data.results;
        this.movies = results.map((elem: any) => ({
          imageUrl: `https://image.tmdb.org/t/p/original${elem.poster_path}`,
          href: elem.videos?.results?.length ? `https://www.youtube.com/watch?v=${elem.videos.results[0].key}` : '#',
          notification: ''
        }));
      },
      error => {
        console.log('Fehler bei der Suche nach Filmen:', error);
      }
    );
  }
}
