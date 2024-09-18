import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieSearchPageComponent } from './movie-search-page/movie-search-page.component';
import { MovieFilteringPageComponent } from './movie-filtering-page/movie-filtering-page.component';
import { MovieSortingPageComponent } from './movie-sorting-page/movie-sorting-page.component';
import { MovieRecommendationsComponent } from './movie-recommendations/movie-recommendations.component';
import { MaterialModule } from '../infrastructure/infrastructure.module';



@NgModule({
  declarations: [
    MovieSearchPageComponent,
    MovieFilteringPageComponent,
    MovieSortingPageComponent,
    MovieRecommendationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MovieFilteringPageComponent,
    MovieRecommendationsComponent,
    MovieSearchPageComponent,
    MovieSortingPageComponent
  ]
})
export class MovieManagementModule { }
