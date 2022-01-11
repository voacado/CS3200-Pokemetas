import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./PokeList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../search_bar/SearchBar';
import SingleTeamTypeChart from '../single_team_type_chart/SingleTeamTypeChart';
import axios from 'axios';


/**
 * Constructs and visualizes a single list of Pokemon
 * @param {Array} data 
 * @returns a React component.
 */
function PokeList({ data, dataMap, state, propToken }) {

  // Stores list of Pokemon added
  const [list, setList] = React.useState(state);
  // Navigate object for redirecting
  const navigate = useNavigate();

  /**
   * Add element to list of pokemon
   * @param {String} name 
   */
  function handleAdd(name) {
    if (list.length < 6) {

      const newList = list.concat(name);
      setList(newList);
    }
  }

  /**
   * Remove element from list of pokemon (by index to avoid duplicate deletion)
   * @param {Integer} listIndex
   */
  function handleRemove(listIndex) {
    const newList = list
    var leftList = newList.slice(0, listIndex)
    var rightList = newList.slice(listIndex + 1, newList.length)
    var combinedList = leftList.concat(rightList)
    setList(combinedList)
  }

  /**
   * Given a poke_name, return the object detailing the Pokemon (from the database)
   * @param {String} name 
   */
  function getPokeImage(name) {
    // Temporary parse of data
    var data = dataMap.get(name);

    // Check if data has been loaded yet
    if(data == null) {
      // If data has not been loaded, do nothing and wait
    } else {
      return data.sprite;
    }
  }

  /**
   * Saves the existing team in the team evaluator to the database if logged in, 
   * otherwise prompt to sign in.
   */
  function saveTeam() {
    // If the user is not signed in, ask them to sign in.
    if(!propToken.token) {
      alert("Please sign in to save your team.")
      // navigate('/login');
    } else if (list.length <= 0) {
      // If the user has not added any Pokemon, ask them to do so.
      alert("Please add Pokemon to the team.")
    } else {
      // Params necessary for call to saving procedure
      var name = prompt("Team Name:");
      var description = prompt("Team Description:");
      var poke1 = list[0];
      var poke2 = list[1];
      var poke3 = list[2];
      var poke4 = list[3];
      var poke5 = list[4];
      var poke6 = list[5];

      // Asychronous method that calls POST
      const saveTeam = async () => {
        let saveData = {
          'teamName': name,
          'teamDesc': description, 
          'poke1': poke1, 
          'poke2': poke2, 
          'poke3': poke3, 
          'poke4': poke4, 
          'poke5': poke5, 
          'poke6': poke6
        }
        let link = "";
        if (window.location.port) {
          link = `http://${window.location.hostname}:${window.location.port}/savePokemonTeam`
        } else {
          link =`https://${window.location.hostname}/savePokemonTeam`
        }
        await axios.post(link, null, { params: saveData }).then(response => response.status);
      }
      saveTeam()
    }
  }

  return (
    <div className="three-component">
      <div className="side-by-side-container">
        <div className="top-down-container">
          <SearchBar placeholder="Enter Pokemon Name" data={data} props={handleAdd} />
          <div className="poke-list-overall">
            {list.length !== 0 && (
              <div className="poke-list">
                {list.map((pokemon, listIndex) => {
                  return <div className="indiv-item">
                    <li className="indiv-item">
                      <div class="img-container">
                        <img className="poke-image" src={getPokeImage(pokemon)}></img>
                        {/* <img className="poke-image" src={`https://play.pokemonshowdown.com/sprites/ani/${pokemon.toLowerCase()}.gif`}></img> */}
                      </div>
                      {pokemon}
                      <div className="remove-icon" onClick={() => handleRemove(listIndex)}>
                        <FontAwesomeIcon icon={faTrash} size="1x" id="clearBtn" />
                      </div>
                    </li>
                  </div>
                })}
              </div>
            )}
          </div>
          <button class="save-button" onClick={saveTeam}>Save Team</button>
        </div>
        <SingleTeamTypeChart className="type-chart" listOfPokemon={list}></SingleTeamTypeChart>
      </div>
    </div>
  )
}

export default PokeList
