A simple interface for [The RESTful Pokémon Data API](http://pokeapi.co/) made with ReactJS.

**Steps to start a local server:**

`npm install`

`npm start`

Navigate to [http://localhost:3000](http://localhost:3000) in your favorite browser.

Link to working prototype [http://yenici.github.io/CiklumJSInternship/Assignment_08/](http://yenici.github.io/CiklumJSInternship/Assignment_08/).

Project's structure:

```
src
 |
 + app
 | |
 | + actions
 | | |
 | | + pokemones.js - actions for Pokemons screen
 | | + favorites.js - actions for Favorites screen
 | |
 | + components
 | | |
 | | + App.jsx - application wrapper with main menu
 | | + Home.jsx - home screen with Pokemon's logo
 | | + Spinner.jsx - spinner for longlasting routines
 | | + Pokedex.jsx - a component contained a filter board and a list of pokemon's cards
 | | + TypeFilter.jsx - filter board
 | | + PokemonCard.jsx - just a pokemon's card
 | |
 | + containers
 | | |
 | | + SpinnerContainer.js - a wrapper to control the spinner
 | | + PokemonsContainer.jsx - a wrapper to control pokemons
 | | + FavoritesContainer.jsx - a wrapper to control favorite pokemons
 | |
 | + reducers
 | | + index.js -
 | | + globalReducer.js - to control 'fetching' state
 | | + pokemonsReducer.js - to control actions with pokemons
 | | + favoritesReducer.js - to control actions with favorite pokemons
 | |
 | + services
 | | + PokeService.js - a wrapper on a services (I've tried to cache pokemon's information)
 | |
 | + store
 | | + configureStore.js - just for turning on/off redux-logger
 | | + configureStoreDev.js
 | | + configureStoreProd.js
 | |
 | + routes.js - the routes for the app
 | + index.js - the starting point of the app
 |
 + images
 + stylesheets
 + index.html
```