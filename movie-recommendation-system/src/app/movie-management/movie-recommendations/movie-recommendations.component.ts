import { Component } from '@angular/core';
import { Movie } from 'src/app/model';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-recommendations',
  templateUrl: './movie-recommendations.component.html',
  styleUrls: ['./movie-recommendations.component.css']
})
export class MovieRecommendationsComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router:Router) { }

  private fallbackMovies: Movie[] = [
    {
      budget: 100000000,
      genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }],
      homepage: 'http://example.com',
      id: 1,
      keywords: [{ id: 1, name: 'example' }],
      original_language: 'en',
      original_title: 'Fallback Movie 1',
      overview: 'This is a fallback movie.',
      popularity: 10,
      production_companies: [{ id: 1, name: 'Example Production' }],
      production_countries: [{ iso_3166_1: 'US', name: 'United States' }],
      release_date: '2024-01-01',
      revenue: 5000000,
      runtime: 120,
      spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
      status: 'Released',
      tagline: 'An example fallback movie.',
      title: 'Fallback Movie 1',
      vote_average: 7.0,
      vote_count: 1000
    },
    {
      budget: 200000000,
      genres: [{ id: 16, name: 'Animation' }, { id: 35, name: 'Comedy' }],
      homepage: 'http://example.com',
      id: 2,
      keywords: [{ id: 2, name: 'example' }],
      original_language: 'en',
      original_title: 'Fallback Movie 2',
      overview: 'This is another fallback movie.',
      popularity: 15,
      production_companies: [{ id: 2, name: 'Example Studios' }],
      production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }],
      release_date: '2024-02-01',
      revenue: 10000000,
      runtime: 90,
      spoken_languages: [{ iso_639_1: 'es', name: 'Spanish' }],
      status: 'Released',
      tagline: 'Another example fallback movie.',
      title: 'Fallback Movie 2',
      vote_average: 8.0,
      vote_count: 1500
    },
    {
      budget: 100000000,
      genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }],
      homepage: 'http://example.com',
      id: 1,
      keywords: [{ id: 1, name: 'example' }],
      original_language: 'en',
      original_title: 'Fallback Movie 1',
      overview: 'This is a fallback movie.',
      popularity: 10,
      production_companies: [{ id: 1, name: 'Example Production' }],
      production_countries: [{ iso_3166_1: 'US', name: 'United States' }],
      release_date: '2024-01-01',
      revenue: 5000000,
      runtime: 120,
      spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
      status: 'Released',
      tagline: 'An example fallback movie.',
      title: 'Fallback Movie 1',
      vote_average: 7.0,
      vote_count: 1000
    },
    {
      budget: 200000000,
      genres: [{ id: 16, name: 'Animation' }, { id: 35, name: 'Comedy' }],
      homepage: 'http://example.com',
      id: 2,
      keywords: [{ id: 2, name: 'example' }],
      original_language: 'en',
      original_title: 'Fallback Movie 2',
      overview: 'This is another fallback movie.',
      popularity: 15,
      production_companies: [{ id: 2, name: 'Example Studios' }],
      production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }],
      release_date: '2024-02-01',
      revenue: 10000000,
      runtime: 90,
      spoken_languages: [{ iso_639_1: 'es', name: 'Spanish' }],
      status: 'Released',
      tagline: 'Another example fallback movie.',
      title: 'Fallback Movie 2',
      vote_average: 8.0,
      vote_count: 1500
    },
    {
      budget: 100000000,
      genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }],
      homepage: 'http://example.com',
      id: 1,
      keywords: [{ id: 1, name: 'example' }],
      original_language: 'en',
      original_title: 'Fallback Movie 1',
      overview: 'This is a fallback movie.',
      popularity: 10,
      production_companies: [{ id: 1, name: 'Example Production' }],
      production_countries: [{ iso_3166_1: 'US', name: 'United States' }],
      release_date: '2024-01-01',
      revenue: 5000000,
      runtime: 120,
      spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
      status: 'Released',
      tagline: 'An example fallback movie.',
      title: 'Fallback Movie 1',
      vote_average: 7.0,
      vote_count: 1000
    },
    {
      budget: 200000000,
      genres: [{ id: 16, name: 'Animation' }, { id: 35, name: 'Comedy' }],
      homepage: 'http://example.com',
      id: 2,
      keywords: [{ id: 2, name: 'example' }],
      original_language: 'en',
      original_title: 'Fallback Movie 2',
      overview: 'This is another fallback movie.',
      popularity: 15,
      production_companies: [{ id: 2, name: 'Example Studios' }],
      production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }],
      release_date: '2024-02-01',
      revenue: 10000000,
      runtime: 90,
      spoken_languages: [{ iso_639_1: 'es', name: 'Spanish' }],
      status: 'Released',
      tagline: 'Another example fallback movie.',
      title: 'Fallback Movie 2',
      vote_average: 8.0,
      vote_count: 1500
    }
  ];


  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getTopRatedMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data.map(movie => ({
          ...movie,
          poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500' // Use a placeholder if no image
        }));
      },
      (error) => {
        console.error('Failed to fetch movies, using fallback list.', error);
        this.movies = this.fallbackMovies;
      }
    );
  }
  
  private movie: Movie={
    budget: 100000000,
      genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }],
      homepage: 'http://example.com',
      id: 1,
      keywords: [{ id: 1, name: 'example' }],
      original_language: 'en',
      original_title: 'Fallback Movie 1',
      overview: 'This is a fallback movie.',
      popularity: 10,
      production_companies: [{ id: 1, name: 'Example Production' }],
      production_countries: [{ iso_3166_1: 'US', name: 'United States' }],
      release_date: '2024-01-01',
      revenue: 5000000,
      runtime: 120,
      spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
      status: 'Released',
      tagline: 'An example fallback movie.',
      title: 'Fallback Movie 1',
      vote_average: 7.0,
      vote_count: 1000
  };
  
  goToSorting() {
    this.router.navigate([`home/movies/sorting/`, 1]);
  }

  goToFiltering() {
    this.router.navigate([`home/movies/filtering/`, 1]);
  }

  goToDetails(movieId: number): void {
    this.router.navigate([`home/movies/`, movieId]); 
  }
  
}
