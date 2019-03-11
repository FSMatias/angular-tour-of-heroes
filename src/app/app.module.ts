import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';

/*  Angular needs to know how the pieces of your application fit together and
 * what other files and libraries the app requires. This information is called
 * metadata
 *  Some of the metadata is in the @Component decorators that you added to 
 * your component classes. Other critical metadata is in @NgModule decorators.
 * The most important @NgModule decorator annotates the top-level AppModule 
 * class.
 * 
 *  Every component must be declared in exactly ONE NgModule.
 */

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
