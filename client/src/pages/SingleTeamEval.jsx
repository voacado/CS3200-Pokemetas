import React from 'react';

import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from '../components/search_bar/SearchBar';
import PokeList from '../components/poke_list/PokeList';
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
    // also sets background properties
    useEffect(() => {
        getPokemonSpecies();
        document.body.style.backgroundImage = `url(${background})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";

        return () => {
            document.body.style.backgroundImage = null;
        };
    }, []);

    return (
        <div className="single-team-eval">
        {/* <SearchBar placeholder="Enter Pokemon Name" data={pokemonSpecies} /> */}
        <PokeList data={pokemonSpecies} />
        </div>
    );
}

export default SingleTeamEval;