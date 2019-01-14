import React from 'react'
import './style.css'

const searchTypes = ['people', 'planets']

const SearchType = ({activeSearchType, setSearchType}) => (
  <div className='search-type'>
    {searchTypes.map((item, index) => (
      <button
        className={`search-type__button ${activeSearchType === item ? 'search-type__button--active' : ''}`}
        key={'search-type-' + index}
        type='button'
        onClick={() => setSearchType(item)}
      >
        {item}
      </button>
    ))}
  </div>
)

export default SearchType
