import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-sorting-page',
  templateUrl: './movie-sorting-page.component.html',
  styleUrls: ['./movie-sorting-page.component.css']
})
export class MovieSortingPageComponent implements OnInit{
  movies: Movie [] = [];
  movie: Movie | undefined;
  currentPage: number = 1;
  isSorted:boolean=false;
  sortForm!: FormGroup;

  constructor(private movieService: MovieService, private router:Router, private route:ActivatedRoute,  private fb: FormBuilder ) { 
    this.sortForm = this.fb.group({
      popularity: false,
      release_date: false,
      revenue: false,
      runtime: false,
      vote_avarage: false,
      vote_count: false
    });
  }


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
  
  
  loadNextPage(): void {
    this.currentPage++;
    if (this.isSorted) {
      this.sortResults();
    } else {
      this.fetchMovies();
    } 
  }

  loadPreviousPage(): void {
    if (this.currentPage > 1) { // Prevent going below page 1
      this.currentPage--;
      if (this.isSorted) {
        this.sortResults();
      } else {
        this.fetchMovies();
      } 
    }
  }



  sortResults() {
    const selectedSorts: string[] = [];

    // Get selected sorting options based on form values
    Object.keys(this.sortForm.value).forEach(key => {
      if (this.sortForm.value[key]) {
        selectedSorts.push(key);
      }
    });

    // Call the movie service to handle sorting
    if (selectedSorts.length > 0) {
      this.movieService.sortMovies(selectedSorts, this.movie?.title as string, this.currentPage).subscribe(
        (response: any) => {
          this.isSorted = true;
          this.movies = response.sorted_movies;
        },
        (error) => {
          console.error('Error sorting movies:', error);
        }
      );
    } else {
      console.log('No sorting criteria selected');
    }
  }
}
