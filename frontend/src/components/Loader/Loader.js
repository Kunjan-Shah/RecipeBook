import React from 'react'
import Logo from '../../img/logo.png'
import DotLoader from '../../img/loader.gif'
import './Loader.css'

export default function Loader() {
  return (
    <div className="loader">
        <img src={Logo} alt="logo" />
        <img src={DotLoader} alt="loader" />
    </div>
  )
}
