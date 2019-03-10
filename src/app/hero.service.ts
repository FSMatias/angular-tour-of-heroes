import { Injectable } from '@angular/core';
import { Hero } from './shared/hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';

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
  constructor() { }

  getHeroes(): Observable<Hero[]> {
    // Observables are used for asynchronous code. 
    // For now, getHeroes is still returning a mocked data but later, we will make a http request to get the heroes list.
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    return of(HEROES);
  }
}
