import React from 'react'

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
async function geTypeParity(type) {
  // Can call for specific data using query
  const typeEffectivenessData = await fetch('http://localhost:3000/typeEffectiveness?type=' + type)
  .then(data => data.json())
  .then(out => [out])
  // Returns object [poke_name: String, poke_type: String]
  return typeEffectivenessData;
  }


/**
 * For each Pokemon, return a list of values representing a Pokemon's effectiveness versus specific types.
 * @param {Array/List} listOfPokemon 
 */
async function getTypeRow(listOfPokemon) {
  
  // List of Pokemon (from listOfPokemon) to their respective types
  var curPokeToTypeList = await getTypes(listOfPokemon);
  var typeDataLocal = await geTypeParity("Bug");

  var results = []

  // If there are no Pokemon selected, do not calculate based on a non-existent list
  if (curPokeToTypeList !== null && curPokeToTypeList.length > 0) {
    // For each Pokemon:
    for (var i = 0; i < curPokeToTypeList.length; i++) {
      var amtTypes = curPokeToTypeList[i].length
      // If a Pokemon only has 1 type
      if (amtTypes === 1) {
        // console.log()
        // If a Pokemon has 2 types
      } else {

      }
      // console.log(curPokeToTypeList[i])
    }
  }


  
  // console.log("Pokemon List: ", curPokeToTypeList)
  // console.log("Type: ", typeDataLocal)
}


function SingleTeamTypeChart(listOfPokemon) {
  // NOTE: the Object "listOfPokemon" contains a single element (array) titled "listOfPokemon"
  getTypeRow(listOfPokemon.listOfPokemon)

  return (
    <div>
      {/* {getTypes(listOfPokemon)} */}
      {/* {() => getTypeRow()} */}
    </div>
  )
}

export default SingleTeamTypeChart
