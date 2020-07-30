import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule, CdkScrollableModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ScrollingModule,
    CdkScrollableModule
  ]
})
export class MoviesModule { }
