import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/model/movie';
import { MovieService } from '../shared/services/movie.service';

import { MoviesDataSource } from "../shared/services/movies-data-source";

export interface Section {
  name: string;
  updated: Date;
}


@Component({
  selector: 'vs-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(public moviesDataSource: MoviesDataSource) {
  }

  ngOnInit(): void {

  }
}
