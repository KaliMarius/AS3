import { Component } from '@angular/core';
import { Movie } from '../movie';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-tv',
  templateUrl: './category-tv.component.html',
  styleUrls: ['./category-tv.component.scss']
})
export class CategoryTVComponent {
  errMsg = 'Entschuldigung, zu diesem Film steht uns leider kein Trailer zur Verfügung';

  movies: Movie[] = [];

  id = 604;
  API_KEY = '0f64fe97c07143eb0beeefb7beb2cd3a';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.addContent();
  }

  addContent(): void {
    let requestCounter = 0;

    doShit.call(this);

    function doShit(this: CategoryTVComponent) {
      
      const apiUrl = `https://api.themoviedb.org/3/tv/${this.id}?api_key=${this.API_KEY}&append_to_response=videos`;

      this.http.get(apiUrl).subscribe(
        (data: any) => {
          if (data.backdrop_path === null) {
            this.id += 1;
            doShit.call(this);
          } else {
            const imgUrl = 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
            var movieUrl = '#';
            const notification = this.errMsg;
            if (data.videos.results.length > 0) {
              movieUrl = "https://www.youtube.com/watch?v=" + data.videos.results[0].key;
            }

            const movie: Movie = {
              imageUrl: imgUrl,
              href: movieUrl,
              notification: notification
            };

            this.movies.push(movie);

            this.id += 1;
            requestCounter++;

            if (requestCounter < 8) {
              doShit.call(this);
            }
          }
        },
        error => {
          // console.log('Fehlerhafte id - suche weiter');
          this.id += 1;
          doShit.call(this);
        }
      );
    }
  }
}
