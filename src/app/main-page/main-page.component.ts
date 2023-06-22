import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  errMsg = 'Entschuldigung, zu diesem Film steht uns leider kein Trailer zur Verfügung';

  movies: Movie[] = [
    { 
      imageUrl: '../assets/body/Dune.png', 
      href: 'https://www.youtube.com/watch?v=Way9Dexny3w', 
      notification: this.errMsg, 
      title: 'DUNE (2021)' 
    },
    { 
      imageUrl: '../assets/body/Avatar.jpg', 
      href: 'https://www.youtube.com/watch?v=d9MyW72ELq0', 
      notification: this.errMsg, 
      title: 'Avatar: The Way of Water (2022)' 
    },
    { 
      imageUrl: '../assets/body/John-Wick.jpg', 
      href: 'https://www.youtube.com/watch?v=qEVUtrk8_B4', 
      notification: this.errMsg, 
      title: 'John Wick: Chapter 4 (2023)' 
    },
    { 
      imageUrl: '../assets/body/guardians.jpg', 
      href: 'https://www.youtube.com/watch?v=u3V5KDHRQvk', 
      notification: this.errMsg, 
      title: 'Guardians of the Galaxy Vol. 3 (2023)' 
    }
  ];

  id = 11;
  API_KEY = '0f64fe97c07143eb0beeefb7beb2cd3a';

  constructor(private http: HttpClient) {}

  addContent(): void {
    let requestCounter = 0;

    doShit.call(this);

    function doShit(this: MainPageComponent) {
      
      const apiUrl = `https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.API_KEY}&sort_by=popularity.desc&with_original_language=en&append_to_response=videos`;

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
            var movieTitle = `${data.original_title} (${data.release_date.split('-')[0]})`;

            const movie: Movie = {
              imageUrl: imgUrl,
              href: movieUrl,
              notification: notification,
              title: movieTitle
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
