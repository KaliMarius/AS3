import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  asset:String = '../assets/body/'
  movies = [
    { imageUrl: this.asset + 'Mandalorian.jpg' },
    { imageUrl: this.asset + 'Dune.png' },
    { imageUrl: this.asset + 'Avatar.jpg' },
    { imageUrl: this.asset + 'Star-Wars.jpg' },
    { imageUrl: this.asset + 'John-Wick.jpg' },
    { imageUrl: this.asset + 'guardians.jpg' }
  ];
}
