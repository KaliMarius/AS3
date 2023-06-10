import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  errMsg = 'Entschuldigung, zu diesem Film steht uns leider kein Trailer zur Verfügung';

  movies: Movie[] = [
    { imageUrl: '../assets/body/Mandalorian.jpg', href: '#', notification: this.errMsg },
    { imageUrl: '../assets/body/Dune.png', href: '#', notification: this.errMsg },
    { imageUrl: '../assets/body/Avatar.jpg', href: '#', notification: this.errMsg },
    { imageUrl: '../assets/body/Star-Wars.jpg', href: '#', notification: this.errMsg },
    { imageUrl: '../assets/body/John-Wick.jpg', href: '#', notification: this.errMsg },
    { imageUrl: '../assets/body/guardians.jpg', href: '#', notification: this.errMsg }
  ];

  id = 11;
  API_KEY = '0f64fe97c07143eb0beeefb7beb2cd3a';

  constructor(private http: HttpClient) {}

  addContent(): void {
    let requestCounter = 0;

    doShit.call(this);

    function doShit(this: BodyComponent) {
      
      const apiUrl = 'https://api.themoviedb.org/3/movie/' + this.id + '?api_key=' + this.API_KEY + '&append_to_response=videos';

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

            if (requestCounter < 4) {
              doShit.call(this);
            }
          }
        },
        error => {
          console.log('Fehlerhafte id - suche weiter');
          this.id += 1;
          doShit.call(this);
        }
      );
    }
  }
}
