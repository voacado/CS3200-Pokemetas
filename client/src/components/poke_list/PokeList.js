import React from 'react'
import "./PokeList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function PokeList() {

  const [list, setList] = React.useState(["hi", "bye", "test"]);

  function handleAdd(e) {
    if (!(list.length >= 6)) {
      const name = e.target.getAttribute("name")
      const newList = list.concat({ name });
      setList(newList);
    }
  }

  function handleRemove(e) {
    if (!(list.length <= 0)) {
      const name = e.target.getAttribute("name")
      setList(list.filter(item => item !== name))
    }
  }

  return (
    <div className="poke-list-overall">
      <div className="poke-list">

        {list.map((pokemon) => {
          return <div className="indiv-item">
            <li className="indiv-item">
              {pokemon}
              <div className="remove-icon" name={ pokemon } onClick={ handleRemove }>
                  <FontAwesomeIcon icon={ faTrash } size="1x" id="clearBtn"/>
              </div>
            </li>
          </div>
        })}
        
      </div>
    </div>
  )
}

export default PokeList
