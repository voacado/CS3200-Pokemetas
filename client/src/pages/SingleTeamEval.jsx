import React, { useState, useEffect } from 'react';
import axios from "axios";
import PokeList from '../components/poke_list/PokeList';
import '../pages-css/SingleTeamEval.css';

function SingleTeamEval() {

    // 1. Initialize an array called pokemonSpecies, which contains all pokemonSpecies data
    const [pokemonSpecies, setPokemonSpecies] = useState([]);
    // 2. Create function to GET all the pokemonSpecies from server store to pokemonSpecies array.
    const getPokemonSpecies = () => {
        axios.get("http://localhost:3000/pokemonSpecies").then((res) => {
            setPokemonSpecies(res.data);
        });
    };
    // 3. Create a useEffect hook to update pokemonSpecies
    useEffect(() => {
        getPokemonSpecies();
    }, []);

    // var pokeSpeciesMap = pokemonSpecies.reduce(function(map, obj) {
    //     map[obj.poke_name] = obj;
    //     return map;
    // }, {});
    var pokeSpeciesMap = new Map(pokemonSpecies.map(key => [key.poke_name, key]));  

    return (
        <div className="single-team-eval">
            <div className="ste-container">
                {/* {console.log(pokeSpeciesMap)} */}
                {/* <PokeList data={pokemonSpecies} /> */}
                <PokeList data={pokemonSpecies} dataMap={pokeSpeciesMap} />
            </div>
        </div>
    );
}

export default SingleTeamEval;