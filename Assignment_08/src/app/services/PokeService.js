/* global window: true */

import fetch from 'isomorphic-fetch';

const POKE_API_CHUNK_SIZE_DEFAULT = 10;
const getPokedexAPI = limit =>
  `http://pokeapi.co/api/v2/pokemon/?limit=${limit.toString()}`;

const FAVORITES_STORAGE_NAME = 'pokedexFavorites';
const CACHE_STORAGE_NAME = 'pokedexCache';

class PokeService {
  static getChunk(url = getPokedexAPI(POKE_API_CHUNK_SIZE_DEFAULT)) {
    let nextLink;
    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        nextLink = json.next;
        return json.results.map(pokemon => pokemon.url);
      })
      .then(pokemons =>
        Promise.all(pokemons.map(id => this.getPokemon(id))))
      .then(pokeSet => ({ next: nextLink, pokemons: pokeSet }));
  }
  static getPokemon(pokemonURL) {
    let cache = {};
    const storedCache = window.localStorage.getItem(CACHE_STORAGE_NAME);
    if (storedCache !== null) {
      cache = JSON.parse(storedCache);
    }
    if (cache[pokemonURL] === undefined) {
      return fetch(pokemonURL)
        .then(response => response.json())
        .then((json) => {
          const pokemon = {
            id: json.id,
            name: json.name,
            types: json.types.sort((a, b) => a.slot - b.slot).map(types => types.type.name),
            image: json.sprites.front_default,
            favorite: false,
          };
          // Put Pokemon to cache
          cache[pokemonURL] = pokemon;
          try {
            window.localStorage.setItem(CACHE_STORAGE_NAME, JSON.stringify(cache));
          } catch (e) {
            // todo: Do something with this
          }
          return Object.assign({}, pokemon, { url: pokemonURL });
        });
    }
    // Get Pokemon from cache
    return new Promise((resolve) => {
      resolve(Object.assign({}, cache[pokemonURL], { url: pokemonURL }));
    });
  }
  static getFavorites() {
    return new Promise((resolve, reject) => {
      try {
        const favoritesJson = window.localStorage.getItem(FAVORITES_STORAGE_NAME);
        if (favoritesJson !== null) {
          resolve(window.JSON.parse(favoritesJson));
        }
        resolve([]);
      } catch (e) {
        reject(e);
      }
    });
  }
  static pinToFavorites(pokemon) {
    return new Promise((resolve, reject) => {
      PokeService.getFavorites()
        .then((favorites) => {
          if (favorites.find(item => item.id === pokemon.id) === undefined) {
            const newFavorites =
              [...favorites, Object.assign({}, pokemon, { favorite: true })];
            try {
              window.localStorage
                .setItem(FAVORITES_STORAGE_NAME, window.JSON.stringify(newFavorites));
              resolve(newFavorites);
            } catch (e) {
              reject(e);
            }
          } else {
            reject(`Pokemon ${pokemon.name} is already in favorites.`);
          }
        });
    });
  }
  static unpinFromFavorites(pokemon) {
    return new Promise((resolve, reject) => {
      this.getFavorites()
        .then((favorites) => {
          const newFavorites = favorites.filter(poke => (poke.id !== pokemon.id));
          if (favorites.length !== newFavorites.length) {
            try {
              window.localStorage
                .setItem(FAVORITES_STORAGE_NAME, window.JSON.stringify(newFavorites));
              resolve(newFavorites);
            } catch (e) {
              reject(e);
            }
          } else {
            reject(`Pokemon ${pokemon.name} is not in favorites.`);
          }
        });
    });
  }
}

export default PokeService;
