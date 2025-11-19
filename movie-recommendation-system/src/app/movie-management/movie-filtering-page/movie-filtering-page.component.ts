import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from 'src/app/model';

@Component({
  selector: 'app-movie-filtering-page',
  templateUrl: './movie-filtering-page.component.html',
  styleUrls: ['./movie-filtering-page.component.css']
})

export class MovieFilteringPageComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie | undefined;
  currentPage: number = 1;
  selectedGenre: string = '';
  selectedLanguage: string = '';
  isFiltered: boolean = false;
  isLoading: boolean = false;
  genres: string[] = [];
  languages: string[] = [];
  moviePosterMap: { [key: number]: string | null } = {};
  hasNextPage: boolean = true;
  hasPreviousPage: boolean = false;
  totalPages: number = 1;

  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadFilteringMetadata();
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchMovieDetails(movieId);
  }

  loadFilteringMetadata() {
    this.movieService.getMetadata().subscribe(data => {
      console.log('Raw metadata response:', data);
      
      if (data.genres) {
        this.genres = data.genres;
      } else if (Array.isArray(data)) {
        this.genres = data;
      }
      
      if (data.spoken_languages) {
        this.languages = data.spoken_languages;
      } else if (data.languages) {
        this.languages = data.languages;
      }
      
      console.log('Loaded genres:', this.genres);
      console.log('Loaded languages:', this.languages);
    }, error => {
      console.error('Error fetching metadata', error);
    });
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
        this.totalPages = response.total_pages || 1;
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.currentPage < this.totalPages;
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

  goToDetails(movieId: number): void {
    this.router.navigate([`home/movies/`, movieId]);
  }

  filterResults(): void {
    this.currentPage = 1;
    this.isFiltered = true;
    this.loadFilteredMovies();
  }

  loadFilteredMovies(): void {
    this.isLoading = true;
    console.log('Filtering movies with:', {
      genre: this.selectedGenre,
      language: this.selectedLanguage,
      title: this.movie?.title,
      page: this.currentPage
    });
    this.movieService.filterMovies(this.selectedGenre, this.selectedLanguage, this.movie?.title as string, this.currentPage)
      .subscribe((response: any) => {
        this.movies = response.filtered_movies || response;
        this.totalPages = response.total_pages || 1;
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.currentPage < this.totalPages;
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
      }, (error) => {
        console.error('Error filtering movies:', error);
        this.isLoading = false;
      });
  }

  loadNextPage(): void {
    if (this.isLoading) return;
    this.currentPage++;
    if (this.isFiltered) {
      this.loadFilteredMovies();
    } else {
      this.fetchMovies();
    } 
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadPreviousPage(): void {
    if (this.isLoading || this.currentPage === 1) return;
    this.currentPage--;
    if (this.isFiltered) {
      this.loadFilteredMovies();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.fetchMovies();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  clearFilters(): void {
    this.selectedGenre = '';
    this.selectedLanguage = '';
    this.isFiltered = false;
    this.currentPage = 1;
    this.fetchMovies();
  }
}
