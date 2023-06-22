import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentRoute!: string;

  constructor(private router: Router) { 
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  search(searchValue: string) {
    let search = 'search' + '=' + searchValue; 
    this.router.navigate(['/suchergebnisse', search]);
  }
}
