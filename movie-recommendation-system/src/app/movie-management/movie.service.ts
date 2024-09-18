import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://your-backend-api/movies/top-rated'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getTopRatedMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
