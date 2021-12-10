import React, { useState, useEffect } from 'react';
import axios from "axios";
import PokeList from '../components/poke_list/PokeList';
import '../pages-css/SingleTeamEval.css';

function SingleTeamEval() {

    // 1. Initialize an array called pokemonSpecies, which contains all pokemonSpecies data
    const [pokemonSpecies, setPokemonSpecies] = useState([]);
    // 2. Create function to GET all the pokemonSpecies from server store to pokemonSpecies array.
    const getPokemonSpecies = async () => {
        await axios.get("http://localhost:3000/pokemonSpecies").then((res) => {
            setPokemonSpecies(res.data);
        });
    };
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const getPokemonTypes = async () => {
        await axios.get("http://localhost:3000/pokemonTypes").then((res) => {
            setPokemonTypes(res.data);
        });
    };
    const [indivPokemonTypes, setIndivPokemonTypes] = useState([]);
    const getIndivPokemonTypes = async () => {
        await axios.get("http://localhost:3000/indivPokemonTypes").then((res) => {
            setIndivPokemonTypes(res.data);
        });
    };
    // 3. Create a useEffect hook to update data
    useEffect(() => {
        getPokemonSpecies();
        getPokemonTypes();
        getIndivPokemonTypes();
    }, []);
    

    var pokeSpeciesMap = new Map(pokemonSpecies.map(key => [key.poke_name, key]));
    var indivPokemonTypesMap = new Map(indivPokemonTypes.map(key => [key.poke_name, key.poke_type]));

    return (
        <div className="green-bg">
            <div className="single-team-eval">
                <div className="ste-container">
                    {/* {console.log(pokemonTypes)} */}
                    {/* {console.log(indivPokemonTypesMap)} */}
                    <PokeList data={pokemonSpecies} dataMap={pokeSpeciesMap} />
                </div>
            </div>
        </div>
    );
}

export default SingleTeamEval;