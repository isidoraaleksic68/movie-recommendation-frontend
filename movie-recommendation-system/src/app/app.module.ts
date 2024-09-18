import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { MovieRecommendationsComponent } from './movie-management/movie-recommendations/movie-recommendations.component';
import { MovieInfoModule } from './movie-info/movie-info.module';
import { MovieManagementModule } from './movie-management/movie-management.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MovieInfoModule,
    MovieManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
