import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../model';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private apiUrl = 'http://localhost:8080'; // Replace with your backend URL
  
  private movieSubject = new BehaviorSubject<Movie | null>(null);
  currentMovie = this.movieSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTopRatedMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/movies/topRated`);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/movies/${movieId}`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/movies/search?title=${query}`);
  }

  setMovie(movie: Movie): void {
    this.movieSubject.next(movie);
  }

}
