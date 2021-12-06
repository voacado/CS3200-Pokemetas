import React from 'react'
import './SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar({placeholder, data}) {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder}/>
        <div className="searchIcon">
          <FontAwesomeIcon icon={ faSearch } size="1x"/>
        </div>
      </div>
      <div className="dataResult">
        {data.map((value, key) => {
          return <a className="dataItem"> 
            <p> {value.poke_name} </p> 
          </a>
        })}
      </div>
      
    </div>
  )
}

export default SearchBar
