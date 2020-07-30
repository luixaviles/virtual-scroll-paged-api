import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Movie } from '../model/movie';

const MOVIES_API: string = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY: string = '0971ed323ba8081b990144eef9e02ace';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getMovies(page:number = 1): Observable<Movie[]> {
    return this.httpClient.get<{results: Movie[]}>(`${MOVIES_API}?page=${page}&sort_by=popularity.desc&api_key=${API_KEY}`)
    .pipe(
      map(data => data.results),
      map(movies => {
        movies.map(m => {
          m.pictureURL = 'https://image.tmdb.org/t/p/w500' + m.poster_path;
        });
        return movies;
      })
    );
  }
}
