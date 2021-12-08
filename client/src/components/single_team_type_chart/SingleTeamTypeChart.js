import React from 'react'

/**
  * Async function call to backend API repsonsible for getting the type of a Pokemon.
  * @param {String} pokemon
  */
async function getType(poke_name) {
  // Can call for specific data using query
  // const response = await fetch('http://localhost:3000/indivPokemonTypes?name=' + poke_name);
  const data = fetch('http://localhost:3000/indivPokemonTypes?name=' + poke_name)
  .then(data => data.json())
  // Returns object [poke_name: String, poke_type: String]
  return data;
  }

  /**
   * Returns a list of Pokemon and their types.
   * @param {Object (useState)} listOfPokemon 
   */
function getTypes(listOfPokemon) {
  if (listOfPokemon.length !== 0) {
    // Convert the object into an iterable array
    const arr = Object.values(listOfPokemon)[0]
    // Store data to return
    var curTypeData = []

    // For each Pokemon in the list
    arr.map((pokemon) => (
      getType(pokemon).then(function(result) {
        // Since each Pokemon can be one or two types, we need to account for that:
        if(result.length === 2) {
          curTypeData.push(result[0])
          curTypeData.push(result[1])
        } else {
          curTypeData.push(result[0])
        }
      })
    ))

    console.log(curTypeData)
    return curTypeData
  }
}

/**
 * For each Pokemon, return a list of values representing a Pokemon's effectiveness versus specific types.
 */
function getTypeRow() {

}


function SingleTeamTypeChart(listOfPokemon) {
  return (
    <div>
      {getTypes(listOfPokemon)}
    </div>
  )
}

export default SingleTeamTypeChart
