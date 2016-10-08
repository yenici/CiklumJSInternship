import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../../shared/Pokemon';

@Component({
  selector: 'pokemon-box',
  templateUrl: './pokemon-box.component.html',
  styleUrls: ['./pokemon-box.component.scss']
})
export class PokemonBoxComponent implements OnInit {
    types: Array<string>;
    filter: string;
    pokemons: Array<Pokemon> = [
      {
          "id":7,
          "name":"squirtle",
          "types":["water", "ground"],
          "image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
          "favorite":false,
          "url":"http://pokeapi.co/api/v2/pokemon/7/"
      },
      {
          "id":9,
          "name":"blastoise",
          "types":["ice", "dragon"],
          "image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
          "favorite":true,
          "url":"http://pokeapi.co/api/v2/pokemon/9/"
      },
      {
          "id":8,
          "name":"wartortle",
          "types":["poison", "dark"],
          "image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
          "favorite":false,
          "url":"http://pokeapi.co/api/v2/pokemon/8/"
      },
      {
          "id":9,
          "name":"blastoise",
          "types":["bug", "grass"],
          "image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
          "favorite":true,
          "url":"http://pokeapi.co/api/v2/pokemon/9/"
      }
      ];
    processedPokes: Array<Pokemon>;

  constructor() { }

  ngOnInit() {
      this.types = ['all'].concat(Array
          .from(new Set(this.pokemons
              .reduce((types, pokemon) => types.concat(pokemon.types), []))).sort());
      this.filter = 'all';
      this.processedPokes = this.pokemons
          .filter(pokemon => (this.filter === 'all' || (pokemon.types.indexOf(this.filter) !== -1)))
          .sort((a, b) => (a.id - b.id));
  }

}
