import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { TrendsPageComponent } from './trends-page/trends-page.component';
import { SearchResultsComponent } from './search-result/search-result.component';
import { CategoryTVComponent } from './category-tv/category-tv.component';
import { CategoryMoviesComponent } from './category-movies/category-movies.component';

const routes: Routes = [
  { path: '', redirectTo: '/startseite', pathMatch: 'full' },
  { path: 'startseite', component: MainPageComponent },
  { path: 'trends', component: TrendsPageComponent },
  { path: 'suchergebnisse/:search', component: SearchResultsComponent },
  { path: 'tv', component: CategoryTVComponent },
  { path: 'movies', component: CategoryMoviesComponent }
  // Hier weitere Routen einfügen
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// TODO: Routing beenden für alle neuen Komponenten:
//   - interfaces nutzen / eventuell umbauen