import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonBoxComponent } from './pokemon-box/pokemon-box.component';
import {FavoritesBoxComponent} from "./favorites-box/favorites-box.component";
import {PokemonDetailsComponent} from "./pokemon-details/pokemon-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: 'pokemons', component: PokemonBoxComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
  { path: 'favorites', component: FavoritesBoxComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
