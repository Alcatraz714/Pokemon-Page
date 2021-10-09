import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Axios from "axios";

<style>
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
</style>

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name:"",
    species:"",
    image:"",
    hp:"",
    attack:"",
    defence:"",
    type:"",
  });

  const searchPokemon = ()=>{
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>{
      console.log(response);
      setPokemon({
        name: pokemonName, 
        species: response.data.species, 
        image: response.data.sprites.front_default, 
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defence:response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    }
    );

  }


  return (
    <div className= "App">
      <div className="title">
       <h1>Pokedex</h1>
       <input type= "text"  onChange={(event)=>{setPokemonName(event.target.value);}}/>
       <button onClick={searchPokemon}>Search</button>
      </div>
      <div className="Display">
        {!pokemonChosen ? (
        <h1>Please Choose a Pokemon</h1>
        ):(
        <div className="Card">  
          <h1>{pokemon.name}</h1>
          <img src={pokemon.image}/>
          <h3>Type:{pokemon.type}</h3>
          <h4>HP:{pokemon.hp}</h4>
          <h4>Attack:{pokemon.attack}</h4>
          <h4>Defence:{pokemon.defence}</h4>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
