import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/model';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipListbox } from '@angular/material/chips';

@Component({
  selector: 'app-movie-sorting-page',
  templateUrl: './movie-sorting-page.component.html',
  styleUrls: ['./movie-sorting-page.component.css']
})
export class MovieSortingPageComponent implements OnInit{
  @ViewChild('chipList') chipList!: MatChipListbox;
  
  movies: Movie [] = [];
  movie: Movie | undefined;
  currentPage: number = 1;
  isSorted:boolean=false;
  isLoading: boolean = false;
  sortForm!: FormGroup;
  moviePosterMap: { [key: number]: string | null } = {};
  selectedSorts: string[] = [];
  hasNextPage: boolean = true;
  hasPreviousPage: boolean = false;
  totalPages: number = 1;

  constructor(private movieService: MovieService, private router:Router, private route:ActivatedRoute,  private fb: FormBuilder ) { }


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
  
  
  loadNextPage(): void {
    if (this.isLoading) return;
    this.currentPage++;
    if (this.isSorted) {
      this.loadSortedMovies();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.fetchMovies();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } 
  }

  loadPreviousPage(): void {
    if (this.isLoading || this.currentPage === 1) return;
    this.currentPage--;
    if (this.isSorted) {
      this.loadSortedMovies();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.fetchMovies();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } 
  }



  sortResults() {
    this.currentPage = 1;
    const chipListbox = document.querySelector('mat-chip-listbox');
    if (chipListbox) {
      const selectedChips = chipListbox.querySelectorAll('mat-chip-option.mat-mdc-chip-selected');
      this.selectedSorts = Array.from(selectedChips).map(chip => chip.getAttribute('value') || '');
    }

    if (this.selectedSorts.length > 0) {
      this.isSorted = true;
      this.loadSortedMovies();
    } else {
      this.isSorted = false;
      this.fetchMovies();
    }
  }

  loadSortedMovies(): void {
    this.isLoading = true;
    this.movieService.sortMovies(this.selectedSorts, this.movie?.title as string, this.currentPage).subscribe(
      (response: any) => {
        this.movies = response.sorted_movies;
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
        console.error('Error sorting movies:', error);
        this.isLoading = false;
      }
    );
  }

  hasSelectedFilters(): boolean {
    return this.selectedSorts.length > 0;
  }

  clearSort(): void {
    if (this.chipList && this.chipList._chips) {
      this.chipList._chips.forEach(chip => {
        chip.deselect();
      });
    }
    
    this.selectedSorts = [];
    this.isSorted = false;
    this.currentPage = 1;
    this.fetchMovies();
  }
}
