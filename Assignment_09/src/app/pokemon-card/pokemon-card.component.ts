import {Component, OnInit, Input, Output, EventEmitter, Renderer, ElementRef} from '@angular/core';
import {Router} from "@angular/router";

import { Pokemon } from '../shared/Pokemon';
import {State} from "../shared/State";

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon;
  @Input() state: State;

  @Output() onFavorites = new EventEmitter<Pokemon>();

  constructor(private router: Router, private renderer: Renderer, private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.state.currentPokeId === this.pokemon.id) {
      this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'scrollIntoView', [true]);
    }
  }

  onFavoritesClick(pokemon: Pokemon) {
    this.onFavorites.emit(pokemon);
  }

  onDetailsClick(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id, this.state ]);
  }

}
