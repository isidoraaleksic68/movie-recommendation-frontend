import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model';
import { MovieService } from 'src/app/movie-management/movie.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit{

  movie: Movie | null = null;

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.currentMovie.subscribe(movie => {
      this.movie = movie;
      console.log('Movie from service:', this.movie); // Check movie from service
    });
  }

  
}
