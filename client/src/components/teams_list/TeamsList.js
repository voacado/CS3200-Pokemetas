import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

function TeamsList() {
  // Query for list of Pokemon teams a user
  const getTeamIDs = async () => {
    const res = await axios.get("http://localhost:3000/userToTeamID");
    return res;
  };

  // Query for list of Pokemon given a teamID
  const [pokemonTeams, setPokemonTeams] = useState([]);
  // Method to query for data
  const getTeams = async (teamIDData) => {
    // Array to store data
    var data = []
    var teamIDs = teamIDData.data[0]

    // For each team a user has, get the data
    for (var i = 0; i < teamIDs.length; i++) {
      var query = `http://localhost:3000/teamIDToPokemon?teamID=${teamIDs[i].team_id}`
      console.log(query)
      await axios.get(query).then((res) => {
        data.push(res.data);
      });
    }
    return data;
  };

  // Update the data once (on page load)
  useEffect(() => {
    getTeamIDs().then((result) => {
      // console.log(result)
      getTeams(result).then((data) => {
        setPokemonTeams(data);
      })
    })
  }, []);

  // console.log(pokemonTeamIDs)
  console.log(pokemonTeams)

  const createPokemonDataTable = (pokemonTeams) => {
    if (pokemonTeams.length > 0) {
      var rows = []

      // This function fills in data left to right for each row (row = team)
      // For each pokemon team
      for (var i = 0; i < pokemonTeams.length; i++) {
        rows.push(<tr>{createPokemonDataTableHelper(pokemonTeams, i)}</tr>)
      }
      return rows
    }
  }

  const createPokemonDataTableHelper = (pokemonTeams, i) => {
    // data = info with table HTML
    var data = []
    // rawData = pure pokemon team to team id array
    var rawData = []

    data.push(<td> {i + 1} </td>)
    // For each Pokemon:
    for (var p = 0; p < 6; p++) {
      if (typeof pokemonTeams[i][0][p] === 'undefined') {
        data.push(<td> </td>)
      } else {
        // console.log(pokemonTeams[i][0][p].species);
        data.push(<td> {pokemonTeams[i][0][p].species} </td>)
        rawData.push(pokemonTeams[i][0][p].species)
      }
      // data.push(<td> {pokemonTeams[i][0]} </td>)
    }
    // console.log(rawData)

    data.push(<td>
      <Link 
        to="/single-team-eval"
        state= {{pokeTeam: rawData}}
      >
      <button> Eval </button></Link></td>)
    return data;
  }


  return (
    <div className="team-list">
      <table>
        <thead>
          <th>Team Number</th>
          <th>Pokemon 1</th>
          <th>Pokemon 2</th>
          <th>Pokemon 3</th>
          <th>Pokemon 4</th>
          <th>Pokemon 5</th>
          <th>Pokemon 6</th>
          <th>Evaluate</th>
        </thead>
        <tbody>
          {/* {getTeams(pokemonTeamIDs)} */}
          {createPokemonDataTable(pokemonTeams)}
        </tbody>
      </table>
    </div>
  )
}

export default TeamsList
