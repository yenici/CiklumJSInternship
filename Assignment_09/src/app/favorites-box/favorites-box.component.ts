import {Component, OnInit} from '@angular/core';
import {PokedexService} from "../shared/pokedex.service";
import {Pokemon} from "../shared/Pokemon";
import {SpinnerService} from "../spinner/spinner.service";
import {ActivatedRoute, Params} from "@angular/router";
import {State} from "../shared/State";

@Component({
  selector: 'app-favorites-box',
  templateUrl: './favorites-box.component.html',
  styleUrls: ['./favorites-box.component.scss']
})
export class FavoritesBoxComponent implements OnInit {

  types: Array<string>;
  pokemons: Pokemon[] = [];
  pokemonsInView: Pokemon[];
  state: State = new State();

  constructor(private route: ActivatedRoute, private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.state.currentPokeId = Number(params['pokeid']) || 0;
      this.state.filter = params['filter'] || 'all'
    });
    this.state.currentRoute = '/favorites';
    this.getFavorites();
  }

  getFavorites() {
    this.spinnerService.start();
    PokedexService.getFavorites().subscribe(
      favorites => {
        this.pokemons = favorites;
        this.updateFilterTypes();
        this.filterPokemons();
        this.spinnerService.stop();
      },
      error => {
        this.spinnerService.stop();
        console.error(error);
      }
    );
  }

  updateFilterTypes(): void {
    this.types = ['all']
      .concat(Array.from(
        new Set(this.pokemons.reduce((types, pokemon) => types.concat(pokemon.types), [])))
        .sort());
  }

  filterPokemons(): void {
    this.pokemonsInView = this.pokemons
      .filter(pokemon => (this.state.filter === 'all' || (pokemon.types.indexOf(this.state.filter) !== -1)))
      .sort((a, b) => (a.id - b.id));
  }

  onSetFilter(filter: string): void {
    this.state.filter = filter;
    this.filterPokemons();
  }

  onFavorites(pokemon: Pokemon) {
    if (pokemon.favorite) {
      PokedexService.unpinFromFavorites(pokemon)
        .catch(); //TODO:
    } else {
      PokedexService.pinToFavorites(pokemon)
        .catch(); //TODO:
    }
    this.pokemons = this.pokemons.filter(poke => poke !== pokemon);
    this.pokemonsInView = this.pokemonsInView.filter(poke => poke !== pokemon);
    this.updateFilterTypes();
    if (this.types.indexOf(this.state.filter) === -1) {
      // No more favorite Pokemons with the filtered type
      this.onSetFilter('all');
    }
  }

}
