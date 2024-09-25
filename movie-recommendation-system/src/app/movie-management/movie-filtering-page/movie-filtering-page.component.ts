import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from 'src/app/model';

@Component({
  selector: 'app-movie-filtering-page',
  templateUrl: './movie-filtering-page.component.html',
  styleUrls: ['./movie-filtering-page.component.css']
})

export class MovieFilteringPageComponent implements OnInit{
  
  movies: Movie[] = [];
  movie: Movie | undefined;
  currentPage: number = 1;


  constructor(private movieService: MovieService, private router:Router, private route: ActivatedRoute) { }

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
      },
      (error) => {
        console.error('Failed to fetch recommended movies.', error);
      }
    );
  }
  

  goToDetails(movieId: number): void {
    this.router.navigate([`home/movies/`, movieId]);
  }
  
  
  filterResults() {
  }

  loadNextPage(): void {
    this.currentPage++;
    this.fetchMovies();
  }

  loadPreviousPage(): void {
    this.currentPage--;
    if(this.currentPage==0){
      return;
    }
    this.fetchMovies();
  }

}
