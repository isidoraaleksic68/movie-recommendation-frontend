import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../model';
import { map } from 'rxjs/operators'; // Import 'map' operator


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

  searchMovies(query: string, page : number = 1): Observable<Movie[]> {
    return this.http.post<Movie[]>(`${this.apiUrl}/movies/search?page=${page}`, { query });
  }

  getRecommendedMovies(movieTitle: string, page: number = 1): Observable<Movie[]> {
    console.log(movieTitle);
    console.log(page);
    
    return this.http.post<{ recommendations: Movie[] }>(`${this.apiUrl}/movies/recommend?page=${page}`, { movieTitle })
      .pipe(
        map(response => response.recommendations) // Extract only the recommendations array
      );
  }

  filterMovies(genre: string, language: string, movie_title:string, page: number): Observable<Movie[]> {
    const body = { genre, language, movie_title};
    return this.http.post<{ filtered_movies: Movie[] }>(`${this.apiUrl}/movies/filter?page=${page}`,  body)
      .pipe(
        map(response => response.filtered_movies) // Extract only the recommendations array
      );
  }

  getMetadata(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/filtering/metadata`);
  }
  
}
