import { Component } from '@angular/core';
import { Movie } from 'src/app/model';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { count } from 'rxjs';

@Component({
  selector: 'app-movie-search-page',
  templateUrl: './movie-search-page.component.html',
  styleUrls: ['./movie-search-page.component.css']
})
export class MovieSearchPageComponent {
  movies: Movie[] = [];
  searchQuery: string = '';
  isSearched: boolean = false;
  currentPage: number = 1; // Track the current page
  moviePosterMap: { [key: number]: string | null } = {}; // Map to store movie posters

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.fetchTopRatedMovies();
  }

  fetchTopRatedMovies(): void {
    this.movieService.getTopRatedMovies(this.currentPage).subscribe(
      (data: Movie[]) => {
        this.movies = data;
        console.log("MOVIES", this.movies);
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
        console.error('Failed to fetch top rated movies.', error);
      }
    );
  }

  loadNextPage(): void {
    this.currentPage++;
    if(this.isSearched){
      this.searchMovies();
    }
    else{
      this.fetchTopRatedMovies();
    }
  }

  loadPreviousPage(): void {
    this.currentPage--;
    if(this.currentPage==0){
      return;
    }
    if(this.isSearched){
      this.searchMovies();
    }
    else{
      this.fetchTopRatedMovies();
    }
  }

  searchMovies(): void {
    this.isSearched = true;
    this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe((response: any) => {
      console.log("RESPONSE", response);
      this.movies = response['searching results']; // Accessing the correct property'
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
      console.error('Failed to search movies.', error);
    });
  }

  goToDetails(movieId: number): void { 
  
    this.router.navigate([`home/movies/`, movieId]);
  
  }
}
