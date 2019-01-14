import React from 'react'
import StarWarsLogo from '../../static/star-wars-logo.svg'
import './style.css'

const Header = () => (
  <header className='header'>
    <img className='header__img' src={StarWarsLogo} alt=''/>
    <h1 className='header__title'>A simple search application for HM</h1>
  </header>
)

export default Header
