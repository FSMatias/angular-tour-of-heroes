import { Injectable } from '@angular/core';
import { Hero } from './shared/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// The @Injectable() decorator marks the class as one that 
// participates in the dependency injection system. 
@Injectable({
  /*
   * "You must make the HeroService available to the dependency injection system 
   * before Angular can inject it into the HeroesComponent. You do this by 
   * registering a provider. A provider is something that can create or deliver 
   * a service; in this case, it instantiates the HeroService class to provide 
   * the service."
   *
   * By default, Angular CLI registers a provider with the root injector. 
   * "When you provide the service at the root level, Angular creates a single,
   * shared instance of HeroService and injects into any class that asks for it. 
   * Registering the provider in the @Injectable metadata also allows Angular 
   * to optimize an app by removing the service if it turns out not to be used 
   * after all."
   * 
   */
  providedIn: 'root'
})
export class HeroService {
  /*
   * "Why services?
   * Components shouldn't fetch or save data directly and they certainly shouldn't
   * knowingly present fake data. They should focus on presenting data and delegate 
   * data access to a service."
   * 
   * HeroService is a service that all application classes can use to get heroes.
   * Instead of creating that service with new, we used the Angular 
   * dependency injection to inject it into the HeroesComponent constructor.
   * 
   * "Removing data access from components means you can change your mind about 
   * the implementation anytime, without touching any components. They don't know 
   * how the service works."
   */
  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private heroesUrl = 'api/heroes';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(): Observable<Hero[]> {
    // Observables are used for asynchronous code. 
    // For now, getHeroes is still returning a mocked data but later, we will make a http request to get the heroes list.
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.

    // "Applying the optional type specifier, <Hero[]> , gives you a typed result object."
    // "To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator."
    // "The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error."
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        /*
         *  tap
         *  The tap operator looks at the observable values, does something with those values, 
         *  and passes them along. The tap call back doesn't touch the values themselves.
         */
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
