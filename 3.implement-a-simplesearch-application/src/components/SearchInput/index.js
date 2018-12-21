import React, {PureComponent} from 'react'
import SearchInput from './SearchInput'

class SearchResultIndex extends PureComponent {

  state = {
    isInputFocus: true
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      document.removeEventListener('mousedown', this.handleClickOutside)
      this.setState({
        isInputFocus: false
      })
    }
  }

  handleChange = (event) => {
    this.props.setInputValue(event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit()
  }

  onFocus = () => {
    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({
      isInputFocus: true
    })
  }

  render() {
    return (
      <div style={{width: '100%'}} ref={el => {this.wrapperRef = el}}>
        <SearchInput
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleSuggestionClick={this.props.handleSuggestionClick}
          isInputFocus={this.state.isInputFocus}
          inputValue={this.props.inputValue}
          onFocus={this.onFocus}
          searchSuggestion={this.props.searchSuggestion}
        />
      </div>
    )
  }
}

export default SearchResultIndex
