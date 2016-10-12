export class Pokemon {
  // id: number;
  // name: string;
  // types: Array<string>;
  // image: string;
  // url: string;
  // favorite: boolean;

  constructor(public id: number = 0,
              public name: string ='',
              public types = [],
              public image = '',
              public url ='',
              public favorite = false) {
  }
}

export class PokemonDetailed extends Pokemon {
  constructor(public id = 0,
              public name ='',
              public types = [],
              public image = '',
              public url ='',
              public favorite = false,
              public height = 0,
              public weight = 0,
              public abilities = [],
              public stats = [],
              public sprites = {
                back_default: '',
                back_female: '',
                back_shiny: '',
                back_shiny_female: '',
                front_default: '',
                front_female: '',
                front_shiny: '',
                front_shiny_female: '',
              }) {
    super(id, name, types, image, url, favorite);
  }

}