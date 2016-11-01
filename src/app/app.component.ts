import { Component } from '@angular/core';
//añadimos el servicio pokedex
import { PokedexService } from './pokedex.service';
//añadimos la clase pokemon
import { Pokemon } from './pokemon';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  pokemon: Pokemon[] = [];    //un elemento de classe pokemon 
  isLoading: boolean = false; //un booleano para saber si estamos cargando datos
  error: boolean = false; //booleano para controlar errores
  constructor(private pokedexService: PokedexService) { }
  ngOnInit(){
    /** carga los datos iniciales */
    this.loadMore();
  }
  loadMore(){
    this.isLoading = true;
    //Utiliza el servicio pokedex para cargar los siguientes 20 pokemons
    this.pokedexService.getPokemon(this.pokemon.length, 20)
      .then( pokemon => {
        // en javascript el método map() crea un nuevo array 
        // con los resultados de la llamada a la funcion indicada 
        // aplicados a cada uno de sus elementos.
        // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map
        // ejemplo: 
        // var numeros = [1,4,9];
        // var raices = numeros.map(Math.sqrt);
        // raices tiene [1,2,3], números todavía tiene [1, 4, 9]
        pokemon = pokemon.map(p => {
          p.imageLoaded = false;
          return p;
        });
        // Si la carga fue correctamente
        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;  
      });
  }
}
