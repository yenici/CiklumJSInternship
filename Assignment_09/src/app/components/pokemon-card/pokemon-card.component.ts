import { Component, Input, OnInit } from '@angular/core';

import { Pokemon } from '../../shared/Pokemon';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input()
  pokemon: Pokemon;

  onAddRemove(pokemon: Pokemon) {
      this.pokemon.favorite = !this.pokemon.favorite;
  }

  constructor() {}

  ngOnInit() {}

}
