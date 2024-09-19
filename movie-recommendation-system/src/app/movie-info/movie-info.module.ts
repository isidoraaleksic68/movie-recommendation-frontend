import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { MediaAndTrailersViewComponent } from './media-and-trailers-view/media-and-trailers-view.component';
import { MoreLikeThisViewComponent } from './more-like-this-view/more-like-this-view.component';
import { MovieManagementModule } from '../movie-management/movie-management.module';



@NgModule({
  declarations: [
    MovieDetailsPageComponent,
    MediaAndTrailersViewComponent,
    MoreLikeThisViewComponent
  ],
  imports: [
    CommonModule
    // MovieManagementModule
  ],
  exports: [
    MediaAndTrailersViewComponent,
    MoreLikeThisViewComponent,
    MovieDetailsPageComponent
  ]
})
export class MovieInfoModule { }
