import { Component } from '@angular/core';
import { Movie } from 'src/app/model';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search-page',
  templateUrl: './movie-search-page.component.html',
  styleUrls: ['./movie-search-page.component.css']
})
export class MovieSearchPageComponent {
  movies: Movie[] = [];
  searchQuery: string = '';
  isSearched: boolean = false;
  currentPage: number = 1;
  moviePosterMap: { [key: number]: string | null } = {};
  hasNextPage: boolean = true;
  hasPreviousPage: boolean = false;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.fetchTopRatedMovies();
  }

  fetchTopRatedMovies(): void {
    this.movieService.getTopRatedMovies(this.currentPage).subscribe(
      (data: Movie[]) => {
        this.movies = data;
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.movies.length > 0;
        this.movies.forEach(movie => {
          this.movieService.getMoviePoster(movie.id).subscribe(
            poster => this.moviePosterMap[movie.id] = poster,
            error => this.moviePosterMap[movie.id] = null
          );
        });
      },
      (error) => console.error('Failed to fetch top rated movies.', error)
    );
  }

  loadNextPage(): void {
    this.currentPage++;
    if (this.isSearched) {
      this.searchMovies();
    } else {
      this.fetchTopRatedMovies();
    }
    window.scrollTo({ top: 650, behavior: 'smooth' });
  }

  loadPreviousPage(): void {
    if (this.currentPage === 1) return;
    this.currentPage--;
    if (this.isSearched) {
      this.searchMovies();
    } else {
      this.fetchTopRatedMovies();
    }
    window.scrollTo({ top: 650, behavior: 'smooth' });
  }

  searchMovies(): void {
    this.isSearched = true;
    this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe(
      (response: any) => {
        this.movies = response['searching results'];
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.movies.length > 0;
        this.movies.forEach(movie => {
          this.movieService.getMoviePoster(movie.id).subscribe(
            poster => this.moviePosterMap[movie.id] = poster,
            error => this.moviePosterMap[movie.id] = null
          );
        });
      },
      (error) => console.error('Failed to search movies.', error)
    );
  }

  goToDetails(movieId: number): void {
    this.router.navigate([`home/movies/`, movieId]);
  }
}
