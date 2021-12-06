import React, {useState} from 'react';
import "./SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function SearchBar({placeholder, data}) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  // Handles filtering code
  const handleFilter = (event) => {
    // Search so far
    const searchWord = event.target.value
    setWordEntered(searchWord);
    // Returns true if element includes searchWord
    const newFilter = data.filter((value) => {
      // Case insensitive matching
      return value.poke_name.toLowerCase().includes(searchWord.toLowerCase());
    });

    // Only show resutls when typing
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
        <div className="searchIcon">
          {wordEntered.length === 0 ? 
          (<FontAwesomeIcon icon={ faSearch } size="1x"/>) :
          (<FontAwesomeIcon icon={ faTimes } size="1x" id="clearBtn" onClick={clearInput}/>)}
        </div>
      </div>

    {/* Only show data if a search has been started */}
    {wordEntered.length !== 0 && (
      <div className="dataResult">
        {/* Show data on site (limit best 15 results) */}
        {filteredData.slice(0, 15).map((value, key) => {
          return <a className="dataItem"> 
            <p> {value.poke_name} </p> 
          </a>
        })}
      </div>
    )}
    </div>
  )
}

export default SearchBar
