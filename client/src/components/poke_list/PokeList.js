import React from 'react'
import "./PokeList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../search_bar/SearchBar';

/**
 * Constructs and visualizes a single list of Pokemon
 * @param {Array} data 
 * @returns a React component.
 */
function PokeList({ data, dataMap }) {

  // Stores list of Pokemon added
  const [list, setList] = React.useState([]);

  /**
   * Add element to list of pokemon
   * @param {*} e 
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
  function getPokeObj(name) {
    return dataMap.get(name);
  }

  return (
    <div>
      <SearchBar placeholder="Enter Pokemon Name" data={data} props={handleAdd} />
      <div className="poke-list-overall">
        {list.length !== 0 && (
          <div className="poke-list">
            {list.map((pokemon, listIndex) => {
              return <div className="indiv-item">
                <li className="indiv-item">
                  <div class="img-container">
                    <img className="poke-image" src={getPokeObj(pokemon).sprite}></img>
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
    </div>
  )
}

export default PokeList
