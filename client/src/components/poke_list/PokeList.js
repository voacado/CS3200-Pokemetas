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
function PokeList({ data }) {

  // Stores list of Pokemon added
  const [list, setList] = React.useState([]);

  /**
   * Add element to list of pokemon
   * @param {*} e 
   */
  function handleAdd(name) {
    if (list.length < 6) {
      // const name = e.target.getAttribute("name");
      // console.log(e)
      // console.log(name);
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
    data.forEach(element => {
      if (element.poke_name === name) {
        console.log(element);
      }
    });
  }

  return (
    <div>
      {/* <button name="testadd" onClick={handleAdd}> Test Add </button> */}
      <SearchBar placeholder="Enter Pokemon Name" data={data} props={handleAdd} />
      <div className="poke-list-overall">
        {list.length !== 0 && (
          <div className="poke-list">
            {list.map((pokemon, listIndex) => {
              return <div className="indiv-item">
                <li className="indiv-item">
                  {/* {getPokeObj(pokemon[index])} */}
                  {/* {console.log(index)} */}
                  {/* {console.log(list)} */}
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
