import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { MediaAndTrailersViewComponent } from './media-and-trailers-view/media-and-trailers-view.component';
import { MovieManagementModule } from '../movie-management/movie-management.module';



@NgModule({
  declarations: [
    MovieDetailsPageComponent,
    MediaAndTrailersViewComponent
  ],
  imports: [
    CommonModule
    // MovieManagementModule
  ],
  exports: [
    MediaAndTrailersViewComponent,
    MovieDetailsPageComponent
  ]
})
export class MovieInfoModule { }
