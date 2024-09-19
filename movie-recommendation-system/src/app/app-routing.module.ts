import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsPageComponent } from './movie-info/movie-details-page/movie-details-page.component';
import { MovieFilteringPageComponent } from './movie-management/movie-filtering-page/movie-filtering-page.component';
import { MovieSortingPageComponent } from './movie-management/movie-sorting-page/movie-sorting-page.component';
import { MovieRecommendationsComponent } from './movie-management/movie-recommendations/movie-recommendations.component';
import { MovieSearchPageComponent } from './movie-management/movie-search-page/movie-search-page.component';

const routes: Routes = [
  { path: 'home/movies/:id', component: MovieDetailsPageComponent },
  { path: 'home/movies/filtering/:id', component: MovieFilteringPageComponent },
  { path: 'home/movies/sorting/:id', component: MovieSortingPageComponent },
  { path: 'home/movies/recommendations/:id', component: MovieRecommendationsComponent }, // Recommendations route
  { path: '', redirectTo: 'home/movies', pathMatch: 'full' }, // Default route redirects to search
  { path: 'home/movies', component: MovieSearchPageComponent }, // Movie search page
  { path: '**', redirectTo: 'home/movies', pathMatch: 'full' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
