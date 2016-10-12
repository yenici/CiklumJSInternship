import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

import { Pokemon } from '../shared/Pokemon';
import { PokedexService } from "../shared/pokedex.service";
import { SpinnerService } from "../spinner/spinner.service";
import {State} from "../shared/State";

@Component({
  selector: 'pokemon-box',
  templateUrl: './pokemon-box.component.html',
  styleUrls: ['./pokemon-box.component.scss']
})
export class PokemonBoxComponent implements OnInit {
  types: Array<string>;
  pokemons: Pokemon[] = [];
  hasMore = true;
  pokemonsInView: Pokemon[];
  state: State = new State();

  constructor(private route: ActivatedRoute,
              private pokedexService: PokedexService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinnerService.start();
    this.route.params.forEach((params: Params) => {
      this.state.currentPokeId = Number(params['pokeid']) || 0;
      this.state.filter = params['filter'] || 'all'
    });
    this.state.currentRoute = '/pokemons';
    this.pokedexService.init()
      .subscribe(
        pokemons => {
          this.pokemons = this.pokemons.concat(pokemons.value);
          this.hasMore = !pokemons.done;
          this.setPokemonsState();
          this.spinnerService.stop();
        },
        error => {
          this.spinnerService.stop();
          console.error(error);
        }
      );
  }

  private getNextPokemons(): void {
    this.spinnerService.start();
    this.pokedexService.next()
      .subscribe(
        pokemons => {
          this.pokemons = this.pokemons.concat(pokemons.value);
          this.hasMore = !pokemons.done;
          this.setPokemonsState();
          this.spinnerService.stop();
        },
        error => {
          this.spinnerService.stop();
          console.error(error);
        }
      );
  }

  private setPokemonsState(): void {
    PokedexService.getFavorites().subscribe(
      favoritePokes => {
        let favorites = favoritePokes;
        this.types = ['all']
          .concat(Array.from(
            new Set(this.pokemons.reduce((types, pokemon) => types.concat(pokemon.types), [])))
            .sort());
        this.pokemonsInView = this.pokemons
          .filter(pokemon => (this.state.filter === 'all' || (pokemon.types.indexOf(this.state.filter) !== -1)))
          .sort((a, b) => (a.id - b.id))
          .map(pokemon => {
            if (favorites.find(poke => poke.id === pokemon.id) !== undefined) {
              return Object.assign(pokemon, { favorite: true });
            }
            return pokemon;
          });
      },
      error => console.error(error)
    );
  }

  onSetFilter(filter: string): void {
    this.state.filter = filter;
    this.setPokemonsState();
  }

  onFavorites(pokemon: Pokemon) {
    if (pokemon.favorite) {
      PokedexService.unpinFromFavorites(pokemon)
        .catch(); //TODO:
    } else {
      PokedexService.pinToFavorites(pokemon)
        .catch(); //TODO:
    }
    pokemon.favorite = !pokemon.favorite;
  }

}
