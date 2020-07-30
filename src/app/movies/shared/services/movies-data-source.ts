import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { Movie } from '../model/movie';
import { MovieService } from './movie.service';

interface PageModel {
  page: number;
}

const LIMIT = 10;

@Injectable({
  providedIn: 'root',
})
export class MoviesDataSource extends DataSource<Movie | undefined> {
  private cachedData = Array.from<Movie>({ length: 0 });
  private dataStream = new BehaviorSubject<(Movie | undefined)[]>(
    this.cachedData
  );
  private subscription = new Subscription();

  private pageSize = LIMIT;
  private fetchedPages = new Map<number, PageModel>();
  private queuePages = new Array<number>();

  movies$?: Observable<Movie[]>;
  loadPage: Subject<number> = new Subject<number>();

  constructor(private movieService: MovieService) {
    super();
    this.loadMovies();
    this.processData();
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(Movie | undefined)[]> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this.getPageForIndex(range.start);
        const endPage = this.getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this.loadMovies(i);
        }
      })
    );

    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private loadMovies(page: number = 1): void {
    if (this.fetchedPages.has(page)) {
      return;
    }

    if (this.queuePages.indexOf(page) >= 0) {
      return;
    }

    setTimeout(() => {
      this.loadPage.next(page);
      this.queuePages.push(page);
    }, 0);
  }

  private processData(): void {
    const loadPageSubscription = this.loadPage
      .pipe(
        distinctUntilChanged((pageA, pageB) => pageA === pageB),
        concatMap((page) => {
          return this.movieService.getMovies(page).pipe(
            map((movies) => ({
              page,
              movies,
            }))
          );
        }),
        map(({ movies, page }) => {
          this.fetchedPages.set(page, {
            page,
          });
          this.cachedData = this.cachedData.concat(movies);
          this.dataStream.next(this.cachedData);
        })
      )
      .subscribe();
    this.subscription.add(loadPageSubscription);
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize) + 1;
  }
}
