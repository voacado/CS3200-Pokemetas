import React from 'react'
import "./PokeList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../search_bar/SearchBar';

function PokeList({data}) {

  const [list, setList] = React.useState([]);

  function handleAdd(e) {
    if (!(list.length >= 6)) {
      const name = e.target.getAttribute("name")
      const newList = list.concat(name);
      setList(newList);
    }
  }

  function handleRemove(e) {
    if (!(list.length <= 0)) {
      const name = e.target.getAttribute("name")
      setList(list.filter(item => item !== name))
    }
  }

  function getPokeObj(name) {
    data.forEach(element => {
      if(element.poke_name === name) {
        console.log(element);
      }
    });
  }

  return (
    <div>
      <button name="testadd" onClick={handleAdd}> Test Add </button>
      {/* <SearchBar placeholder="Enter Pokemon Name" data={data} props={() => handleAdd()} /> */}
      <SearchBar placeholder="Enter Pokemon Name" data={data} props={handleAdd} />
      {/* <SearchBar placeholder="Enter Pokemon Name" data={data} props={"hello"} /> */}
      <div className="poke-list-overall">
        <div className="poke-list">

          {list.map((pokemon) => {
            return <div className="indiv-item">
              <li className="indiv-item">
                {getPokeObj(pokemon)}
                {pokemon}
                <div className="remove-icon" name={ pokemon } onClick={ handleRemove }>
                    <FontAwesomeIcon icon={ faTrash } size="1x" id="clearBtn"/>
                </div>
              </li>
            </div>
          })}

        </div>
      </div>
    </div>
  )
}

export default PokeList
