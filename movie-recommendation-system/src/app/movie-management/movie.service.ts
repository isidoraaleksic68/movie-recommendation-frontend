import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private apiUrl = 'http://localhost:5000';
  
  private movieSubject = new BehaviorSubject<Movie | null>(null);
  currentMovie = this.movieSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTopRatedMovies(page: number = 1): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/topRated?page=${page}`);
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${movieId}`);
  }

  searchMovies(query: string, page: number = 1): Observable<Movie[]> {
    if (query.length > 0) {
      query = query.charAt(0).toUpperCase() + query.slice(1);
    }
    return this.http.post<Movie[]>(`${this.apiUrl}/movies/search?page=${page}`, { query });
  }

  getRecommendedMovies(movieTitle: string, page: number = 1): Observable<Movie[]> {
    console.log(movieTitle);
    console.log(page);
    
    return this.http.post<{ recommendations: Movie[] }>(`${this.apiUrl}/movies/recommend?page=${page}`, { movieTitle })
      .pipe(
        map(response => response.recommendations) 
      );
  }

  filterMovies(genre: string, language: string, movie_title:string, page: number): Observable<Movie[]> {
    const body = { genre, language, movie_title};
    return this.http.post<{ filtered_movies: Movie[] }>(`${this.apiUrl}/movies/filter?page=${page}`,  body)
      .pipe(
        map(response => response.filtered_movies) 
      );
  }

  getMetadata(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/filtering/metadata`);
  }
 
  sortMovies(sortCriteria: string[], movie_title: string, page: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/movies/sort?page=${page}`, { sort_criteria: sortCriteria, movie_title: movie_title});
  }

  getMoviePoster(movieId: number): Observable<string> {
    return this.http.get<{ movie_poster: string }>(`${this.apiUrl}/movies/${movieId}/poster`)
      .pipe(map(response => response.movie_poster));
  }

  getMovieTrailers(movieId: number): Observable<string[]> {
    return this.http.get<{ trailers: string[] }>(`${this.apiUrl}/movies/${movieId}/trailers`)
      .pipe(map(response => response.trailers));
  }
  
}
