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
  moviePosterMap: { [key: number]: string | null } = {}; // Map to store movie posters

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
    this.movieService.getRecommendedMovies(this.movie?.title as string, this.currentPage).subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
        this.movies.forEach(movie => {
          this.movieService.getMoviePoster(movie.id).subscribe(
            poster => {
              this.moviePosterMap[movie.id] = poster; // Store the poster URL
            },
            error => {
              console.error('Error fetching movie poster for ID:', movie.id, error);
              this.moviePosterMap[movie.id] = null; // Handle error
            }
          );
        });
      },
      (error) => {
        console.error('Failed to fetch recommended movies.', error);
      }
    );
  }
  
  
  loadNextPage(): void {
    this.currentPage++;
    this.fetchMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadPreviousPage(): void {
    this.currentPage--;
    if(this.currentPage==0){
      return;
    }
    this.fetchMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
