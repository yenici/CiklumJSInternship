import { Component, OnInit } from '@angular/core';

import { PokedexService } from '../shared/pokedex.service';
import { ActivatedRoute, Router } from "@angular/router";
import { PokemonDetailed } from "../shared/Pokemon";
import { SpinnerService } from "../spinner/spinner.service";

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  private pokemon: PokemonDetailed = new PokemonDetailed();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pokedexService: PokedexService,
              private spinnerService: SpinnerService) {}


  ngOnInit() {
    this.spinnerService.start();
    //  Snapshot params approach:
    let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${this.route.snapshot.params['id']}/`;
    this.pokedexService.getPokemonDetails(pokemonUrl).subscribe(
      (pokemon: PokemonDetailed) => {
        this.spinnerService.stop();
        this.pokemon = pokemon;
      },
      error => {
        this.spinnerService.stop();
        console.error(error);
      }
    );
    // Observable params approach:
    //
    // this.route.params.forEach((params: Params) => {
    //   let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${params['id']}/`;
    //   this.pokedexService.getPokemonDetails(pokemonUrl).subscribe(
    //     (pokemon: PokemonDetailed) => {
    //       this.spinnerService.stop();
    //       this.pokemon = pokemon;
    //     },
    //     error => {
    //       this.spinnerService.stop();
    //       console.error(error);
    //     }
    //   );
    // });
  }

  goBack(): void {
    this.router.navigate([this.route.snapshot.params['currentRoute'],
      { pokeid: this.pokemon.id, filter:  this.route.snapshot.params['filter'] }]);
  }

}
