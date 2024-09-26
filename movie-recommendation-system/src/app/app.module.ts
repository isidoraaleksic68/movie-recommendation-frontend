import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { MovieInfoModule } from './movie-info/movie-info.module';
import { MovieManagementModule } from './movie-management/movie-management.module';
import { MaterialModule } from './infrastructure/infrastructure.module';
import { SafePipe } from './movie-info/media-and-trailers-view/helper';
import { MediaAndTrailersViewComponent } from './movie-info/media-and-trailers-view/media-and-trailers-view.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MovieInfoModule,
    MovieManagementModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
