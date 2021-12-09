import React, { useState, useEffect, useRef } from 'react'
import './SingleTeamTypeChartStyle.css'

/**
  * Async function call to backend API repsonsible for getting the type of a Pokemon.
  * @param {String} pokemon
  */
async function getType(poke_name) {
  // Can call for specific data using query
  // const response = await fetch('http://localhost:3000/indivPokemonTypes?name=' + poke_name);
  const data = await fetch('http://localhost:3000/indivPokemonTypes?name=' + poke_name)
  .then(data => data.json())
  .then(out => [out])
  // Returns object [poke_name: String, poke_type: String]
  return data;
  }


  /**
   * Returns a list of Pokemon and their types.
   * @param {Array/List} listOfPokemon 
   */
async function getTypes(listOfPokemon) {
  if (listOfPokemon.length !== 0) {
  
    var curTypeData = []

    for (var i = 0; i < listOfPokemon.length; i++) {
      await getType(listOfPokemon[i]).then(
        (result) => {
          curTypeData.push(result)
      })
    }
  return curTypeData
  } else {
    // Return null when there is no element yet so we can use as a comparator.
    return null;
  }
}


/**
  * Async function call to backend repsonsible for getting the type effectiveness between types.
  */
async function getTypeParity(type1, type2) {
  // Can call for specific data using query
  // Returns object [poke_name: String, poke_type: String]


  // If type2 is null, then we calculate for one type only
  if (type2 == null) {
    return await fetch(`http://localhost:3000/typeEffectiveness?type1="${type1}"&type2=null`)
    .then(data => data.json())
    .then(out => [out])
  } else {
    return await fetch(`http://localhost:3000/typeEffectiveness?type1="${type1}"&type2="${type2}"`)
    .then(data => data.json())
    .then(out => [out])
  }
}

/**
 * For each Pokemon, return a list of values representing a Pokemon's effectiveness versus each Pokemon type.
 * @param {Array/List} listOfPokemon 
 */
async function getTypeRow(listOfPokemon) {

  var results = []
  
  // List of Pokemon (from listOfPokemon) to their respective types
  var curPokeToTypeList = await getTypes(listOfPokemon);
  // var typeDataLocal = await getTypeParity("Bug");

  // If there are no Pokemon selected, do not calculate based on a non-existent list
  if (curPokeToTypeList !== null && curPokeToTypeList.length > 0) {
    // For each Pokemon:
    for (var i = 0; i < curPokeToTypeList.length; i++) {
      var amtTypes = curPokeToTypeList[i][0].length

      if (amtTypes === 1) {
        // If a Pokemon only has 1 type
        // Create an array that represents [pokemon name, [array of pokemon weaknesses compared to each element]]
        var data = [curPokeToTypeList[i][0][0].poke_name, 
        await getTypeParity(curPokeToTypeList[i][0][0].poke_type, null)]
        results.push(data)
      } else {
        // If a Pokemon has 2 types
        var data = [curPokeToTypeList[i][0][0].poke_name, 
        await getTypeParity(curPokeToTypeList[i][0][0].poke_type, curPokeToTypeList[i][0][1].poke_type)]
        results.push(data)
      }
    }
  }
  return results;
}

function SingleTeamTypeChart(listOfPokemon) {
  // Stores table data
  const [tableData, setTableData] = React.useState([]);
  // Stores information about the parameter (specifically, if it has updated)
  // We do this bc we want to fetch new data (async call) only when the list has been updated.
  const [pokemonData, setPokemonData] = React.useState(listOfPokemon.listOfPokemon.length);
  const pokemonDataRef = useRef(pokemonData);

  // Call to fetch new data (async call)
  const fetchData = async () => { 
    // NOTE: the Object "listOfPokemon" contains a single element (array) titled "listOfPokemon"
    const data = await getTypeRow(listOfPokemon.listOfPokemon);
    setTableData(data);
  };

  // Create a reference that contains the old value of Pokemon in the list
  useEffect(() => {
    pokemonDataRef.current = pokemonData;
  });

  // If the new parameter value is different than the old amount of Pokemon, then update the new value
  useEffect(() =>{
    if (pokemonDataRef.current !== listOfPokemon.listOfPokemon.length) {
      setPokemonData(listOfPokemon.listOfPokemon.length);
    }
  })

  // Effect only fetches new data when count pokemonData has changed
  useEffect(() => {
    fetchData();
  }, [pokemonData]);

  // Helper method to create rows for the table (regarding indiv Pokemon weaknesses):
  const createPokemonTypeRows = (index) => {
    // Error checks, should not attempt to create table if no data exists
    if (tableData.length > 0 && index != undefined) {
      var rows = []
      // For each element/type
      for (var i = 0; i < 18; i++) {
        // Index leads to the effect int compared to each type
        rows.push(<tr> {tableData[index][1][0][0][i].effect} </tr>)
      }
      return rows
    }
  }

    // Helper method to create rows for the table (regarding types):
    const createTypeRows = () => {
      if (tableData.length > 0) {
        var rows = []
        // For each element/type
        for (var i = 0; i < 18; i++) {
          // Index leads to the name of each type for the first Pokemon
          var word = tableData[0][1][0][0][i].type_attack
          // Capitalize the first letter
          rows.push(<tr> {word[0].toUpperCase() + word.slice(1)} </tr>)
        }
        return rows
      }
    }

  return (
    <div id="chart" className="single-team-type-chart">
      <table>
        <thead>
          {/* Only show table if Pokemon is in list */}
          {tableData.length > 0 && <th> Types </th>}
          {/* List Pokemon names */}
          {tableData.map((item) => {
            return <th> {item[0]} </th>
          })}
        </thead>
        <tbody>
          {/* List Pokemon stats */}
          <td> {createTypeRows()} </td>
          {tableData.map((item, index) => {
            return <td> {createPokemonTypeRows(index)} </td>
          })}
        </tbody>
      </table>
    </div>
  )

}

export default SingleTeamTypeChart
