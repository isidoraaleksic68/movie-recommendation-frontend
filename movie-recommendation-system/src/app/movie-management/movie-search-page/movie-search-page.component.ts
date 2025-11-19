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
  isLoading: boolean = false;
  currentPage: number = 1;
  moviePosterMap: { [key: number]: string | null } = {};
  hasNextPage: boolean = true;
  hasPreviousPage: boolean = false;
  totalPages: number = 1;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.fetchTopRatedMovies();
  }

  fetchTopRatedMovies(): void {
    this.isLoading = true;
    this.movieService.getTopRatedMovies(this.currentPage).subscribe(
      (data: any) => {
        this.movies = data.movies || data;
        this.totalPages = data.total_pages || 1;
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.currentPage < this.totalPages;
        this.movies.forEach(movie => {
          this.movieService.getMoviePoster(movie.id).subscribe(
            poster => this.moviePosterMap[movie.id] = poster,
            error => this.moviePosterMap[movie.id] = null
          );
        });
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to fetch top rated movies.', error);
        this.isLoading = false;
      }
    );
  }

  loadNextPage(): void {
    if (this.isLoading) return;
    this.currentPage++;
    if (this.isSearched) {
      this.searchMovies();
    } else {
      this.fetchTopRatedMovies();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadPreviousPage(): void {
    if (this.currentPage === 1 || this.isLoading) return;
    this.currentPage--;
    if (this.isSearched) {
      this.searchMovies();
    } else {
      this.fetchTopRatedMovies();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchMovies(): void {
    if (!this.searchQuery.trim()) {
      this.isSearched = false;
      this.currentPage = 1;
      this.fetchTopRatedMovies();
      return;
    }

    if (this.currentPage !== 1) {
      this.currentPage = 1;
    }

    this.isSearched = true;
    this.isLoading = true;
    this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe(
      (response: any) => {
        this.movies = response['searching results'] || [];
        this.totalPages = response.total_pages || 1;
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.currentPage < this.totalPages;
        this.movies.forEach(movie => {
          this.movieService.getMoviePoster(movie.id).subscribe(
            poster => this.moviePosterMap[movie.id] = poster,
            error => this.moviePosterMap[movie.id] = null
          );
        });
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to search movies.', error);
        this.movies = [];
        this.isLoading = false;
      }
    );
  }

  goToDetails(movieId: number): void {
    this.router.navigate([`home/movies/`, movieId]);
  }
}
