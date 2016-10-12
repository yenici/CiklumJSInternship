import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

import {Pokemon, PokemonDetailed} from './Pokemon';

@Injectable()
export class PokedexService {

  private static readonly POKE_API = 'http://pokeapi.co/api/v2/pokemon/?limit=';
  private static readonly POKE_API_CHUNK_SIZE_DEFAULT = 10;

  private static readonly cacheQueriesName = 'pokeCacheQueries';
  private static cacheQueries = window.localStorage.getItem(PokedexService.cacheQueriesName) !== null ?
    JSON.parse(window.localStorage.getItem(PokedexService.cacheQueriesName)) : {};

  private static readonly cachePokemonsName = 'pokeCachePokes';
  private static cachePokemons = window.localStorage.getItem(PokedexService.cachePokemonsName) !== null ?
    JSON.parse(window.localStorage.getItem(PokedexService.cachePokemonsName)) : {};

  private static readonly favoritesStorageName = 'pokeFavorites';

  private nextChunkUrl = PokedexService.POKE_API
    .concat(PokedexService.POKE_API_CHUNK_SIZE_DEFAULT.toString());

  private fetchedPokemons: string[] = [];

  constructor(private http: Http) {}

  private getNextChunk(): Promise<string[]> {
    if (this.nextChunkUrl !== null) {
      if (PokedexService.cacheQueries.hasOwnProperty(this.nextChunkUrl)) {
        let currentUrl = this.nextChunkUrl;
        this.nextChunkUrl = PokedexService.cacheQueries[this.nextChunkUrl].next;
        return Promise.resolve(PokedexService.cacheQueries[currentUrl].value);
      }
      return this.http.get(this.nextChunkUrl)
        .toPromise()
        .then((res: Response) => {
          let data = res.json();
          PokedexService.cacheQueries[this.nextChunkUrl]= {
            next: data.next,
            value: data.results.map(result => result.url)
          };
          try {
            window.localStorage.setItem(PokedexService.cacheQueriesName,
              JSON.stringify(PokedexService.cacheQueries));
          } catch (e) {
            // TODO: The chunk was not stored in the cache
          }
          this.nextChunkUrl = data.next;
          return data.results.map(result => result.url);
        });
    } else {
      return Promise.reject('There is no more Pokemons.');
    }
  }

  private getPokemon(url: string): Promise<Pokemon> {
    if (PokedexService.cachePokemons.hasOwnProperty(url)) {
      return Promise.resolve(Object.assign(
        PokedexService.cachePokemons[url],
        { url, favorite: false }
      ));
    } else {
      return this.http.get(url)
        .toPromise()
        .then((res: Response) => {
          let fullPokemon = res.json();
          const pokemon = {
            id: fullPokemon.id,
            name: fullPokemon.name,
            types: fullPokemon.types.sort((a, b) => a.slot - b.slot).map(types => types.type.name),
            image: fullPokemon.sprites.front_default
          };
          PokedexService.cachePokemons[url] = pokemon;
          try {
            window.localStorage.setItem(PokedexService.cachePokemonsName,
              JSON.stringify(PokedexService.cachePokemons));
          } catch (e) {
            // TODO: The Pokemon was not stored in the cache
          }
          return Object.assign(pokemon, { url });
        });
    }
  }

  public getPokemonDetails(url: string): Observable<PokemonDetailed> {
    return this.http
      .get(url)
      .map((res: Response) => res.json());
  }

  init(): Observable<any> {
    if (this.fetchedPokemons.length === 0) {
      return this.next();
    } else {
      return Observable.fromPromise(
        Promise.all(this.fetchedPokemons.map(pokeUrl => this.getPokemon(pokeUrl)))
          .then(pokemons => ({
            done: (this.nextChunkUrl === null),
            value: pokemons
          }))
      );
    }
  }

  next(): Observable<any> {
    if (this.nextChunkUrl === null) {
      return Observable.fromPromise(Promise.resolve({
        done: true,
        value: []
      }));
    } else {
      return Observable.fromPromise(
        this.getNextChunk().
        then(pokeUrls =>
          Promise.all(pokeUrls.map(url => this.getPokemon(url)))
            .then(pokemons => {
              this.fetchedPokemons = this.fetchedPokemons
                .concat(pokemons.map(pokemon => pokemon.url));
              return {
                done: (this.nextChunkUrl === null),
                value: pokemons
              };
            })
        )
      );
    }
  }

  public static getFavorites(): Observable<any> {
    return Observable.fromPromise(
      new Promise((resolve, reject) => {
        try {
          const favoritesJson = window.localStorage.getItem(PokedexService.favoritesStorageName);
          if (favoritesJson !== null) {
            resolve(JSON.parse(favoritesJson));
          }
          resolve([]);
        } catch (e) {
          reject(e);
        }
      })
    );
  }

  // static pinToFavorites(pokemon: Pokemon): Promise<Pokemon[]> {
  static pinToFavorites(pokemon: Pokemon): any {
    return new Promise((resolve, reject) => {
      PokedexService.getFavorites().subscribe(
        favorites => {
          if (favorites.find(item => item.id === pokemon.id) === undefined) {
            let newFavorites =
              [...favorites, Object.assign({}, pokemon, { favorite: true })];
            try {
              window.localStorage
                .setItem(PokedexService.favoritesStorageName, JSON.stringify(newFavorites));
              resolve(newFavorites);
            } catch (e) {
              reject(e);
            }
          } else {
            reject(`Pokemon ${pokemon.name} is already in favorites.`);
          }
        },
        error => reject(error)
      );
    });
  }

  // static unpinFromFavorites(pokemon: Pokemon): Promise<Pokemon[]> {
  static unpinFromFavorites(pokemon: Pokemon): any {
    return new Promise((resolve, reject) => {
      PokedexService.getFavorites().subscribe(
        favorites => {
          const newFavorites = favorites.filter(poke => (poke.id !== pokemon.id));
          if (favorites.length !== newFavorites.length) {
            try {
              window.localStorage
                .setItem(PokedexService.favoritesStorageName, JSON.stringify(newFavorites));
              resolve(newFavorites);
            } catch (e) {
              reject(e);
            }
          } else {
            reject(`Pokemon ${pokemon.name} is not in favorites.`);
          }
        },
        error => reject(error)
      );
    })
  }

  private static handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
