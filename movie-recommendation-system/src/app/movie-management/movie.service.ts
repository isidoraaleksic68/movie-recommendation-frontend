import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../model';

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

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/movies/${movieId}`);
  }

  searchMovies(query: string, page : number = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/movies/search?page=${page}`, { query });
  }
  
}
