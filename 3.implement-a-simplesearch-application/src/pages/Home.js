import React, { Component } from 'react'
import { isEmpty } from 'ramda'
import moment from 'moment'

import Search from '../components/Search'
import SearchInput from '../components/SearchInput'
import SearchHistory from '../components/SearchHistory'
import SearchType from '../components/SearchType'
import Results from '../components/Results'
import Header from '../components/Header'
import '../style/main.css'

class Home extends Component {

  state = {
    inputValue: '',
    activeSearchType: 'people',
    searchSuggestion: {},
    searchResult: {},
    searchHistory: [],
  }

  getSearchResult = () => {
    return fetch(`https://swapi.co/api/${this.state.activeSearchType}/?search=${this.state.inputValue}`)
      .then(response => response.json())
  }

  handleSubmit = () => {
    this.setState({
      searchResult: this.state.searchSuggestion
    })
  }

  handleSuggestionClick = (value) => {
    this.setState({
      inputValue: value,
    }, async () => {
      const result = await this.getSearchResult()
      this.setState({
        searchResult: result,
        searchSuggestion: result,
      })
    })
  }

  setInputValue = (value) => {
    this.setState({
      inputValue: value,
    }, () => {
      if (value.length >= 2) {
        clearTimeout(this.dataGetTimeout)
        this.dataGetTimeout = setTimeout(async () => {
          const searchSuggestion = await this.getSearchResult()
          this.setState({
            searchSuggestion,
          })
        }, 300)
      } else {
        this.setState({
          searchSuggestion: {},
        })
      }
    })
  }

  setSearchType = (searchType) => {
    this.setState({
      activeSearchType: searchType,
    })
  }

  setToSearchHistory = (item) => {
    const date = moment().format('YYYY-MM-DD, h:mm a')
    const decoratedItem = {...item, savedToSearchHistory: date}
    this.setState({
      searchHistory: [...this.state.searchHistory, decoratedItem]
    })
  }

  removeFromSearchHistory = (itemId) => {
    const searchHistory = this.state.searchHistory.filter(item => {
      if (item.created !== itemId) {
        return item
      }
      return null
    })

    this.setState({
      searchHistory,
    })
  }

  clearSearchHistory = () => {
    this.setState({
      searchHistory: [],
    })
  }

  render() {
    const {searchHistory, searchResult} = this.state

    return (
      <main className='page'>
        <Header/>
        <Search>
          <SearchInput
            inputValue={this.state.inputValue}
            handleSubmit={this.handleSubmit}
            searchSuggestion={this.state.searchSuggestion}
            setInputValue={this.setInputValue}
            handleSuggestionClick={this.handleSuggestionClick}
          />
          <SearchType activeSearchType={this.state.activeSearchType} setSearchType={this.setSearchType}/>

          {!isEmpty(searchHistory) ? (
            <SearchHistory
              clearSearchHistory={this.clearSearchHistory}
              removeFromSearchHistory={this.removeFromSearchHistory}
              searchHistory={searchHistory}
            />
          ) : null}

          {!isEmpty(searchResult) ? (
            <Results
              title='Results'
              searchResult={searchResult}
              setToSearchHistory={this.setToSearchHistory}
            />
          ) : null}
          
        </Search>
      </main>
    )
  }
}

export default Home
