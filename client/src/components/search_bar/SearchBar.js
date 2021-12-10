import React, { useState } from 'react';
import "./SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * Constructs a searchbar based on data
 * @param {String} placeholder
 * @param {Array} data
 * @param {parent-function} props
 * @returns a React component.
 */
function SearchBar({placeholder, data, props}) {

  // Filtered data is the results so far, wordEntered is the query so far
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
      <p className="title"> <ins> Weakness Evaluator </ins> </p>
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
        <div className="searchIcon" onClick={clearInput}>
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
          return <button className="dataItem" onClick={() => props(value.poke_name)} >
            <p> {value.poke_name} </p> 
          </button>
        })}
      </div>
    )}
    </div>
  )
}

export default SearchBar
