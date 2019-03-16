import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../shared/hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  // "The hero property must be an Input property, 
  // annotated with the @Input() decorator, 
  // because the external HeroesComponent will bind to it like this."
  @Input() hero: Hero;

  constructor(
    // Holds information about the route to this instance of the HeroDetailComponent.
    private route: ActivatedRoute,
    
    private heroService: HeroService,

    // The location is an Angular service for interacting with the browser. Can be use it to navigate back to the view that navigated here.
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // The route.snapshot is a static image of the route information shortly after the component was created.
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe (hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
