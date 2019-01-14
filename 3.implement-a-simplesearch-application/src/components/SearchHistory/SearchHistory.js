import React from 'react'
import PropTypes from 'prop-types'

const SearchHistory = ({clearSearchHistory, removeFromSearchHistory, searchHistory}) => (
  <div className='search-list'>
    <div className='search-list__title-wrapper'>
      <h3 className='search-list__title'>Search history</h3>
      <button className='search-list__title-link' onClick={clearSearchHistory}>
        Clear search history
      </button>
    </div>
    <ul>
      {searchHistory.map(item => (
        <li className='search-list__item' key={'searchHistory-' + item.created}>
          {item.name}
          <div>
            <span className='search-list__item-time'>{item.savedToSearchHistory}</span>
            <button className='search-list__item-button' type='button' onClick={() => removeFromSearchHistory(item.created)}>X</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

SearchHistory.propTypes = {
  clearSearchHistory: PropTypes.func.isRequired,
  removeFromSearchHistory: PropTypes.func.isRequired,
  searchHistory: PropTypes.array.isRequired,
}

export default SearchHistory
