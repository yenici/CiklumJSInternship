import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';

import { SpinnerComponent } from './spinner/spinner.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonBoxComponent } from './pokemon-box/pokemon-box.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

import { PokedexService } from './shared/pokedex.service';
import { SpinnerService } from "./spinner/spinner.service";
import { FavoritesBoxComponent } from './favorites-box/favorites-box.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    PokemonCardComponent,
    PokemonBoxComponent,
    FilterPanelComponent,
    PokemonDetailsComponent,
    FavoritesBoxComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PokedexService, SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
