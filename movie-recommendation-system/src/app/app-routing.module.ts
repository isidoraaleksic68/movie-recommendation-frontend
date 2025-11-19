import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsPageComponent } from './movie-info/movie-details-page/movie-details-page.component';
import { MovieFilteringPageComponent } from './movie-management/movie-filtering-page/movie-filtering-page.component';
import { MovieSortingPageComponent } from './movie-management/movie-sorting-page/movie-sorting-page.component';
import { MovieRecommendationsComponent } from './movie-management/movie-recommendations/movie-recommendations.component';
import { MovieSearchPageComponent } from './movie-management/movie-search-page/movie-search-page.component';
import { MovieEvaluationPageComponent } from './movie-management/movie-evaluation-page/movie-evaluation-page.component';

const routes: Routes = [
  { path: 'home/movies/:id', component: MovieDetailsPageComponent },
  { path: 'home/movies/filtering/:id', component: MovieFilteringPageComponent },
  { path: 'home/movies/sorting/:id', component: MovieSortingPageComponent },
  { path: 'home/movies/recommendations/:id', component: MovieRecommendationsComponent },
  { path: 'home/evaluation', component: MovieEvaluationPageComponent },
  { path: '', redirectTo: 'home/movies', pathMatch: 'full' },
  { path: 'home/movies', component: MovieSearchPageComponent },
  { path: '**', redirectTo: 'home/movies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
