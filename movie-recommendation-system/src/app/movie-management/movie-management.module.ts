import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieSearchPageComponent } from './movie-search-page/movie-search-page.component';
import { MovieFilteringPageComponent } from './movie-filtering-page/movie-filtering-page.component';
import { MovieSortingPageComponent } from './movie-sorting-page/movie-sorting-page.component';
import { MovieRecommendationsComponent } from './movie-recommendations/movie-recommendations.component';
import { MaterialModule } from '../infrastructure/infrastructure.module';
import { MovieEvaluationPageComponent } from './movie-evaluation-page/movie-evaluation-page.component';



@NgModule({
  declarations: [
    MovieSearchPageComponent,
    MovieFilteringPageComponent,
    MovieSortingPageComponent,
    MovieRecommendationsComponent,
    MovieEvaluationPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
