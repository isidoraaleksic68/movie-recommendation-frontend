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
  selectedGenre: string = ''; // Ensure you have proper initialization
  selectedLanguage: string = ''; // Ensure you have proper initialization
  isFiltered: boolean = false;
  genres: string[] = [];
  languages: string[] = [];
  moviePosterMap: { [key: number]: string | null } = {}; // Map to store movie posters

  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadFilteringMetadata();
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchMovieDetails(movieId);
  }

  loadFilteringMetadata() {
    this.movieService.getMetadata().subscribe(data => {
      this.genres = data.genres;
      this.languages = data.spoken_languages;
    }, error => {
      console.error('Error fetching metadata', error);
    });
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

  goToDetails(movieId: number): void {
    this.router.navigate([`home/movies/`, movieId]);
  }

  filterResults(): void {
    this.isFiltered = true;
    console.log('Filtering movies with:', {
      genre: this.selectedGenre,
      language: this.selectedLanguage,
      title: this.movie?.title
    });
    this.movieService.filterMovies(this.selectedGenre, this.selectedLanguage, this.movie?.title as string, this.currentPage)
      .subscribe((filteredMovies: Movie[]) => {
        this.movies = filteredMovies;
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
      }, (error) => {
        console.error('Error filtering movies:', error);
      });
  }

  loadNextPage(): void {
    this.currentPage++;
    if (this.isFiltered) {
      this.filterResults();
    } else {
      this.fetchMovies();
    } 
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadPreviousPage(): void {
    if (this.currentPage > 1) { // Prevent going below page 1
      this.currentPage--;
      if (this.isFiltered) {
        this.filterResults();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.fetchMovies();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
}
