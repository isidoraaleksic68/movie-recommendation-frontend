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
  moviePosterMap: { [key: number]: string | null } = {};
  isLoading: boolean = false;

  constructor(private movieService: MovieService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchMovieDetails(movieId);
  }

  
  fetchMovieDetails(movieId: number): void {
    this.isLoading = true;
    this.movieService.getMovieDetails(movieId).subscribe(
      (data) => {
        this.movie = data;
        console.log('Movie details:', this.movie);
        this.fetchMovies();
      },
      (error) => {
        console.error('Error fetching movie details:', error);
        this.isLoading = false;
      }
    );
  }

  fetchMovies(): void {
    this.isLoading = true;
    this.movieService.getRecommendedMovies(this.movie?.title as string, this.currentPage).subscribe(
      (response: any) => {
        this.movies = response.recommendations || response;
        if (this.movies.length === 0) {
          this.isLoading = false;
          return;
        }
        let postersLoaded = 0;
        this.movies.forEach(movie => {
          this.movieService.getMoviePoster(movie.id).subscribe(
            poster => {
              this.moviePosterMap[movie.id] = poster;
              postersLoaded++;
              if (postersLoaded === this.movies.length) {
                this.isLoading = false;
              }
            },
            error => {
              console.error('Error fetching movie poster for ID:', movie.id, error);
              this.moviePosterMap[movie.id] = null;
              postersLoaded++;
              if (postersLoaded === this.movies.length) {
                this.isLoading = false;
              }
            }
          );
        });
      },
      (error) => {
        console.error('Failed to fetch recommended movies.', error);
        this.isLoading = false;
      }
    );
  }
  
  
  loadNextPage(): void {
    if (this.isLoading) return;
    this.currentPage++;
    this.fetchMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadPreviousPage(): void {
    if (this.isLoading || this.currentPage === 1) return;
    this.currentPage--;
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
