import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsPageComponent } from './movie-info/movie-details-page/movie-details-page.component';
import { MovieFilteringPageComponent } from './movie-management/movie-filtering-page/movie-filtering-page.component';
import { MovieSortingPageComponent } from './movie-management/movie-sorting-page/movie-sorting-page.component';
import { MovieRecommendationsComponent } from './movie-management/movie-recommendations/movie-recommendations.component';
import { MovieSearchPageComponent } from './movie-management/movie-search-page/movie-search-page.component';

const routes: Routes = [
  {component: MovieDetailsPageComponent, path:"home/movies/:id"},
  {component: MovieFilteringPageComponent, path:"home/movies/filtering/:id"},
  {component: MovieSortingPageComponent, path:"home/movies/sorting/:id"},
  {component: MovieRecommendationsComponent, path:"home/movies/recommendations/:id"},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:"home",component:MovieSearchPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
