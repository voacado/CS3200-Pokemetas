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
  function handleAdd(e) {
    if (!(list.length >= 6)) {
      const name = e.target.getAttribute("name")
      const newList = list.concat(name);
      setList(newList);
    }
  }

  /**
   * Remove element to list of pokemon
   * @param {*} e 
   */
  function handleRemove(e) {
    if (!(list.length <= 0)) {
      const name = e.target.getAttribute("name")
      setList(list.filter(item => item !== name))
    }
  }

  /**
   * Given a poke_name, return the object detailing the Pokemon (from the database)
   * @param {*} name 
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
            {list.map((pokemon) => {
              return <div className="indiv-item">
                <li className="indiv-item">
                  {getPokeObj(pokemon)}
                  {pokemon}
                  <div className="remove-icon" name={pokemon} onClick={handleRemove}>
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
