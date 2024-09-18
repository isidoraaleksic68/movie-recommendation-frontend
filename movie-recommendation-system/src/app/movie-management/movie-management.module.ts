import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieSearchPageComponent } from './movie-search-page/movie-search-page.component';
import { MovieFilteringPageComponent } from './movie-filtering-page/movie-filtering-page.component';
import { MovieSortingPageComponent } from './movie-sorting-page/movie-sorting-page.component';
import { MovieRecommendationsComponent } from './movie-recommendations/movie-recommendations.component';



@NgModule({
  declarations: [
    MovieCardComponent,
    MovieSearchPageComponent,
    MovieFilteringPageComponent,
    MovieSortingPageComponent,
    MovieRecommendationsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MovieCardComponent,
    MovieFilteringPageComponent,
    MovieRecommendationsComponent,
    MovieSearchPageComponent,
    MovieSortingPageComponent
  ]
})
export class MovieManagementModule { }
