import React from 'react';

import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from '../components/search_bar/SearchBar';
import background from "../images/bulbasaurBG.png";

function SingleTeamEval(props) {

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

    console.log(pokemonSpecies);

    const pokeNames = [];
    pokemonSpecies.forEach(element => pokeNames.push(element.poke_name))



    return (
        <div style={{
            // backgroundImage: `url(${background})`
        }}>
            <SearchBar placeholder="Enter Pokemon Name" data={pokemonSpecies} />

        {/* {
        pokemonSpecies.map((post) => (
            <div key={post.id}>
                <p>{post.poke_name}</p>
            </div>
          ))
        } */}

        </div>
    );
}

export default SingleTeamEval;