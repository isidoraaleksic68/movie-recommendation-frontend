import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-recommendations',
  templateUrl: './movie-recommendations.component.html',
  styleUrls: ['./movie-recommendations.component.css']
})
export class MovieRecommendationsComponent implements OnInit{
  movie : Movie | undefined;
  movies: Movie[] = [];
  currentPage: number = 1;

  constructor(private movieService: MovieService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchMovieDetails(movieId);
  }

  
  fetchMovieDetails(movieId: number): void {
    this.movieService.getMovieDetails(movieId).subscribe(
      (data) => {
        this.movie = data;
        console.log('Movie details:', this.movie);
        this.fetchMovies();
      },
      (error) => {
        console.error('Error fetching movie details:', error);
      }
    );
  }

  fetchMovies(): void {
    this.movieService.getRecommendedMovies(this.movie?.title as string,this.currentPage).subscribe(
      (data: Movie[]) => {
        this.movies = data;
      },
      (error) => {
        console.error('Failed to fetch recommended movies.', error);
      }
    );
  }

  
  goToSorting() {
    this.router.navigate([`home/movies/sorting/`, this.movie?.id]);
  }

  goToFiltering() {
    this.router.navigate([`home/movies/filtering/`, this.movie?.id]);
  }

  goToDetails(movieId: number): void {
    this.router.navigate([`home/movies/`, movieId]); 
  }
  
}
