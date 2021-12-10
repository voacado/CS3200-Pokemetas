import React, { useState, useEffect } from 'react';
import axios from "axios";
import PokeList from '../components/poke_list/PokeList';
import '../pages-css/SingleTeamEval.css';
import { useLocation } from "react-router";


function SingleTeamEval() {

    // If this page is loaded via "My Teams", then an existing team state is sent.
    // This parses the data that we will send down to the child PokeList.
    const location = useLocation();

    if (location.state == null) {
        var existingTeam = []
    } else {
        var existingTeam = location.state.pokeTeam;
    }

    // 1. Initialize an array called pokemonSpecies, which contains all pokemonSpecies data
    const [pokemonSpecies, setPokemonSpecies] = useState([]);
    // 2. Create function to GET all the pokemonSpecies from server store to pokemonSpecies array.
    const getPokemonSpecies = async () => {
        await axios.get("http://localhost:3000/pokemonSpecies").then((res) => {
            setPokemonSpecies(res.data);
        });
    };
    // UNUSED METHODS - may need in future for additional data
    // const [pokemonTypes, setPokemonTypes] = useState([]);
    // const getPokemonTypes = async () => {
    //     await axios.get("http://localhost:3000/pokemonTypes").then((res) => {
    //         setPokemonTypes(res.data);
    //     });
    // };
    // const [indivPokemonTypes, setIndivPokemonTypes] = useState([]);
    // const getIndivPokemonTypes = async () => {
    //     await axios.get("http://localhost:3000/indivPokemonTypes").then((res) => {
    //         setIndivPokemonTypes(res.data);
    //     });
    // };

    // 3. Create a useEffect hook to update data
    useEffect(() => {
        getPokemonSpecies()
        // getPokemonTypes();
        // getIndivPokemonTypes();
    }, []);
    
    var pokeSpeciesMap = new Map(pokemonSpecies.map(key => [key.poke_name, key]));
    // var indivPokemonTypesMap = new Map(indivPokemonTypes.map(key => [key.poke_name, key.poke_type]));

    return (
        <div className="green-bg">
            <div className="single-team-eval">
                <div className="ste-container">
                    {/* {console.log(pokemonTypes)} */}
                    {/* {console.log(indivPokemonTypesMap)} */}
                    <PokeList data={pokemonSpecies} dataMap={pokeSpeciesMap} state={existingTeam} />
                </div>
            </div>
        </div>
    );
}

export default SingleTeamEval;