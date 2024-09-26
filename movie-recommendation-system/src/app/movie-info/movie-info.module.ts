import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { MediaAndTrailersViewComponent } from './media-and-trailers-view/media-and-trailers-view.component';
import { MovieManagementModule } from '../movie-management/movie-management.module';
import { SafePipe } from './media-and-trailers-view/helper';



@NgModule({
  declarations: [
    MovieDetailsPageComponent,
    MediaAndTrailersViewComponent,
    SafePipe
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
