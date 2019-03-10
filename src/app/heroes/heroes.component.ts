import { Component, OnInit } from '@angular/core';
import { Hero } from '../shared/hero';
import { HEROES } from '../mock-heroes';

// @Component is a decorator function that specifies the Angular 
// metadata for the component.
@Component({
  //  the component's CSS element selector
  selector: 'app-heroes',

  // the location of the component's template file
  templateUrl: './heroes.component.html',

  // the location of the component's private CSS styles.
  // "Styles and stylesheets identified in @Component metadata are scoped
  // to that specific component. The heroes.component.css styles apply only
  // to the HeroesComponent and don't affect the outer HTML or the HTML in 
  // any other component."
  styleUrls: ['./heroes.component.scss']
})
// Always export the component class so you can import it elsewhere ... like in the AppModule.
export class HeroesComponent implements OnInit {

  heroes = HEROES;

  public selectedHero: Hero;

  constructor() { }

  ngOnInit() {
    // The ngOnInit is a lifecycle hook.
    // Angular calls ngOnInit shortly after creating a component. 
    // It's a good place to put initialization logic.

    // *** ngOnInit() 
    // Use ngOnInit() for two main reasons:
    // 1. To perform complex initializations shortly after construction.
    // 2. To set up the component after Angular sets the input properties.
    // /!\ Components should be cheap and safe to construct.

    // *** ngOnChages()
    // Angular calls ngOnChanges() before ngOnInit() and many times after that. It only calls ngOnInit() once.
    // Angular calls its ngOnChanges() method whenever it detects changes to input properties of the component (or directive)

    // *** ngOnDestroy
    // Put cleanup logic in ngOnDestroy(), the logic that must run before Angular destroys the directive.
    // This is the place to free resources that won't be garbage collected automatically. Unsubscribe from Observables and DOM events. 
    // Stop interval timers. Unregister all callbacks that this directive registered with global or application services. You risk memory 
    // leaks if you neglect to do so.
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}



