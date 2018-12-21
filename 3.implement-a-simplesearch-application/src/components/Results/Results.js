import React from 'react'
import Proptypes from 'prop-types'
import './style.css'

const Results = ({searchResult, setToSearchHistory}) => {
  return (
    <div className='search-list'>
      <div className='search-list__title-wrapper'>
        <h3 className='search-list__title'>Results</h3>
        <span>search length: {searchResult.count}</span>
      </div>
      <ul>
        {searchResult.results.map((item) => (
          <li className='search-list__item' key={'search-list-' + item.created}>
            {item.name}
            <button className='search-list__item-button' type='button' onClick={() => setToSearchHistory(item)}>
              Save
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

Results.propTypes = {
  searchResult: Proptypes.object.isRequired,
  setToSearchHistory: Proptypes.func.isRequired,
}

export default Results
