import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
let host = "";
if (window.location.port) {
  host = `http://${window.location.hostname}:${window.location.port}`
} else {
  host =`https://${window.location.hostname}`
}

/**
 * Generates a list of teams that correspond to a user, and a list of actions they may perform on a team.
 */
function TeamsList() {
  // Query for list of Pokemon teams a user
  const getTeamIDs = async () => {
    const res = await axios.get(`${host}/userToTeamID`);
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
      var query = `${host}/teamIDToPokemon?teamID=${teamIDs[i].team_id}`
      await axios.get(query).then((res) => {
        data.push(res.data);
      });
    }
    // Store the team IDs for deleting
    data.push(teamIDs)
    return data;
  };

  // Update the data once (on page load)
  useEffect(() => {
    getTeamIDs().then((result) => {
      getTeams(result).then((data) => {
        setPokemonTeams(data);
      })
    })
  }, []);

  /**
   * Delete a team (row) from the user's data
   * @param {Int} teamNumber - number representing the column (not the teamID itself)
   */
  const deleteTeam = (teamNumber) => {
    // Ask the user if they really want to delete this team
    if (window.confirm('Are you sure you want to delete this team?')) {
      // From the teamNumber, calculate the teamID
      var teamDelNumber = (pokemonTeams[pokemonTeams.length - 1][teamNumber].team_id)

      // Asychronous method that calls POST to delete
      const deleteTeam = async () => {
        await axios.put(`${host}/deletePokemonTeam?teamID=${teamDelNumber}`).then(response => response.status);
      }
      deleteTeam()
    }
  }

  /**
   * Creates an HTML representation of a table based on the data provided in pokemonTeams
   * @param {Array} pokemonTeams 
   * @returns an HTML table
   */
  const createPokemonDataTable = (pokemonTeams) => {
    if (pokemonTeams.length > 0) {
      var rows = []

      // This function fills in data left to right for each row (row = team)
      // For each pokemon team
      for (var i = 0; i < pokemonTeams.length - 1; i++) {
        rows.push(<tr>{createPokemonDataTableHelper(pokemonTeams, i)}</tr>)
      }
      return rows
    }
  }

  /**
   * Helps the main method createPokemonDataTable() create HTML tables
   * @param {Array} pokemonTeams 
   * @param {int} i - index of cur pokemon team
   * @returns 
   */
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
        data.push(<td> {pokemonTeams[i][0][p].species} </td>)
        rawData.push(pokemonTeams[i][0][p].species)
      }
    }

    // Eval button re-directs to the eval page with a given state
    data.push(<td>
      <Link 
        to="/single-team-eval"
        state= {{pokeTeam: rawData}}>
          <button> Eval </button></Link></td>)

      // Delete Button to delete a specific row
      data.push(<td><button onClick={() => deleteTeam(i)}> Delete </button></td>)

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
          <th>Delete</th>
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
