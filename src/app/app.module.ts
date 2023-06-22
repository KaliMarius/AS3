import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SearchResultsComponent } from './search-result/search-result.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TrendsPageComponent } from './trends-page/trends-page.component';
import { CategoryMoviesComponent } from './category-movies/category-movies.component';
import { CategoryTVComponent } from './category-tv/category-tv.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    MovieCardComponent,
    SearchResultsComponent,
    MainPageComponent,
    TrendsPageComponent,
    CategoryMoviesComponent,
    CategoryTVComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
