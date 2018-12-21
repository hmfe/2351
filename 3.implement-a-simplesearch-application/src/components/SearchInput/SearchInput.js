import React from 'react'
import Proptypes from 'prop-types'
import { pathOr } from 'ramda'
import './style.css'

const Results = ({handleChange, handleSubmit, handleSuggestionClick, inputValue, isInputFocus, onFocus, searchSuggestion}) => {
  const searchSuggestionResults = pathOr([], ['results'], searchSuggestion)
  return (
    <div className='search-input'>
      <form onSubmit={handleSubmit}>
        <label className='search-input__label'>
          <input
            className='search-input__input'
            type='text'
            value={inputValue}
            onChange={handleChange}
            onFocus={onFocus}
          />
        </label>
        <label>
          <input className='search-input__label search-input__label--hide' type='submit' value='Submit' />
        </label>
      </form>
      {searchSuggestionResults.length && isInputFocus ? (
        <ul className='search-input__suggestion-list'>
          {searchSuggestionResults.map((item, index) => (
            <li key={'search-input-item-' + index}>
              <button type='button' className='search-input__suggestion-item' onClick={() => handleSuggestionClick(item.name)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

Results.propTypes = {
  handleChange: Proptypes.func.isRequired,
  handleSubmit: Proptypes.func.isRequired,
  handleSuggestionClick: Proptypes.func.isRequired,
  inputValue: Proptypes.string,
  isInputFocus: Proptypes.bool.isRequired,
  onFocus: Proptypes.func.isRequired,
  searchSuggestion: Proptypes.object,
}

export default Results
