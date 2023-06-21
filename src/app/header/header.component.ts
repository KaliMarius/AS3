import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  API_KEY = '0f64fe97c07143eb0beeefb7beb2cd3a';
  searchText = '';

  search(searchText: string): void {
  
    const value = searchText.trim();

    if (value) {
      const encodedSearchText = value.replace(/\s+/g, '+');
      console.log(encodedSearchText);

      setTimeout(() => {
        window.open('searchResults.html?search=' + encodeURIComponent(encodedSearchText), '_self');
      }, 100);
    }
  
  }
}

// TODO: irgendwie noch die tatsächliche Suche fertig schreiben