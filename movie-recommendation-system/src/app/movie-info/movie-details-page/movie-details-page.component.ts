import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model';
import { MovieService } from 'src/app/movie-management/movie.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit{
  movie: Movie | undefined;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchMovieDetails(movieId);
  }

  fetchMovieDetails(movieId: number): void {
    this.movieService.getMovieDetails(movieId).subscribe(
      (data) => {
        this.movie = data;
        console.log('Movie details:', this.movie);
      },
      (error) => {
        console.error('Error fetching movie details:', error);
      }
    );
  }

  getReleaseYear(releaseDate: string | undefined): string {
    return releaseDate ? new Date(releaseDate).getFullYear().toString() : '';
  }

  getFormattedRuntime(runtime: number| undefined): string {
    const hours = Math.floor(runtime as number / 60);
    const minutes = runtime as number % 60;
    return `${hours}h ${minutes}m`;
  }
  
  viewRecommendations() {
    
  }


  
}
