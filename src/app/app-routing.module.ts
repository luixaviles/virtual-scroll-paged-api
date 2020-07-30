import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movies/movie-list/movie-list.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies'
  },
  {
    path: 'movies',
    component: MovieListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
